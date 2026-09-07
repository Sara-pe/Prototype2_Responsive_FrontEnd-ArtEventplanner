import styles from '../AddEvent.module.css'
import { useId, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

import eventService from '../../../service/event.service'

const presetEvent = {
    name: "Parcels",
    type: "Concert",
    at: "Ancient Belgique",
    date: "2026-10-15",
    hour: "19:00",
    city: "Brussels",
    address: "Boulevard Anspach 110",
};

export const AddEventForm = ({ onSuccess }) => {

    const id = useId();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleAddSubmit = async (formData) => {
        const data = Object.fromEntries(formData.entries());
        await eventService.create(data);
        if (onSuccess) {
            onSuccess();
        } else {
            navigate('/');
        }
    }

    const handleAutofill = () => {
        const form = formRef.current;
        if (!form) return;
        Object.entries(presetEvent).forEach(([name, value]) => {
            if (form.elements[name]) {
                form.elements[name].value = value;
            }
        });
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                handleAutofill();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);


    return (
        <form ref={formRef} className={styles.form} action={handleAddSubmit}>
            <div className={styles.btnFields}>
                <div className={styles.fields}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'name'}>Event's name</label>
                        <input id={id + 'name'} type="text" name="name" className={styles.input} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'type'}>Type</label>

                        <select id={id + 'type'} name="type" className={styles.select} required >
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
                        <input id={id + 'where'} type="text" name='at' className={styles.input} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'date'}>Date</label>
                        <input id={id + 'date'} type="date" name='date' className={styles.input} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'time'}>What time?</label>
                        <input id={id + 'time'} type="text" name='hour' className={styles.input} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'city'}>City</label>
                        <input id={id + 'city'} type="text" name='city' className={styles.input} required />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor={id + 'address'}>Address</label>
                        <input id={id + 'address'} type="text" name='address' className={styles.input} required />
                    </div>
                </div>

                <button className={styles.btn} type="submit">Add Event</button>
            </div>

        </form>
    )

}