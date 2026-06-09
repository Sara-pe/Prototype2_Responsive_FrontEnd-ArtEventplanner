import styles from '../Notifications.module.css'
import eventService from '../../../service/event.service'
import { useState } from 'react'


export const InviteCard = ({ invite, index }) => {

        const [declined, setDeclined] = useState(false)
        const [accepted, setAccepted] = useState(false)

    const onHandleDecline = async (inviteId, eventId) => {
        try {
            await eventService.updateInvitation(inviteId, eventId, 'declined')
            setDeclined(true)
        } catch (err) {
            console.log(err)
        }
    }

    
    const onHandleAccept = async (inviteId, eventId) => {
        try {
            await eventService.updateInvitation(inviteId, eventId, 'accepted')
            setAccepted(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className={`${styles.card} ${index % 5 === 0 ? styles.color0 :
            index % 5 === 1 ? styles.color1 :
                index % 5 === 2 ? styles.color2 :
                    index % 5 === 3 ? styles.color3 :
                        styles.color4
            }`}>

            <div className={styles.firstLine}>
                <p className={styles.tag}>{invite.eventType}</p>
                <p>{new Date(invite.eventDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            </div>


            <h3>{invite.eventName} @{invite.eventAt}</h3>

            <div className={styles.thirdLine}>
                <div className={styles.initials}>
                    <p>{invite.from.name[0]}{invite.from.lastname[0]}</p>
                </div>
                <p>Invited by <span className={styles.from}>{invite.from.name} {invite.from.lastname}</span></p>

            </div>
            <div className={styles.btns}>

              { !declined &&(!accepted ? (<button onClick={() => onHandleAccept(invite._id, invite.eventId)} className='btn-3'>I'll go</button>) : <p>The invitation has been accepted</p>) } 
              { !accepted && (!declined ? (<button onClick={() => onHandleDecline(invite._id, invite.eventId)} className='btn-2'>Can't make it</button>) : <p>The invitation has been rejected</p>) }
            </div>

        </div>
    )
}