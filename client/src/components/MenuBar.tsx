import React from 'react';

export default function MenuBar() {
  return (
    <nav
      style={{
        background: '#ccc',
        padding: '0.5rem',
        display: 'flex',
        gap: '1rem',
      }}
    >
      <a href="/" style={{ color: '#000' }}>
        Home
      </a>
      <a href="/calendar" style={{ color: '#000' }}>
        Calendar
      </a>
      <a href="/films" style={{ color: '#000' }}>
        Films
      </a>
    </nav>
  );
}
