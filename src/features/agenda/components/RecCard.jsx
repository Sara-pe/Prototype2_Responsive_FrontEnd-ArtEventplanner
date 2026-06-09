import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState } from 'react';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

export const RecCard = ({ index, event }) => {

    const navigate = useNavigate();

    return (
        <div className={styles.eventCard}>

            <img src={(Array.isArray(event.media) ? event.media?.[0]?.link : event.media?.link) || 'https://dummyimage.com/243x326/ccd6d9/266582.png&text=+'} alt={event.translations?.en?.name} />

            {event?.is_permanent ? <p>Open year-round</p> : 
            
            (event?.date_end === event?.date_start) ? <p> {new Date(event.date_start).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            })}</p> :
                <p>
                    {new Date(event.date_start).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    })} - {new Date(event.date_end).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    })}
                </p>}


            <h3>{event.place?.translations?.en?.name} presents: {event.translations?.en?.name}</h3>


            {/*   <NavLink to="/add-api" state={{ event }} className={`btn-1 ${styles.btnFit}`}> Add event </NavLink> */}

            <button className={`btn-1 ${styles.btnFit}`} onClick={() => navigate(`/eventsApi/${event.id}`)}>More info</button>
        </div>
    )
}