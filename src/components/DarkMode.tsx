import { Switch } from '@headlessui/react'
import { type KeyboardEvent, useEffect, useState } from 'react'

export default function DarkMode() {
  const [enabled, setEnabled] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === 'Tab') {
      return
    }
    if (e.code.startsWith('Shift')) {
      toggleMode()
    }
  }

  /* v8 ignore next 7 */
  const handleSystemChange = (e: MediaQueryListEvent) => {
    const savedDarkMode = window.localStorage.getItem('isDarkMode')
    if (savedDarkMode === null) {
      document.documentElement.classList.toggle('dark', e.matches)
      setEnabled(e.matches)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const isSystemDarkMode = darkModeMediaQuery.matches
    const savedDarkMode = window.localStorage.getItem('isDarkMode')

    const isDarkMode =
      savedDarkMode === 'true' || (savedDarkMode === null && isSystemDarkMode)

    setEnabled(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    darkModeMediaQuery.addEventListener('change', handleSystemChange)
    return () =>
      darkModeMediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  function toggleMode() {
    const isDarkMode = !enabled
    setEnabled(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    /* v8 ignore next 4 */
    if (
      isDarkMode === window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      window.localStorage.removeItem('isDarkMode')
    } else {
      window.localStorage.setItem('isDarkMode', isDarkMode.toString())
    }
  }

  return (
    <Switch
      data-testid="button-dark-mode"
      checked={enabled}
      onChange={toggleMode}
      onKeyDown={handleKeyDown}
      className="relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 dark:focus:ring-offset-gray-800 dark:focus:ring-gray-400"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 rounded-full bg-gray-800 dark:bg-gray-200 ring-0 shadow-lg transition duration-200 ease-in-out translate-x-0 dark:translate-x-7"
      />
    </Switch>
  )
}
