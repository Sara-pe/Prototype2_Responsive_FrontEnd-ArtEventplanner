import styles from './User.module.css'
import {UsersList} from './components/UsersList'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Users = () => {

    const [search, setSearch] = useState('')

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Find friends</h1>

                        
                       <NavLink to='/friends'> <img className={styles.prevArrow} src="/icons/prev.png" alt="" /></NavLink>
                    </div>

                    <div className={styles.searchContainer}>
                        <input type="text"  value={search}  placeholder="   Search users" 
                        onChange={(e) => setSearch(e.target.value)} />
                
                    </div>
                </div>

                <UsersList search={search}/>
            </div>
        </div>
    )
}