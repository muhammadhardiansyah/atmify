'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
        setTheme(currentTheme || 'light')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
    }

    return { theme, toggleTheme }
}