
import { RegisterForm } from './components/RegisterForm'
import styles from './Auth.module.css'

export const Register = () => {
    return (
            <div className={styles.page}>
                <div className={styles.container}>

                    {/* Logo */}
                    <div className={styles.logoWrapper}>
                        <span className={styles.logo}>ARTFORM</span>
                    </div>

                    {/* Header */}
                    <div className={styles.header}>
                        <h1>Create Account</h1>
                         <p className='subtitle'>Join the art community</p>
                    </div>

                    <RegisterForm />

                </div>
            </div>
        
    )
}