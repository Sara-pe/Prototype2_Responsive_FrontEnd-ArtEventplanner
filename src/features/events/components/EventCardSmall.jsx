import styles from '../Home.module.css'
import { useNavigate } from 'react-router-dom';

export const EventCardSmall = ({ event, index, currentUserId }) => {

    const navigate = useNavigate();

    const attendees = [
        event.createdBy,
        ...event.interested
    ].filter(user => user._id.toString() !== currentUserId.toString());

    const count = attendees.length;

    return (
        <div className={styles.card2}
            onClick={() => navigate(`/events/${event._id}`)}
        >
            <div className={styles.firstLine}>
                <div>
                    <p className={`${styles.tag2} ${index % 5 === 0 ? styles.color0 :
                        index % 5 === 1 ? styles.color1 :
                            index % 5 === 2 ? styles.color2 :
                                index % 5 === 3 ? styles.color3 :
                                    styles.color4
                        }`}>{event.type}</p>
                    <p>{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                </div>
            </div>
            <h4>{event.name} @{event.at}</h4>
            <div className={styles.thirdLine}>
                <div className={styles.interested}>
                    <p className={`${styles.nmbInterested2} ${index % 5 === 0 ? styles.border0 :
                        index % 5 === 1 ? styles.border1 :
                            index % 5 === 2 ? styles.border2 :
                                index % 5 === 3 ? styles.border3 :
                                    styles.border4
                        }`}>+{attendees.length}</p>

                    {count === 0 && <p>No one yet</p>}

                    {count > 0 && count <= 2 && (
                        <div><p>{attendees.map(user => user.name).join(', ')} will go</p></div>
                    )}

                    {count > 2 && (
                        <div><p>{attendees.slice(0, 2).map(user => user.name).join(', ')} and {count - 2} more will go</p></div>
                    )}
                </div>
            </div>
        </div>
    )
}
