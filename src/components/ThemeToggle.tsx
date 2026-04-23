'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.scss'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Get saved theme or system preference
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

        setTheme(initialTheme)
        applyTheme(initialTheme)
    }, [])

    const applyTheme = (newTheme: 'light' | 'dark') => {
        const htmlElement = document.documentElement

        // Always set the data-theme attribute
        htmlElement.setAttribute('data-theme', newTheme)

        localStorage.setItem('theme', newTheme)
        console.log('🎨 Theme applied:', newTheme, 'data-theme:', htmlElement.getAttribute('data-theme'))
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        applyTheme(newTheme)
    }

    if (!mounted) return null

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <span className={styles.icon}>🌙</span>
            ) : (
                <span className={styles.icon}>☀️</span>
            )}
        </button>
    )
}