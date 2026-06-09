import { NavLink } from "react-router-dom"
import { useSetAtom } from "jotai"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { saveAtom } from '../../atoms/token.atom.js';

function useIsDesktop(breakpoint = 600) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}

export const NavBar = () => {
    const navigate = useNavigate()
    const setToken = useSetAtom(saveAtom)
    const isDesktop = useIsDesktop();


    const handleLogOut = () => {
        setToken(null);
        navigate('/');
    }


    return (
        <div className="navBar">
            <NavLink className='contNav' to="/">
                {isDesktop ? <><img src="/icons/home2.png" alt="Home" /><p>Home</p></> : <img src="/icons/home.png" alt="Home" />}
            </NavLink>
            <NavLink className='contNav' to="/friends">
                {isDesktop ? <><img src="/icons/friends2.png" alt="Friends" /><p>Friends</p></> : <img src="/icons/friends.png" alt="Friends" />}
            </NavLink>
            <NavLink className='contNav' to="/agenda">
                {isDesktop ? <><img src="/icons/agenda2.png" alt="Agenda" /><p>Agenda</p></> : <img src="/icons/agenda.png" alt="Agenda" />}
            </NavLink>
            <NavLink className='contNav' to="">
                {isDesktop ? <><img src="/icons/settings2.png" alt="Settings" /><p>Settings</p></> : <img src="/icons/settings.png" alt="Settings" />}
            </NavLink>
            <button className='contNav' onClick={handleLogOut}>
                {isDesktop ? <><img src="/icons/logout2.png" alt="Log out" /><p>Log out</p></> : <img src="/icons/logout.png" alt="Log out" />}
            </button>
        </div>
    )
}