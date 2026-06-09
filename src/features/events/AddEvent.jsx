import { AddEventForm } from './components/AddEventForm'
import { NavLink } from 'react-router-dom'
import styles from './AddEvent.module.css'

export const AddEvent = () => {
    return (

        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}

                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Add Event</h1>

                        <NavLink to="/"> <img className={styles.prevArrow} src="/icons/prev.png" alt="Previous" /> </NavLink>
                    </div>

                    <AddEventForm />

                </div>
            </div>

        </div>
    )
}