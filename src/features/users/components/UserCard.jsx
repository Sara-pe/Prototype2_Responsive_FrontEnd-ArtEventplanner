import styles from '../User.module.css'
import { useState } from 'react'
import userService from '../../../service/user.service'

export const UserCard = ({ user, index }) => {

    const [userSelected, setUserSelected] = useState('')

    const onConnectUser = async (user) => {
       try {
        const result = await userService.sendFriendRequest(user._id)
        console.log(result) 
        setUserSelected(user._id)
    } catch (err) {
        console.log(err) 
    }
    }

 

    return (
        <div className={styles.card}>

            <div className={styles.left}>
                <div className={styles.initials}>
                    <p>{user.name[0]}{user.lastname[0]}</p>
                </div>
                <p className={styles.from}>{user.name} {user.lastname} </p>
            </div>
            <div className={styles.btns}>
                <button onClick={() => onConnectUser(user)} className={userSelected ? 'btn-disabled' : 'btn-1'}
    disabled={userSelected === user._id}
>
    {userSelected === user._id ? 'Request sent' : 'Connect'}</button>
            </div>
        </div>
    )
}