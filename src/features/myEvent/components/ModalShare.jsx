import styles from '../Event.module.css'
import userService from '../../../service/user.service'
import eventService from '../../../service/event.service'
import { useState, useEffect } from 'react'

export const ModalShare = ({ event, attendees, onClose }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [friends, setFriends] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const user = await userService.getById()
                const receivers = user.friends.filter(receiver => !attendees.some(attendee => attendee._id === receiver._id))
                setFriends(receivers)
                setLoading(false)
            } catch (err) {

                setError(true)
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    const [selected, setSelected] = useState([])

    const onSelectFriend = (friendId) => {
        if (selected.includes(friendId)) {
            setSelected(selected.filter(id => id !== friendId))
        } else {
            setSelected([...selected, friendId])
        }
    }

    const handleSend = async () => {
        try {
            await eventService.sendInvitations(event._id, selected)
            onClose()
        } catch (err) {
            console.log('error sending invitations:', err)
        }
    }


    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div className={styles.headerModal}>
                    <div className={styles.headerText}>
                        <h1>Share event</h1>
                        <p>{event.name} @{event.at}</p>
                    </div>
                    <button onClick={onClose}><img src="/icons/close.svg" alt="Close" /></button>
                </div>

                <div className={styles.friendsList}>
                    {friends.map(friend => <div
                        key={friend._id}
                        className={styles.card}
                        onClick={() => onSelectFriend(friend._id)}>
                        <div>
                            <div className={styles.initials}>
                                <p>{friend.name[0]}{friend.lastname[0]}</p>
                            </div>
                            <p className={styles.to}>{friend.name} {friend.lastname} </p>
                        </div>
                        <button
                            role="checkbox"
                            aria-checked={selected.includes(friend._id)}
                            aria-label={`Select ${friend.name}`}
                            className={`${styles.checkbox} ${selected.includes(friend._id) ? styles.checked : ''}`}
                        >
                            {selected.includes(friend._id) && <img src="/icons/check.png" style={{ width: '10px' }} />}
                        </button>
                    </div>)}
                </div>
                <button className={styles.btnShare} onClick={handleSend}>Share</button>
            </div>  </div>
    )
}