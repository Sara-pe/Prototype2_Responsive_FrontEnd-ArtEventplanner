import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { RecCard } from './RecCard'

export const Rec1 = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(false)


    useEffect(() => {

        const fetchEventsApi = async () => {

            try {
                const eventsApi = await axios.get('https://api.brussels:443/api/agenda/0.0.1/events', {
                    headers: {
                        Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                       Accept: 'application/json'  
                    }
                })

                console.log('events', eventsApi.data)

              setData(eventsApi.data.response.results.event)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                setError(true)
            }
        }

        fetchEventsApi()

    }, [])


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>
    if (!data) return null

    return (

        <div className={styles.containerRec}>
            <h2>Popular</h2>
        <div className={styles.carrousel}>
            <div className={styles.eventList}>
                {data.map((event, index) => (
                    <RecCard key={index} index={index} event={event} />
                ))}
                <div className={styles.line}></div>
            </div>


        </div>
        </div>
    )

}

