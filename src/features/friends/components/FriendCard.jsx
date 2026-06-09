import styles from '../Friends.module.css'
import userService from '../../../service/user.service'
import { useState } from 'react'

export const FriendCard = ({ friend, index }) => {

    const [deleted, setDeleted] = useState(false)

    const handleDeleteFriend = async (friendId) => {
        try {

            await userService.deleteFriend(friendId)
            setDeleted(true)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className={styles.card}>

            <div className={styles.left}>
                <div className={styles.initials}>
                    <p>{friend.name[0]}{friend.lastname[0]}</p>
                </div>


                <p className={styles.from}>{friend.name} {friend.lastname} </p>


            </div>
            <div className={styles.btns}>
               { deleted ? ( <p>Removed</p> ) : (<button className='btn-2' onClick={() => { handleDeleteFriend(friend._id) }}>Remove</button>)  } 
            </div>
        </div>
    )
}