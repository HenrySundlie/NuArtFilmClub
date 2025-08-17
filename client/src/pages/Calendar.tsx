import React from 'react';

export default function Calendar() {
  return (
    <div
      style={{
        background: '#eee',
        color: '#444',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <h1 style={{ color: '#111' }}>Calendar</h1>
      <p>Upcoming screenings will appear here.</p>
    </div>
  );
}
