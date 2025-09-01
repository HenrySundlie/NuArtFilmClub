import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { MOBILE_CARD_HEIGHT } from '../styles/HomePage.styles';

// ============================================================================
// Styled Components
// ============================================================================

/**
 * Mobile action card positioned at the bottom edge of the header image
 * Provides quick access to upcoming films and calendar views
 */
const CardContainer = styled.div`
  position: relative;
  width: min(90vw, 420px);
  margin: ${theme.spacing.md} auto 0; /* sits below the header image with spacing */
  margin-bottom: 0; /* content section provides top padding */
  /* Use a variable for consumers to reference height */
  --mobile-card-height: ${MOBILE_CARD_HEIGHT};
  min-height: var(--mobile-card-height);
  background: ${theme.colors.surfaceDeep};
  border-radius: 20px;
  padding: clamp(12px, 1.8vw, 16px);
  z-index: 50;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid ${theme.colors.text.light};
  
  /* Mobile only - hidden on desktop */
  display: none;
  
  /* Responsive adjustments */
  ${theme.breakpoints.mobile} {
    display: block;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${({ active }) => active ? theme.colors.highlight : 'transparent'};
  color: ${({ active }) => active ? '#fff' : '#666'};
  border: none;
  padding: clamp(6px, 1.2vw, 8px) clamp(12px, 2vw, 16px);
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 20px;
  
  &:hover {
    background: ${({ active }) => active ? theme.colors.highlight : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const DividerLine = styled.div`
  height: 1px;
  background: ${theme.colors.text.light};
  margin: 0 0 20px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(72px, 10vw, 92px);
  position: relative;
  width: 100%;
`;

const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  width: clamp(66px, 10.2vw, 82px);
  height: clamp(66px, 10.2vw, 82px);
  background: ${theme.colors.nuartBlue};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  /* Center the icons under their respective tabs by placing them at
     the horizontal centers of the two equal-width tabs: 25% and 75% */
  ${({ position }) => position === 'left' ? 'left: 25%;' : 'left: 75%;'}
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TextContent = styled.div<{ position: 'left' | 'right' }>`
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  /* Larger, more readable description text */
  font-size: clamp(16px, 3.8vw, 20px);
  line-height: 1.4;
  flex: 1;
  text-align: center;
  padding: 0 20px;
  min-height: clamp(72px, 10vw, 92px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ position }) => position === 'left' ? 'left: clamp(28px, 5.6vw, 40px);' : 'right: clamp(28px, 5.6vw, 40px);'}
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
`;

// ============================================================================
// Component
// ============================================================================

const MobileActionCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'calendar'>('upcoming');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: 'upcoming' | 'calendar') => {
    setActiveTab(tab);
  };

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left' && activeTab === 'upcoming') {
      setActiveTab('calendar');
    } else if (direction === 'right' && activeTab === 'calendar') {
      setActiveTab('upcoming');
    }
  }, [activeTab]);

  // Note: Content positioning is now handled by CSS in HomePage.styles.ts
  // This simplifies the layout and ensures reliable positioning

  // Touch/swipe functionality
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
        isSwiping = false;
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleSwipe]);

  return (
    <CardContainer ref={cardRef}>
      <TabContainer>
        <Tab 
          active={activeTab === 'upcoming'} 
          onClick={() => handleTabClick('upcoming')}
        >
          Films
        </Tab>
        <Tab 
          active={activeTab === 'calendar'} 
          onClick={() => handleTabClick('calendar')}
        >
          Calendar
        </Tab>
      </TabContainer>
      
      <DividerLine />
      
      <ContentContainer>
        {activeTab === 'upcoming' ? (
          <>
  <Link to="/films" aria-label="View films" style={{ display: 'inline-flex', borderRadius: 'inherit' }}>
      <IconContainer position="left">
            {/* Inline SVG for film icon (feather film) */}
            <svg viewBox="0 0 24 24" width="70%" height="70%" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
            </svg>
              </IconContainer>
            </Link>
            <TextContent position="right">
              Reserve seats for upcoming films
            </TextContent>
          </>
        ) : (
          <>
            <TextContent position="left">
              View all scheduled films
            </TextContent>
  <Link to="/calendar" aria-label="View calendar" style={{ display: 'inline-flex', borderRadius: 'inherit' }}>
      <IconContainer position="right">
            {/* Inline SVG for calendar icon (feather calendar) */}
            <svg viewBox="0 0 24 24" width="70%" height="70%" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
              </IconContainer>
            </Link>
          </>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default MobileActionCard;
