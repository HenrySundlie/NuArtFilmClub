import { useLocation } from 'react-router-dom';
import { Nav, NavContent, NavLink } from '../styles/MenuBar.styles';

export default function MenuBar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Nav isHome={isHome}>
      <NavContent>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/films">Films</NavLink>
      </NavContent>
    </Nav>
  );
}
