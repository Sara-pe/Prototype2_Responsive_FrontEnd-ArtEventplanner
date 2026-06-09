import styles from './Agenda.module.css'
import { useState } from 'react'
import { Rec1 } from './components/Rec1'
import { Rec2 } from './components/Rec2'
import { Rec3 } from './components/Rec3'
import { Rec4 } from './components/Rec4'


export const Agenda = () => {


    const [date, setDate] = useState(new Date())

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

                <div className={styles.content}>
                    <Rec3 />
                    <Rec1 />
                     <Rec4 />  
                     <Rec2 />

                </div>
            </div>
        </div>
    )
}