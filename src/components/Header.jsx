export default function Header({ theme, onToggleTheme }) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <header className="header">
      <h1 className="header__title">Today</h1>
      <button
        type="button"
        className="button button--ghost"
        onClick={onToggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  )
}
