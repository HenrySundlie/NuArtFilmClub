import { TopNavBar, NavList, TopNavLink } from '../styles/MenuBar.styles';

export default function TopNav() {
  return (
    <TopNavBar>
      <NavList>
        <li>
          <TopNavLink to="/">Home</TopNavLink>
        </li>
        <li>
          <TopNavLink to="/calendar">Calendar</TopNavLink>
        </li>
        <li>
          <TopNavLink to="/films">Films</TopNavLink>
        </li>
      </NavList>
    </TopNavBar>
  );
}
