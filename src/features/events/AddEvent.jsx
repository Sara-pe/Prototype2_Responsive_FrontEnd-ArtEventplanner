import { useState, useEffect } from 'react'
import { AddEventForm } from './components/AddEventForm'
import { NavLink } from 'react-router-dom'
import styles from './AddEvent.module.css'

function useIsDesktop(breakpoint = 600) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}

export const AddEvent = ({ onClose, onSuccess }) => {
    const isDesktop = useIsDesktop();

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}

                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Add Event</h1>
                        {isDesktop
                            ? <button onClick={onClose}><img className={styles.closeIcon} src="/icons/close.svg" alt="Close" /></button>
                            : <NavLink to="/"><img className={styles.prevArrow} src="/icons/prev.png" alt="Previous" /></NavLink>
                        }
                    </div>

                    <AddEventForm onSuccess={onSuccess} />

                </div>
            </div>

        </div>
    )
}
