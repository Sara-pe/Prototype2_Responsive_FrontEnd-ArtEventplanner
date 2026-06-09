import styles from '../Agenda.module.css'
import { useId } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';

import eventService from '../../../service/event.service'

export const AgendaAddEvent = () => {

    const id = useId();
    const navigate = useNavigate();

    const { state } = useLocation()
    const event = state?.event

    console.log(event)

    const handleAddSubmit = async (formData) => {
        const data = Object.fromEntries(formData.entries());
        await eventService.create(data);
        navigate('/agenda');
    }


    console.log(event.translations?.en?.longdescr)
    console.log(event.translations?.en?.shortdescr)
    console.log(event.translations?.en?.shortdescr)


    return (

        <div className={styles.page}>
            <div className={styles.container}>

                {/* Header */}

                <div className={styles.headerForm}>
                    <div className={styles.title}>

                  
                      <h4 className={styles.promptEvent}>Pick your date and time for</h4>
                       <h3 className={styles.nameEvent}>{event?.translations?.en?.name}</h3> 
                       
                        <NavLink to="/agenda"> <img className={styles.prevArrow} src="/icons/prev.png" alt="Previous" /> </NavLink>
                    </div>
                </div>

                <form className={styles.form} action={handleAddSubmit}>
                    <div className={styles.btnFields}>
                        <div className={styles.fields}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'name'}>Event's name</label>
                                <input id={id + 'name'} type="text" name="name" className={styles.input} defaultValue={event?.translations?.en?.name} required />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'type'}>Type</label>

                                <select id={id + 'type'} name="type" className={styles.select} required

                                    defaultValue={
                                        [58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 119].includes(event?.categories?.main?.id) ? 'Cinema' :
                                            [49, 50, 51, 52, 53, 54, 55, 56, 120].includes(event?.categories?.main?.id) ? 'Theatre' :
                                                [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48].includes(event?.categories?.main?.id) ? 'Expo' :
                                                    [15, 16, 17, 18, 19, 122, 147, 148, 149, 152, 153].includes(event?.categories?.main?.id) ? 'Dance' :
                                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 118, 121, 123, 124, 125, 126, 127].includes(event?.categories?.main?.id) ? 'Concert' :
                                                            [72, 86, 184].includes(event?.categories?.main?.id) ? 'Talk' :
                                                                [73, 169, 170, 171].includes(event?.categories?.main?.id) ? 'Workshop' :
                                                                    'Other'
                                    }
                                >
                                    <option value="Expo">Expo</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Theatre">Theatre</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Talk">Talk</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Cinema">Cinema</option>
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'where'}>Where?</label>
                                <input id={id + 'where'} type="text" name='at' className={styles.input} defaultValue={event?.place?.translations?.en?.name} required />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'date'}>Date</label>

                                {(event?.date_end === event?.date_start) ? <input id={id + 'date'} type="date" name='date' className={styles.input} defaultValue={event?.date_start} required /> :
                                    <> <input id={id + 'date'} type="date" name='date' className={styles.input} required />
                                        <p className={styles.remark}>
                                            This event is ongoing from {new Date(event?.date_start).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit'
                                            })} to {new Date(event?.date_end).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit'
                                            })}
                                        </p>

                                    </>}

                            </div>
                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'time'}>What time?</label>
                                <input id={id + 'time'} type="text" name='hour' className={styles.input} required />

                            </div>
                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'city'}>City</label>
                                <input id={id + 'city'} type="text" name='city' className={styles.input} defaultValue='Brussels' required />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor={id + 'address'}>Address</label>
                                <input id={id + 'address'} type="text" name='address' className={styles.input} defaultValue={event?.place?.translations?.en?.address_line1} required />
                            </div>
                            <div className={styles.sourceRow}>

                                <p>More details on </p>
                                <a className={styles.linkVB} href={event?.translations?.en?.agenda_url} target="_blank" rel="noopener noreferrer">
                                    visit.brussels <img className={styles.imgLinkVB} src="/icons/link.png" alt="Link to visit.brussles" />
                                </a>


                            </div>
                        </div>

                        <button className={styles.btn} type="submit">Add Event</button>
                    </div>



                </form>

            </div >
        </div >
    )

}

//*! ------------------ input fields need to be filled to submit!!! ---------