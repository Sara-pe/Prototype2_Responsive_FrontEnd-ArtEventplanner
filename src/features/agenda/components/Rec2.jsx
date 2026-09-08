import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { RecCard } from './RecCard'

const toArray = (events) => {
    if (!events) return []
    if (Array.isArray(events)) return events
    if (Object.keys(events).length === 0) return []
    return [events]
}

export const Rec2 = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchArtEventsApi = async () => {

            try {
                const headers = {
                    Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                    Accept: 'application/json'
                }

        
                const [wiels, bozar, ninoMier, almineReich, laLoge, walterBlanc
                ] = await Promise.all([
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.3257873&lat=50.8243881&dist=10', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.3595536&lat=50.8442559&dist=10', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.3543284&lat=50.8399647&dist=10', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.3685720&lat=50.8190336&dist=10', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.3656810&lat=50.8284465&dist=10', { headers }),
                    axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location?lon=4.2995581&lat=50.8625391&dist=100', { headers }),


                ])

                const combined = [
                    ...toArray(wiels.data.response.results.event),
                    ...toArray(bozar.data.response.results.event),
                    ...toArray(ninoMier.data.response.results.event),
                    ...toArray(almineReich.data.response.results.event),
                    ...toArray(laLoge.data.response.results.event),
                    ...toArray(walterBlanc.data.response.results.event)
                ].sort((a, b) => new Date(a.date_end) - new Date(b.date_end))

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
            <h2>Contemporary art</h2>
            <div className={styles.carrousel}>
                <div className={styles.eventList}>
                    {data.map((event, index) => (<RecCard key={index} event={event} index={index} category="contemporary art events" list={data} />))}
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    )
}