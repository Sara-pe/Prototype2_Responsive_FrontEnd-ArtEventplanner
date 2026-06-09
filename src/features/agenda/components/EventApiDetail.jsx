import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { RecCard } from './RecCard'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export const EventApiDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const [expanded, setExpanded] = useState(false)

    const textRef = useRef(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {

        const fetchDateApi = async () => {

            try {


                const eventDetailApi = await axios.get(`https://api.brussels:443/api/agenda/0.0.1/events/${id}`, {
                    headers:
                    {
                        Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                        Accept: 'application/json'

                    }
                }
                )

                setData(eventDetailApi.data.event)
                console.log(eventDetailApi.data.event)
                setLoading(false)

            } catch (err) {
                setError(true)
                setLoading(false)

            }
        }

        fetchDateApi()

    }, [])

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(textRef.current.scrollHeight > 208)
        }
    }, [data])


    if (loading) return <div className={styles.page}>
        <div className={styles.container}>
            <p>Loading...</p></div></div>

    if (error) return (
        <div>
            <div className='pageError'>
                <div className='containerError'>

                    <h2>We couldn't load this event</h2>
                    <h3>It may have been removed or is temporarily unavailable.</h3>
                    <NavLink className="btn-1" to='/agenda'>Go back</NavLink>

                </div>
            </div>
        </div>)

    if (!data) return null


    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h2 className={styles.nameAdapted}>{data.translations?.en?.name}</h2>


                        <NavLink to='/agenda'> <img className={styles.prevArrow} src="/icons/prev.png" alt="" /></NavLink>
                    </div>
                </div>

                {/* Event Info */}
                <div className={styles.eventDetails}>


                    {/* CardIntro*/}
                    <div className={styles.cardIntro}>
                        <img src={(Array.isArray(data.media) ? data.media?.[0]?.link : data.media?.link) || 'https://dummyimage.com/243x326/ccd6d9/266582.png&text=+'} alt={data.translations?.en?.name} />

                    </div>
                </div>


                <div className={styles.infoContainer}>
                    <div className={styles.locationContainer}>
                        <img src="/icons/building.png" alt="" />
                        <div>
                            <p className={styles.at}>{data.place?.translations?.en?.name}</p>
                            <p> {data.place?.translations?.en?.address_city}</p>
                        </div>
                    </div>

                    {data.is_free ? (
                        <p className={styles.hour}>Free</p>
                    ) : data.prices ? (
                        <p className={styles.hour}>
                            {Array.isArray(data.prices)
                                ? `€${data.prices[0]?.value}`
                                : `€${data.prices?.value}`
                            }
                        </p>
                    ) : (
                        <p>Various prices</p>
                    )}


                </div>

                <div className={styles.descripContainer}>
                    <div ref={textRef} className={expanded ? styles.textExpanded : styles.textCollapsed}>

                        {data.translations?.en?.longdescr?.split('\n').map((sentence, index) => (
                            <p key={index}>{sentence}</p>
                        ))}
                    </div>


                    {isOverflowing &&
                        <div className={styles.btnContainer}>
                            <button onClick={() => setExpanded(!expanded)} className='btn-2'>
                                {expanded ? 'Read less' : 'Read more'}
                            </button>
                        </div>}
                </div>

                <div className={styles.scheduleContainer}>

                    <h3>Dates</h3>

                    <div>

                        {data.weekschema ? (
                            Array.isArray(data.weekschema.translations?.en)
                                ? data.weekschema.translations.en.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))
                                : <p>{data.weekschema.translations?.en}</p>
                        ) : (
                            // Event-style: show specific dates and hours
                            (Array.isArray(data.dates) ? data.dates : data.dates ? [data.dates] : []).map((date, i) => (
                                <p key={i}>
                                    {new Date(date.day).toLocaleDateString('en-GB', {
                                        weekday: 'short', day: 'numeric', month: 'short'
                                    })}
                                    {date.start && ` · ${date.start.slice(0, 5)}`}
                                    {date.end && ` - ${date.end.slice(0, 5)}`}
                                </p>
                            ))
                        )}
                    </div>

                    <a className={styles.linkVB} href={data.translations?.en?.agenda_url} target="_blank" rel="noopener noreferrer">
                        visit.brussels <img className={styles.imgLinkVB} src="/icons/link.png" alt="Link to visit.brussles" />
                    </a>
                </div>




                <div className={styles.location}>

                    <iframe
                        width="100%"
                        height="216"
                        className={styles.maps}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(data.place?.translations?.en?.address_line1)}&output=embed`}
                    />

                </div>

                <NavLink to="/add-api" state={{ event: data }} className={styles.btnShare}> Add event </NavLink>


            </div>

        </div>

    )
}