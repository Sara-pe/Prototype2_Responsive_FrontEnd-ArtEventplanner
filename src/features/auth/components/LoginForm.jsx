import { useId } from 'react';
import { NavLink } from 'react-router'
import styles from '../Auth.module.css'
import { useNavigate } from 'react-router'
import { useState } from 'react';

import authService from '../../../service/auth.service'

//JOTAI ATOMS
import { useSetAtom } from 'jotai';
import { saveAtom } from '../../../atoms/token.atom.js';
import { NotificationAtom } from '../../../atoms/notifications.atom.js'
import { nameAtom } from '../../../atoms/name.atom.js'


export const LoginForm = () => {

    const id = useId();
    const navigate = useNavigate();

    const [error, setError] = useState('')

    const setToken = useSetAtom(saveAtom)
    const setNotifications = useSetAtom(NotificationAtom)
    const setName = useSetAtom(nameAtom)

    const handleLoginSubmit = async (formData) => {

        //Convert into an JS object
        const data = Object.fromEntries(formData.entries());

        try {
            const reply = await authService.login(data);

            console.log(reply.token);
            console.log(reply.nmbNotifications);

            setToken(reply.token);
            setNotifications(reply.nmbNotifications);
            setName(reply.name);
            navigate('/');

        } catch (err) {
            if (err.status === 401) {
                setError(err.message);
            } else {
                navigate('/error');
            }
        }
    }

    return (
        <form className={styles.form} action={handleLoginSubmit}>

            <div className={styles.btnFields}>
                <div className={styles.fields}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'email'}>Email</label>
                        <input id={id + 'email'} type="email" name='email' className={styles.input} />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'password'}>Password</label>
                        <input id={id + 'password'} type="password" name='password' className={styles.input} />
                    </div>

                     {error && <div className='error'><p>{error}</p> </div>}

                </div>

                <button className={styles.btn} type="submit">Log in</button>

            </div>


            {/* Divider */}
            <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine} />
            </div>

            <div className={styles.switchPrompt}>
                <p>Don't have an account? <NavLink className={styles.switchLink} to="/auth/register">sign in</NavLink></p>
            </div>
        </form>
    )
}