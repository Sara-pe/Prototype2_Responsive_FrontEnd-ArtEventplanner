import eventService from '../../service/event.service'
import { useState, useEffect } from 'react'
import styles from './Event.module.css'
import { useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import { ModalShare } from './components/ModalShare'
import { useNavigate } from 'react-router-dom';

import { useAtom } from 'jotai'
import { saveAtom } from '../../atoms/token.atom'



export const EventDetail = () => {

    const { id } = useParams();

    const [token] = useAtom(saveAtom)
    const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).id : null

    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState('')
    const [error, setError] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        const fetchEvent = async () => {

            try {
                const eventInfo = await eventService.getById(id)
                setEvent(eventInfo);
                setLoading(false)
                setError(false)

            } catch (err) {
                console.log('error:', err)
                setEvent(null)
                setLoading(false)
                setError(true)
            }
        }

        fetchEvent()

    }, [])


    const handleDelete = async (eventId) => {

        try {
            await eventService.deleteEvent(eventId)
            navigate('/')

        } catch (err) {
            console.log(err)
        }
    }


    if (isLoading) return <div className={styles.page}>
        <div className={styles.container}>
            <p>Loading...</p></div></div>

    if (error) return <div className={styles.page}>
        <div className={styles.container}>
            <p>Something went wrong</p></div></div>

    if (!event) return null

    const interested = event.interested ?? [];
    const count = interested.length;

    const attendees = [event.createdBy, ...interested].filter(
        user => user._id.toString() !== currentUserId?.toString()
    );

    //toString() because the ids are ObjectId and you cannot compare objectIds

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Your event!</h1>


                        <NavLink to='/'> <img className={styles.prevArrow} src="/icons/prev.png" alt="" /></NavLink>
                    </div>
                </div>

                {/* Event Info */}
                <div className={styles.eventDetails}>

                    {/* SVG CardIntro */}
                    <div className={styles.containerCardIntro}>
                        <svg width="100%" height="216" viewBox="0 0 360 216" preserveAspectRatio="none">
                            <path
                                d="M32,0 Q0,0 0,32 L0,120 Q0,152 32,152 L112,152 Q144,152 144,184 Q144,216 176,216 L328,216 Q360,216 360,184 L360,32 Q360,0 328,0 Z"
                                fill="#EAF1F3"
                            />
                            <foreignObject x="0" y="0" width="360" height="240">
                                <div xmlns="http://www.w3.org/1999/xhtml">


                                    {/* CardIntro */}
                                    <div className={styles.cardIntro}>
                                        <div className={styles.intro}>
                                            <div>
                                                <p className={styles.tag}>{event.type}</p>
                                                <h2 className={styles.nameAdapted}>{event.name}</h2>
                                            </div>
                                            <p>{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                                        </div>
                                        <div className={styles.contImg}>



                                            {(event.type === "Cinema") && <img className={styles.imgCinema} src="/imgs/cinema.png" alt="Cinema" />}
                                            {(event.type === "Concert") && <img className={styles.imgMicro} src="/imgs/micro1.png" alt="Microphone" />}
                                            {(event.type === "Talk") && <img className={styles.imgMicro} src="/imgs/micro1.png" alt="Microphone" />}
                                            {(event.type === "Dance") && <img className={styles.imgDance} src="/imgs/ballet.png" alt="Dance" />}
                                            {(event.type === "Workshop") && <img className={styles.imgWorkshop} src="/imgs/workshop.png" alt="Workshop" />}
                                            {(event.type === "Expo") && <img className={styles.imgExpo} src="/imgs/expo.png" alt="Expo" />}
                                            {(event.type === "Theatre") && <img className={styles.imgTheatre} src="/imgs/theatre.png" alt="Theatre" />}
                                        </div>
                                    </div>

                                    {/* ---- */}

                                </div>
                            </foreignObject>
                        </svg>

                        {/* ---- */}

                        <div className={styles.interested}>
                            <p className={styles.nmbInterested}>+{attendees.length}</p>


                            {count === 0 && (
                                <p>No one yet</p>
                            )}

                            {count > 0 && count <= 2 && (
                                <div>
                                    <p>
                                        {attendees.map(user => user.name).join(', ')} will go</p>
                                </div>
                            )}

                            {count > 2 && (
                                <div>
                                    <p>
                                        {attendees.slice(0, 2).map(user => user.name).join(', ')} and {count - 2} more will go
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.locationContainer}>
                            <img src="/icons/building.png" alt="" />
                            <div>
                                <p className={styles.at}>{event.at}</p>
                                <p>{event.city}</p>
                            </div>
                        </div>
                        <p className={styles.hour}>{event.hour}hrs</p>
                    </div>

                    <div className={styles.location}>
                        <div className={styles.contAddress}>
                            <p>📍 {event.address}</p>
                        </div>

                        <iframe
                            width="100%"
                            height="216"
                            className={styles.maps}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`}
                        />

                    </div>
                    {showModal &&
                        <ModalShare key={event._id} event={event} attendees={attendees} onClose={() => setShowModal(false)} />}

                    <div className={styles.btns}>
                        <button className={styles.btnShare} onClick={() => { setShowModal(true) }}>Share Event</button>
                        <button className={styles.btnDelete} onClick={() => handleDelete(event._id)}>Delete</button>
                    </div>

                </div>

            </div>
        </div>
    )
}



