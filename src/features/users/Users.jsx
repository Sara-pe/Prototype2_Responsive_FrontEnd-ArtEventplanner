import styles from './User.module.css'
import {UsersList} from './components/UsersList'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function useIsDesktop(breakpoint = 600) {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

    useEffect(() => {
        const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isDesktop;
}

export const Users = () => {

    const [search, setSearch] = useState('')
    const isDesktop = useIsDesktop();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Find friends</h1>

                        
                       {!isDesktop && <NavLink to='/friends'> <img className={styles.prevArrow} src="/icons/prev.png" alt="" /></NavLink>}
                    </div>

                    <div className={styles.searchContainer}>
                        <input className="search-field" type="text"  value={search}  placeholder="Search users" 
                        onChange={(e) => setSearch(e.target.value)} />
                
                    </div>
                </div>

                <UsersList search={search}/>
            </div>
        </div>
    )
}