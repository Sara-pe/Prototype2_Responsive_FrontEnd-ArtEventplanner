import styles from './Spinner.module.css'

export const Spinner = ({ label = 'Loading' }) => (
    <div className={styles.spinner} role="status" aria-label={label} />
)
