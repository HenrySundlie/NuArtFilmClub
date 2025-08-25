import { observer } from 'mobx-react-lite';
import ReactMarkdown from 'react-markdown';
import {
  HeaderImageContainer,
  PageTitle,
  ContentSection,
  ContentText,
  FloatingLogo,
} from '../styles/HomePage.styles';
import { useEffect, useRef, useState } from 'react';
import { MOBILE_QUERY } from '../utils/responsive';
import Menu from '../components/Menu';
import SafeImg from '../components/SafeImg';
import MobileActionCard from '../components/MobileActionCard';
import MainStreetImage from '/images/Main Street east side_0001 cropped.jpg';
import homeMd from '../content/home.md?raw';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    // Detect mobile viewport and keep updated
  const mql = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => {
      isMobileRef.current = mql.matches;
      // If we switch to desktop, hide the logo
      if (!isMobileRef.current) {
        setShowFloatingLogo(false);
      }
    };
    updateIsMobile();
    mql.addEventListener?.('change', updateIsMobile);

    const thresholdPx = 200; // wait for ~80px of scroll before showing
    const hysteresis = 8; // prevent flicker at the boundary
    const onScroll = () => {
      if (!isMobileRef.current) return;
      const title = titleRef.current;
      if (!title) return;
      const rect = title.getBoundingClientRect();
      // Show logo when title has moved up by threshold
  const shouldShow = rect.top < -thresholdPx || rect.bottom <= 0;
  // Simple hysteresis: if currently visible, keep until we pass back below threshold - hysteresis
  setShowFloatingLogo(shouldShow ? true : rect.top < -(thresholdPx - hysteresis) ? true : false);
    };

    // Run once to initialize, then on scroll
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      mql.removeEventListener?.('change', updateIsMobile);
    };
  }, []);

  return (
    <>
  <HeaderImageContainer darkFade={showFloatingLogo}>
        <FloatingLogo visible={showFloatingLogo}>NUART</FloatingLogo>
        <PageTitle ref={titleRef} fontWeight={400} letterSpacing="0.5rem" as="h1" overlay>
          NU ART FILM CLUB
        </PageTitle>
        <SafeImg
          src={MainStreetImage}
          alt="Historic Main Street"
          loading="lazy"
        />
      </HeaderImageContainer>

  {/* Ensure the Menu icon appears in sync with the floating logo on mobile */}
  <Menu visibleOverride={showFloatingLogo} />
      
      {/* Mobile action card now sits entirely below the header image */}
      <MobileActionCard />
      
      <ContentSection>
        <ContentText>
          <ReactMarkdown>{homeMd}</ReactMarkdown>
        </ContentText>
      </ContentSection>
    </>
  );
};

const ObservedHome = observer(Home);
export default ObservedHome;
