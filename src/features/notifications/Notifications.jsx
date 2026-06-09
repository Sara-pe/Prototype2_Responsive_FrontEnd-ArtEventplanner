import styles from './Notifications.module.css'
import { FriendRequestsList } from './components/FriendRequestsList'
import { EventInvitesList } from './components/EventInvitesList'
import { useEffect, useState } from 'react'

import { useSetAtom } from 'jotai'
import { NotificationAtom } from '../../atoms/notifications.atom'

export const Notifications = () => {


    const [active, setActive] = useState(1)
    const [nmbInvites, setNmbInvites] = useState(null)
    const [nmbRequests, setNmbRequests] = useState(null)
    const setNotifications = useSetAtom(NotificationAtom)

    const nmbNotifications = Math.floor((nmbRequests || 0) + (nmbInvites || 0))

    useEffect(() => {
        setNotifications(nmbNotifications)

    }, [nmbNotifications]

    )
    return (
        <div>

            <div className={styles.page}>
                <div className={styles.container}>

                    {/* Header */}
                    <div className={styles.header}>
                        <h1>Notifications</h1>
                        <p className='subtitle'>You have {nmbNotifications} notifications</p>
                    </div>
                    <div className={styles.buttons}>


                        <button onClick={() => setActive(1)} className={(active === 1) ? styles.btnOn : styles.btnOff}>
                            <p>Friend Requests</p>
                            <p className={styles.nmb}>{nmbRequests}</p>
                        </button>

                        <button onClick={() => setActive(2)} className={(active === 2) ? styles.btnOn : styles.btnOff}>
                            <p>Event Invites</p>
                            <p className={styles.nmb} >{nmbInvites}</p>
                        </button>
                    </div>

                    <div className={active === 1 ? styles.visible : styles.hidden}>
                        <FriendRequestsList onNmbRequests={setNmbRequests} />
                    </div>

                    <div className={active === 2 ? styles.visible : styles.hidden}>
                        <EventInvitesList onNmbInvites={setNmbInvites} />

                    </div>
                </div>
            </div>

        </div>
    )
}