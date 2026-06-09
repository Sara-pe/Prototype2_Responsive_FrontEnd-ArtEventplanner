import styles from '../User.module.css'
import { useState, useEffect } from 'react'
import userService from '../../../service/user.service'
import { UserCard } from './UserCard'


export const UsersList = ({ search }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([]);
    const [myId, setMyId] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            try {

                const dataUsers = await userService.getAll()
                setLoading(false)
                setUsers(dataUsers.users)
                const user = await userService.getById()
                setFriends(user.friends)
                setMyId(user._id)


            } catch (err) {

                setError(true)
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    //(1)Filter the users that don't have that id, (2) and the users that have a friendshipRequest pending from the user
    const nonFriends = users
    .filter(user => 
        !friends.some(friend => friend._id === user._id) && 
        user._id !== myId && 
        !user.friendRequests.some(request => request.from._id === myId)
    )

        //(3) the filter of the search input
        .filter(user => `${user.name} ${user.lastname}`.toLowerCase().includes(search.toLowerCase()))


    if (error) return (<p>somthing went wrong</p>)
    if (loading) return <p>Loading...</p>

    return (

        <div className={styles.listCards}>
            {nonFriends.map((user, index) => <UserCard key={user._id} user={user} index={index} />)}
        </div>
    )
}