import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const ReactMarkdown = lazy(() => import('react-markdown'));
import {
  HeaderImageContainer,
  PageTitle,
  ContentSection,
  ContentText,
  FloatingLogo,
  TitleActions,
  TitleActionButton,
  HomeFooter,
  FooterGrid,
  FooterHeading,
  FooterText,
  FooterFinePrint,
  FooterCard,
} from '../styles/HomePage.styles';
import { MOBILE_QUERY } from '../utils/responsive';
import Menu from '../components/Menu';
import SafeImg from '../components/SafeImg';
import MobileActionCard from '../components/MobileActionCard';
import MainStreetImage from '/images/Main Street east side_0001 cropped.jpg';
import NuartOnMainStreet from '/images/NuartonMainStreetCropped.jpg';
import homeMd from '../content/home.md?raw';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    // Detect mobile viewport and keep updated
  const mql = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => {
      isMobileRef.current = mql.matches;
      setIsMobile(mql.matches);
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
        {/* Desktop-only quick navigation under the title */}
        {!isMobile && (
          <TitleActions aria-label="Primary navigation">
            <TitleActionButton href="/calendar">Calendar</TitleActionButton>
            <TitleActionButton href="/films">Films</TitleActionButton>
          </TitleActions>
        )}
        <SafeImg
          src={isMobile ? NuartOnMainStreet : MainStreetImage}
          alt="Historic Main Street"
          loading="eager"
        />
      </HeaderImageContainer>

  {/* Ensure the Menu icon appears in sync with the floating logo on mobile */}
  {isMobile && (
          <Menu visibleOverride={showFloatingLogo} />
      )}
      
      {/* Mobile action card now sits entirely below the header image */}
      <MobileActionCard />
      
      <ContentSection>
        <ContentText>
          <Suspense fallback={null}>
            <ReactMarkdown>{homeMd}</ReactMarkdown>
          </Suspense>
        </ContentText>

        {/* Footer: Contact + Credits */}
        <HomeFooter aria-labelledby="home-footer-heading">
          <FooterGrid>
            <FooterCard>
              <FooterHeading id="home-footer-heading">Contact Us</FooterHeading>
              <FooterText>
                <p>
                  Reach out to us on social or send us an email.
                </p>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/nuarttheatermoscow" target="_blank" rel="noreferrer noopener">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/nuartfilmclub" target="_blank" rel="noreferrer noopener">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hsundlie24@nsa.edu">hsundlie24@nsa.edu</a>
                  </li>
                </ul>
              </FooterText>
            </FooterCard>

            <FooterCard aria-labelledby="home-credits-heading">
              <FooterHeading id="home-credits-heading">Credits</FooterHeading>
              <FooterText>
                <p>Photography courtesy of Latah County Historical Society Photograph Collection.</p>
                <p>Website design and development by Henry Sundlie and Clive Miller.</p>
              </FooterText>
            </FooterCard>
          </FooterGrid>

          <FooterFinePrint>
            <span>516 S Main Street, Moscow, Idaho</span>
          </FooterFinePrint>
        </HomeFooter>
      </ContentSection>
    </>
  );
};

const ObservedHome = observer(Home);
export default ObservedHome;
