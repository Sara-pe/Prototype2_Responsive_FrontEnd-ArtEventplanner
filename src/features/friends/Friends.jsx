
import styles from './Friends.module.css'
import { FriendList } from './components/FriendList'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function useIsDesktop(breakpoint = 768) {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

    useEffect(() => {
        const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isDesktop;
}

export const Friends = () => {

    const [nmbFriends, setNmbFriends] = useState(0)
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const isDesktop = useIsDesktop();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1>Friends</h1>
                        <p className='subtitle'> You have {nmbFriends} friends</p>
                    </div>

                    <div className={styles.buttons}>
                        {isDesktop ? (
                            <input className="search-field" type="text" value={search} placeholder="   Search friend"
                                onChange={(e) => setSearch(e.target.value)} />
                        ) : (
                            <button className="btn-icon" onClick={() => { setShowSearch(true) }}> <img src="/icons/search.png" alt="Search event" /> </button>
                        )}
                        <NavLink to='/users' className={isDesktop ? 'btn-add' : 'btn-icon'}>
                            <img src={isDesktop ? "/icons/plus2.png" : "/icons/plus.png"} alt="Add friend" />
                            {isDesktop && <>Add new friend</>}
                        </NavLink>
                    </div>
                </div>

                {showSearch && (<div className={styles.searchContainer}>
                    <input type="text" value={search} placeholder="   Search friend"
                        onChange={(e) => setSearch(e.target.value)} />

                    <button onClick={() => setShowSearch(false)}>{/*<img src="/icons/close.svg" alt="Close search bar" /> */}<p className='black'>Cancel</p></button>
                </div>
                )}

                <FriendList onNmbFriends={setNmbFriends} search={search} />
            </div>
        </div>


    )
}