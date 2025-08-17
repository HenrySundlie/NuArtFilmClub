import { Nav, NavContent, NavLink } from '../styles/MenuBar.styles';

export default function MenuBar() {
  return (
    <Nav>
      <NavContent>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/films">Films</NavLink>
      </NavContent>
    </Nav>
  );
}
