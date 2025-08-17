import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import FilmMenu from './pages/FilmMenu';
import FilmPage from './pages/FilmPage';
import MenuBar from './components/MenuBar';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background: #fafafa;
  color: #222;
`;

export default function App() {
  return (
    <Router>
      <AppContainer>
        <MenuBar />
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
