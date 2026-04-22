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
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (signInError) throw signInError

            setEmail('')
            setPassword('')
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Login gagal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>ATMIFY</h1>
                    <p className={styles.subtitle}>Masuk ke akun Anda</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className={styles.input}
                        />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button type="submit" disabled={loading} className={styles.submitButton}>
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Belum punya akun?{' '}
                    <Link href="/auth/register" className={styles.link}>
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    )
}