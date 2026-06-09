import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { RecCard } from './RecCard'

export const Rec2 = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchArtEventsApi = async () => {

            //Guided tours contemporary art: events/category?mainCategory=102&subCategory=251
            //Painting: events/category?mainCategory=23&subCategory=30
            //Sculpture: events/category?mainCategory=23&subCategory=26
            //Installation: events/category?mainCategory=23&subCategory=29

            try {
                const headers = {
                    Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                    Accept: 'application/json'
                }

                const [painting, sculpture, contemporaryArt] = await Promise.all([
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/category?mainCategory=23&subCategory=30', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/category?mainCategory=23&subCategory=26', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/category?mainCategory=102&subCategory=251', { headers })
                ])

                const combined = [
                    ...(painting.data.response.results.event || []),
                    ...(sculpture.data.response.results.event || []),
                    ...(contemporaryArt.data.response.results.event || [])
                ]

                setData(combined)
                setLoading(false)


            } catch (err) {

                setError(true)
                setLoading(false)

            }

        }

        fetchArtEventsApi()

    }, [])

    if (error) return <p>Something went wrong</p>
    if (loading) return <p>Loading...</p>
    if (!data) return null

    return (
        <div className={styles.containerRec}>
            <h2>Exhibitions</h2>
            <div className={styles.carrousel}>
                <div className={styles.eventList}>
                    {data.map((event, index) => (<RecCard key={index} event={event} index={index} />))}
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    )
}