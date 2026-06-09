import styles from '../Home.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function useIsDesktop(breakpoint = 600) {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

    useEffect(() => {
        const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isDesktop;
}

export const EventCard = ({ event, index, currentUserId }) => {
    const isDesktop = useIsDesktop();
    const navigate = useNavigate();
  

const attendees = [
    event.createdBy,
    ...event.interested
].filter(user => user._id.toString() !== currentUserId.toString());

const count = attendees.length;

    return (
        <div className={`${styles.card} ${index % 5 === 0 ? styles.color0 :
            index % 5 === 1 ? styles.color1 :
                index % 5 === 2 ? styles.color2 :
                    index % 5 === 3 ? styles.color3 :
                        styles.color4
            }`}>

            <div className={styles.firstLine}>
                <div>
                    <p className={styles.tag}>{event.type}</p>
                    <p>{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                </div>
                {/* <button ><img className={styles.iconXs} src="/icons/down.png" alt="Open" /></button> */}
            </div>
            <h3>{event.name} @{event.at}</h3>
            <div className={styles.thirdLine}>
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
               {isDesktop ? <button onClick={() => navigate(`/events/${event._id}`)} className="btn-details">View details</button>
              : <button onClick={() => navigate(`/events/${event._id}`)} className="btn-arrow"  ><img src="/icons/sendArrow2.png" alt="" /></button>}
            </div>

        </div>
    )
}