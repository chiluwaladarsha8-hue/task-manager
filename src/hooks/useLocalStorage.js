import { useEffect, useState } from 'react'

/**
 * Works like useState, but the value is saved to localStorage so it
 * survives a page refresh.
 *
 * - The initial read happens once (lazy initial state), not on every render.
 * - useEffect writes the value back to localStorage whenever it changes.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      // Corrupted or unavailable storage: fall back to the default.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked (e.g. private browsing): ignore and keep
      // the app working in memory.
    }
  }, [key, value])

  return [value, setValue]
}
