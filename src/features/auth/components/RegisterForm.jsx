import { useId } from 'react';
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router';
import styles from '../Auth.module.css'
import authService from '../../../service/auth.service'
import { useState } from 'react';

export const RegisterForm = () => {
    const id = useId();
    const navigate = useNavigate();

    const [error, setError] = useState('')

    const handleRegisterSubmit = async (formData) => {

        console.log(formData)
        setError('');
        //Convert into an JS object
        const data = Object.fromEntries(formData.entries())

        try {
            await authService.register(data);
            navigate('/auth/login');
        } catch (err) {
            if (err.status === 409) {
                setError(err.message);
            } else {
                navigate('/error');
            }
        }
    }

    return (
        <form className={styles.form} action={handleRegisterSubmit}>
            <div className={styles.btnFields}>
                <div className={styles.fields}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'name'}>Name</label>
                        <input id={id + 'name'} type="text" name="name" className={styles.input} />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'lastname'}>Last name</label>
                        <input id={id + 'lastname'} type="text" name='lastname' className={styles.input} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'neighborhood'} required>Neighborhood</label>
                        <select className={styles.select} name="neighborhood">
                            <option value="">Select your neighborhood</option>
                            <option value="1000">1000 - Brussels Centre</option>
                            <option value="1020">1020 - Laeken</option>
                            <option value="1030">1030 - Schaerbeek</option>
                            <option value="1040">1040 - Etterbeek</option>
                            <option value="1050">1050 - Ixelles</option>
                            <option value="1060">1060 - Saint-Gilles</option>
                            <option value="1070">1070 - Anderlecht</option>
                            <option value="1080">1080 - Molenbeek-Saint-Jean</option>
                            <option value="1081">1081 - Koekelberg</option>
                            <option value="1082">1082 - Berchem-Sainte-Agathe</option>
                            <option value="1083">1083 - Ganshoren</option>
                            <option value="1090">1090 - Jette</option>
                            <option value="1120">1120 - Neder-Over-Heembeek</option>
                            <option value="1130">1130 - Haren</option>
                            <option value="1140">1140 - Evere</option>
                            <option value="1150">1150 - Woluwe-Saint-Pierre</option>
                            <option value="1160">1160 - Auderghem</option>
                            <option value="1170">1170 - Watermael-Boitsfort</option>
                            <option value="1180">1180 - Uccle</option>
                            <option value="1190">1190 - Forest</option>
                            <option value="1200">1200 - Woluwe-Saint-Lambert</option>
                            <option value="1210">1210 - Saint-Josse-ten-Noode</option>
                        </select>
                    </div>

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

                <button className={styles.btn} type="submit">Submit</button>
            </div>

            {/* Divider */}

            <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine} />
            </div>

            <div className={styles.switchPrompt}>
                <p>Already have an account? <NavLink className={styles.switchLink} to="/auth/login">log in</NavLink></p>
            </div>

        </form>
    )
}