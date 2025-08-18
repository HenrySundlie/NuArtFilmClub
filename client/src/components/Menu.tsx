import { useState, useEffect, useRef } from 'react';
import { MenuIcon, MenuCard, NavLink } from '../styles/Menu.styles';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const ANIMATION_DURATION = 400; // ms, matches CSS transition

  // Only show the icon when menu is closed and not animating
  const [iconVisible, setIconVisible] = useState(true);

  const openMenu = () => {
    setIconVisible(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setIconVisible(true), ANIMATION_DURATION);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuCardRef.current &&
        !menuCardRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {iconVisible && !isOpen && (
        <MenuIcon onClick={openMenu}>
          <div />
          <div />
          <div />
        </MenuIcon>
      )}
      <MenuCard isOpen={isOpen} ref={menuCardRef}>
        <NavLink to="/NuArtFilmSociety/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/NuArtFilmSociety/calendar" onClick={closeMenu}>Calendar</NavLink>
        <NavLink to="/NuArtFilmSociety/films" onClick={closeMenu}>Films</NavLink>
      </MenuCard>
    </>
  );
}
