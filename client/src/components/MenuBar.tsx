import { Nav, NavContent, NavLink } from '../styles/MenuBar.styles';

export default function MenuBar() {
  return (
    <Nav>
      <NavContent>
        <NavLink to="/NuArtFilmSociety/">Home</NavLink>
        <NavLink to="/NuArtFilmSociety/calendar">Calendar</NavLink>
        <NavLink to="/NuArtFilmSociety/films">Films</NavLink>
      </NavContent>
    </Nav>
  );
}
