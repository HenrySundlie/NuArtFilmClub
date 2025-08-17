import { useState } from 'react';
import { MenuIcon, MenuCard, NavLink } from '../styles/Menu.styles';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuIcon onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </MenuIcon>
      <MenuCard isOpen={isOpen}>
        <NavLink to="/NuArtFilmSociety/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/NuArtFilmSociety/calendar" onClick={toggleMenu}>Calendar</NavLink>
        <NavLink to="/NuArtFilmSociety/films" onClick={toggleMenu}>Films</NavLink>
      </MenuCard>
    </>
  );
}
