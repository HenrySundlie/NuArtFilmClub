import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useMemo } from 'react';
import Home from './pages/Home';
const Calendar = lazy(() => import('./pages/Calendar'));
const FilmMenu = lazy(() => import('./pages/FilmMenu'));
const FilmPage = lazy(() => import('./pages/FilmPage'));
import Menu from './components/Menu';
import styled from '@emotion/styled';
import { theme } from './theme';
import { Global } from '@emotion/react';
// import { isMobileViewport, onViewportChange } from './utils/responsive';

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/films" element={<FilmMenu />} />
            <Route path="/film/:id" element={<FilmPage />} />
          </Routes>
        </Suspense>
      </AppContainer>
    </Router>
  );
}

function MenuVisibilityController() {
  const location = useLocation();
  // No need to track viewport here since we never show Menu on Home regardless of viewport.

  const isHome = useMemo(() => {
    const p = location.pathname.replace(/\/?$/, '/');
    return p === '/';
  }, [location.pathname]);

  // Never show global Menu on the Home route. Home page manages its own mobile menu.
  if (isHome) return null;
  return <Menu />;
}
