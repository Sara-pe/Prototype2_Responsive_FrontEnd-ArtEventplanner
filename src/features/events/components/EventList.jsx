import eventService from '../../../service/event.service'
import { useState, useEffect } from 'react'
import styles from './EventList.module.css'
import { Spinner } from './Spinner'

export const EventList = ({ onNmbEvents, search, refreshKey, CardComponent, className, onReady }) => {

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

    }, [refreshKey])

    useEffect(() => {
        if (data) {
            onNmbEvents(data.created.length + data.interested.length)
        }
    }, [data])

    // Lets a parent page wait for the list before showing itself
    useEffect(() => {
        if (!isLoading) onReady?.()
    }, [isLoading])


    // Same container as the list, so the spinner is centered where the cards will appear
    if (isLoading) return (
        <div className={`${className} ${styles.loadingContainer}`}>
            <Spinner label="Loading events" />
        </div>
    )
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
        <div className={className}>
            {allEvents.map((event, index) => (
                <CardComponent key={event._id} event={event} index={index} currentUserId={data.userId} />
            ))}
        </div>
    )
}



