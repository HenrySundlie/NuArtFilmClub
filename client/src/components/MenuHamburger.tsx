import { theme } from '../theme';

export default function MenuHamburger() {
  return (
    <button
      style={{
        background: theme.colors.surface,
        color: theme.colors.text.primary,
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
      }}
    >
      ☰
    </button>
  );
}
