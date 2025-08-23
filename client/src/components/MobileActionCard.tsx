import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { theme } from '../theme';
import { HEADER_IMAGE_HEIGHT } from '../styles/HomePage.styles';

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
  background: black;
  border-radius: 20px;
  padding: 16px;
  z-index: 100;
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
  padding: 8px 16px;
  font-family: ${theme.typography.fontFamily};
  font-size: 18px;
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
  min-height: 80px;
  position: relative;
  width: 100%;
`;

const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  width: 70px;
  height: 70px;
  background: ${theme.colors.nuartBlue};
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  ${({ position }) => position === 'left' ? 'left: 35px;' : 'right: 35px;'}
  top: 50%;
  transform: translateY(-50%);
`;

const TextContent = styled.div<{ position: 'left' | 'right' }>`
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  font-size: 16px;
  line-height: 1.4;
  flex: 1;
  text-align: center;
  padding: 0 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ position }) => position === 'left' ? 'left: 40px;' : 'right: 40px;'}
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
`;

// ============================================================================
// Component
// ============================================================================

const MobileActionCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'calendar'>('upcoming');

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

  // Touch/swipe functionality
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      startX = touchEvent.touches[0].clientX;
      startY = touchEvent.touches[0].clientY;
      isSwiping = true;
    };

    const handleTouchMove = (e: Event) => {
      if (!isSwiping) return;
      
      const touchEvent = e as TouchEvent;
      const currentX = touchEvent.touches[0].clientX;
      const currentY = touchEvent.touches[0].clientY;
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

    const card = document.querySelector('[data-mobile-card]');
    if (card) {
      card.addEventListener('touchstart', handleTouchStart);
      card.addEventListener('touchmove', handleTouchMove);
      card.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (card) {
        card.removeEventListener('touchstart', handleTouchStart);
        card.removeEventListener('touchmove', handleTouchMove);
        card.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleSwipe]);

  return (
    <CardContainer data-mobile-card>
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
            <IconContainer position="left">
              <BiCameraMovie size={48} color="white" strokeWidth={0.25} />
            </IconContainer>
            <TextContent position="right">
              Reserve seats for upcoming films
            </TextContent>
          </>
        ) : (
          <>
            <TextContent position="left">
              View all scheduled films
            </TextContent>
            <IconContainer position="right">
              <FaCalendarAlt size={48} color="white" strokeWidth={0.1} />
            </IconContainer>
          </>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default MobileActionCard;
