'use client'

import { useEffect, useState } from 'react'

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Apply theme on mount
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = savedTheme || (prefersDark ? 'dark' : 'light')

        const htmlElement = document.documentElement
        htmlElement.setAttribute('data-theme', theme)

        setMounted(true)
    }, [])

    if (!mounted) return <>{children}</>

    return <>{children}</>
}