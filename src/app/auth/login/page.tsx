'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import styles from './login.module.scss'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!email || !password) {
            setError('Email dan password harus diisi')
            setLoading(false)
            return
        }

        try {
            console.log('🔄 Attempting login with:', email)

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            console.log('📊 Login response:', { data, signInError })

            if (signInError) {
                console.error('❌ Sign in error:', signInError)
                throw signInError
            }

            if (!data.user) {
                throw new Error('Login failed: No user data returned')
            }

            console.log('✅ Login successful, user:', data.user.email)

            setEmail('')
            setPassword('')

            // Wait a moment for session to be established
            await new Promise(resolve => setTimeout(resolve, 500))

            // Use window.location for more reliable redirect
            window.location.href = '/dashboard'

        } catch (err: any) {
            console.error('❌ Login error:', err)
            setError(err.message || 'Login gagal. Periksa email dan password Anda.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.card}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.logoWrapper}>
                            <div className={styles.logo}>✨</div>
                        </div>
                        <h1 className={styles.title}>ATMIFY</h1>
                        <p className={styles.subtitle}>
                            Selamat datang kembali! Masuk ke akun Anda
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className={styles.form}>
                        {/* Email */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className={styles.input}
                                    disabled={loading}
                                />
                                <span className={styles.inputIcon}>✉️</span>
                            </div>
                        </div>

                        {/* Password */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    className={styles.input}
                                    disabled={loading}
                                />
                                <span className={styles.inputIcon}>🔒</span>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                    disabled={loading}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className={styles.errorMessage}>
                                <span className={styles.errorIcon}>⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? (
                                <>
                                    <span>⏳</span>
                                    Sedang masuk...
                                </>
                            ) : (
                                <>
                                    <span>🔓</span>
                                    Masuk
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className={styles.footer}>
                        Belum punya akun?{' '}
                        <Link href="/auth/register" className={styles.footerLink}>
                            Daftar di sini
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}