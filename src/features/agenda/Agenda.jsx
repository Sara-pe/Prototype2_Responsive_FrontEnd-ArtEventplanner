import styles from './Agenda.module.css'
import { Rec1 } from './components/Rec1'
import { Rec2 } from './components/Rec2'
import { Rec3 } from './components/Rec3'
import { Rec4 } from './components/Rec4'
import { Spinner } from '../events/components/Spinner'
import { useState, useCallback } from 'react'

const SECTIONS = ['rec1', 'rec2', 'rec3', 'rec4']

export const Agenda = () => {

    const [date, setDate] = useState(new Date())

    // Names of the sections that finished loading. A Set, so a section reporting twice only counts once
    const [readySections, setReadySections] = useState(() => new Set())
    const markReady = useCallback(name => {
        setReadySections(prev => prev.has(name) ? prev : new Set(prev).add(name))
    }, [])
    const allReady = SECTIONS.every(name => readySections.has(name))

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.header}>

                    <p>{date.toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long'
                    }).toUpperCase()}</p>

                    <div className={styles.country}>
                        <img src="/imgs/flag.png" alt="Belgian flag" />
                        <h1>Brussels</h1>
                    </div>
                </div>

                {!allReady && (
                    <div className={styles.agendaLoading}>
                        <Spinner label="Loading events" />
                    </div>
                )}

                {/* Sections stay mounted while hidden so they can fetch their data */}
                <div className={styles.content} style={allReady ? undefined : { display: 'none' }}>
                    <Rec3 onReady={() => markReady('rec3')} />
                    <Rec1 onReady={() => markReady('rec1')} />
                    <Rec4 onReady={() => markReady('rec4')} />
                    <Rec2 onReady={() => markReady('rec2')} />

                </div>
            </div>

        </div>
    )
}
