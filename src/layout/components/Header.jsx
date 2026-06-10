import { NavLink } from "react-router-dom"
import { NotificationAtom } from '../../atoms/notifications.atom'
import { nameAtom } from '../../atoms/name.atom.js'
import { useAtomValue } from "jotai"
import { useState, useEffect } from "react"
import { Notifications } from '../../features/notifications/Notifications'

function useIsDesktop(breakpoint = 600) {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

    useEffect(() => {
        const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isDesktop;
}

export const Header = () => {

    const notifications = useAtomValue(NotificationAtom)
    const name = useAtomValue(nameAtom)
    const isDesktop = useIsDesktop();
    const [showNotifications, setShowNotifications] = useState(false);


    return (

        <div className="page" >
            <div className="header">
                <p className="logo">ARTFORM</p>

                <div className="divWelcome">
                    {isDesktop && <p>Welcome, <span className="bold">{name}</span></p>}


                    <div className="btn-icon">
                        {isDesktop
                            ? <button onClick={() => setShowNotifications(!showNotifications)}><img src="/icons/notifications.png" alt="Notifications" /></button>
                            : <NavLink to="/notifications"><img src="/icons/notifications.png" alt="Notifications" /></NavLink>
                        }
                        <div className="nmb-notifications">  <p>{notifications}</p></div>
                    </div></div> </div>

           {showNotifications && (
  <>
    <Notifications />
  </>
)}
            
        </div>

    )
}