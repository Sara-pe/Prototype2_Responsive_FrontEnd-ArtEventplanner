import { AddEventForm } from './components/AddEventForm'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import styles from './AddEvent.module.css'

export const AddEvent = ({ onClose, onSuccess }) => {

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}

                <div className={styles.header}>
                    {/* onClose is only passed when shown as the desktop pop-up */}
                    <div className={onClose ? `${styles.title} ${styles.titlePopup}` : styles.title}>
                        <h1>Add Event</h1>
                        {onClose
                            ? <button className={styles.closeButtonPopup} onClick={onClose} aria-label="Close"><X size={19} /></button>
                            : <NavLink to="/"><img className={styles.prevArrow} src="/icons/prev.png" alt="Previous" /></NavLink>
                        }
                    </div>

                    <AddEventForm onSuccess={onSuccess} isPopup={Boolean(onClose)} />

                </div>
            </div>

        </div>
    )
}
