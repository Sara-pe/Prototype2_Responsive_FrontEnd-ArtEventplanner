import { LoginForm } from './components/LoginForm.jsx'
import styles from './Auth.module.css'

export const Login = () => {

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Logo */}
                <div className={styles.logoWrapper}>
                    <span className={styles.logo}>ARTFORM</span>
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <h1>Welcome back</h1>
                    <p className='subtitle'>Sign in to your account</p>
                </div>

                <LoginForm />

            </div>
        </div>
    )
}