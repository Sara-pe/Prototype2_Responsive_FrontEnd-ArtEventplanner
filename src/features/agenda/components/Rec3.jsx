import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { RecCard } from './RecCard'

export const Rec3 = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchDateApi = async () => {

            try {

                const today = new Date().toISOString().split('T')[0]

                const eventDateApi = await axios.get(`https://api.brussels:443/api/agenda/0.0.1/events/date?date=${today}`, {
                    headers:
                    {
                        Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                        Accept: 'application/json'

                    }
                }
                )

                setData(eventDateApi.data.response.results.event)
                setLoading(false)

            } catch (err) {

                setError(true)
                setLoading(false)

            }
        }

        fetchDateApi()

    }, [])


    if (error) return <p>Something went wrong</p>
    if (loading) return <p>Loading...</p>
    if (!data) return null

    return (

        <div className={styles.containerRec}>
            <h2>Today</h2>
            <div className={styles.carrousel}>
                <div className={styles.eventList}>
                {data.map((event, index) => (<RecCard key={index} event={event} index={index} />))}
                </div>
            </div>
        </div>
          
     
    )
}