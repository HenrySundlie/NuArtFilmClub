import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import FilmMenu from './pages/FilmMenu';
import FilmPage from './pages/FilmPage';
import Menu from './components/Menu';
import styled from '@emotion/styled';
import { theme } from './theme';
import { Global } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { isMobileViewport, onViewportChange } from './utils/responsive';

const globalStyles = `
  html, body {
    margin: 0;
    padding: 0;
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  * {
    box-sizing: border-box;
  }
  
  a {
    color: ${theme.colors.text.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};
  }
  
  a:hover {
    color: ${theme.colors.secondary};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      <AppContainer>
        <MenuVisibilityController />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/films" element={<FilmMenu />} />
          <Route path="/film/:id" element={<FilmPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

function MenuVisibilityController() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(() =>
  isMobileViewport()
  );

  useEffect(() => {
  return onViewportChange(setIsMobile);
  }, []);

  const isHome = useMemo(() => {
    const p = location.pathname.replace(/\/?$/, '/');
  return p === '/';
  }, [location.pathname]);

  if (isHome && isMobile) return null;
  return <Menu />;
}
