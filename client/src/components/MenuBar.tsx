import { useLocation } from 'react-router-dom';
import { Nav, NavContent, NavLink } from '../styles/MenuBar.styles';

export default function MenuBar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Nav isHome={isHome}>
      <NavContent>
        <NavLink to="/NuArtFilmSociety/">Home</NavLink>
        <NavLink to="/NuArtFilmSociety/calendar">Calendar</NavLink>
        <NavLink to="/NuArtFilmSociety/films">Films</NavLink>
      </NavContent>
    </Nav>
  );
}
