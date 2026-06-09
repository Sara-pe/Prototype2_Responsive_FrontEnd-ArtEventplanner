import styles from './Home.module.css'
import { EventList } from './components/EventList'
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import { AddEvent } from './AddEvent'

function useIsDesktop(breakpoint = 880) {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

    useEffect(() => {
        const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isDesktop;
}

export const Home = () => {

    const [nmbEvents, setNmbEvents] = useState(0);
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const isDesktop = useIsDesktop();

    return (

        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.header}>

                    <div>
                        <h1>Art Events</h1>
                        <p className='subtitle'> We found {nmbEvents} events</p>
                    </div>


                    <div className={styles.buttons}>
                        {isDesktop ? (
                            <input className="search-field" type="text" value={search} placeholder="   Search event"
                                onChange={(e) => setSearch(e.target.value)} />
                        ) : (
                            <button className="btn-icon" onClick={() => setShowSearch(true)}> <img src="/icons/search.png" alt="Search event" /> </button>
                        )}
                        {isDesktop ? (
                            <button onClick={() => setShowModal(true)} className="btn-add"><img src="/icons/plus2.png" alt="Add event" />Add new event</button>
                        ) : (
                            <NavLink to="/add" className="btn-icon"><img src="/icons/plus.png" alt="Add event" /></NavLink>
                        )}
                    </div>


                </div>
                {showSearch && !isDesktop && (<div className={styles.searchContainer}>
                    <input type="text" value={search} placeholder=" Search event"
                        onChange={(e) => setSearch(e.target.value)} />

                    <button onClick={() => setShowSearch(false)}>{/*<img src="/icons/close.svg" alt="Close search bar" /> */}<p className='black'>Cancel</p></button>
                </div>
                )}

                <EventList onNmbEvents={setNmbEvents} search={search} refreshKey={refreshKey} />
            </div>

            {showModal && <AddEvent onClose={() => setShowModal(false)} onSuccess={() => { setRefreshKey(k => k + 1); setShowModal(false); }} />}

        </div>

    )
}