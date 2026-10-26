import { useState, useEffect } from "react"
import userService from '../../../service/user.service'
import { FriendCard } from './FriendCard'
import styles from '../Friends.module.css'
import { Spinner } from '../../events/components/Spinner'



export const FriendList = ({ onNmbFriends, search }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await userService.getById()
                setFriends(user.friends)
                setLoading(false)

            } catch (err) {
                setError(true)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        onNmbFriends(friends.length)
    }, [friends])

    const friendsAndSearch = friends.filter(friend => `${friend.name} ${friend.lastname}`.toLowerCase().includes(search.toLowerCase()))

    if (error) return <p>Something went wrong</p>
    if (loading) return (
        <div className={styles.loading}>
            <Spinner label="Loading friends" />
        </div>
    )

    return (
        <div className={styles.listCards}>
            {friendsAndSearch.map((friend, index) => (
                <FriendCard key={friend._id} friend={friend} index={index} />
            ))}

        </div>
    )
}