import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { HEADER_IMAGE_HEIGHT, MOBILE_CARD_HEIGHT } from '../styles/HomePage.styles';

// ============================================================================
// Styled Components
// ============================================================================

/**
 * Mobile action card positioned at the bottom edge of the header image
 * Provides quick access to upcoming films and calendar views
 */
const CardContainer = styled.div`
  position: absolute;
  top: ${HEADER_IMAGE_HEIGHT};
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 90%;
  max-width: 320px;
  /* Use a variable for consumers to reference height */
  --mobile-card-height: ${MOBILE_CARD_HEIGHT};
  min-height: var(--mobile-card-height);
  background: black;
  border-radius: 20px;
  padding: clamp(12px, 1.8vw, 16px);
  z-index: 50;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin-top: 8px;
  border: 1px solid ${theme.colors.text.light};
  
  /* Mobile only - hidden on desktop */
  display: none;
  
  /* Responsive adjustments */
  ${theme.breakpoints.mobile} {
    display: block;
    
    /* Ensure card doesn't get cut off on very small screens */
    @media (max-height: 600px) {
      top: calc(${HEADER_IMAGE_HEIGHT} - 20px);
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${({ active }) => active ? '#3C3C3C' : 'transparent'};
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
    background: ${({ active }) => active ? '#3C3C3C' : 'rgba(255, 255, 255, 0.05)'};
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
  width: clamp(60px, 9.2vw, 74px);
  height: clamp(60px, 9.2vw, 74px);
  background: ${theme.colors.nuartBlue};
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  ${({ position }) => position === 'left' ? 'left: clamp(24px, 5vw, 35px);' : 'right: clamp(24px, 5vw, 35px);'}
  top: 50%;
  transform: translateY(-50%);
`;

const TextContent = styled.div<{ position: 'left' | 'right' }>`
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(14px, 2.1vw, 16px);
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
          Upcoming
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
            <Link to="/NuArtFilmClub/films" aria-label="View films" style={{ display: 'inline-flex', borderRadius: 'inherit' }}>
              <IconContainer position="left">
                <BiCameraMovie style={{ width: '70%', height: '70%' }} color="white" strokeWidth={0.25} />
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
            <Link to="/NuArtFilmClub/calendar" aria-label="View calendar" style={{ display: 'inline-flex', borderRadius: 'inherit' }}>
              <IconContainer position="right">
                <FaCalendarAlt style={{ width: '70%', height: '70%' }} color="white" strokeWidth={0.1} />
              </IconContainer>
            </Link>
          </>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default MobileActionCard;
