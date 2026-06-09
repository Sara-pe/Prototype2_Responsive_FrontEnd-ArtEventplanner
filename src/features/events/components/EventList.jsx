import eventService from '../../../service/event.service'
import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'

import styles from '../Home.module.css'

export const EventList = ({ onNmbEvents, search }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)


    useEffect(() => {

        const fetchEvents = async () => {

            try {
                const events = await eventService.getAll()
                console.log('events:', events)
                setData(events);
                setLoading(false)
                setError(false)

            } catch (err) {
                console.log('error:', err)
                setData(null)
                setLoading(false)
                setError(true)
            }
        }

        fetchEvents()

    }, [])

    useEffect(() => {
        if (data) {
            onNmbEvents(data.created.length + data.interested.length)
        }
    }, [data])


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>
    if (!data) return null


    // All events sorted from most recent

    const allEvents = [...data.created, ...data.interested].sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(a.date) - new Date(b.date)
    })
        .filter(event => `${event.name} ${event.at} ${event.type}`.toLowerCase().includes(search.toLowerCase()))


    //a.date is a string  "2026-04-23T00:00:00.000Z" (deduction not possible) -> new Date(...) makes it a Date object ("2026-04-24")

    return (
        <div className={styles.listCards}>

            {data && allEvents.map((event, index) => (
                <EventCard key={event._id} event={event} index={index} currentUserId={data.userId} />
            ))
            }
        </div>
    )
}



