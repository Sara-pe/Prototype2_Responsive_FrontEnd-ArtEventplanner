import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { RecCard } from './RecCard'

import { getDefaultStore } from 'jotai'
import { saveAtom } from '../../../atoms/token.atom'

export const Rec4 = () => {

    const token = getDefaultStore().get(saveAtom)

    //Extract the neighborhood from the token
    const payload = JSON.parse(atob(token.split('.')[1]))
    const userNeighborhood = payload.neighborhood

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const neighborhoodCoordinates = {
        "1000": { lat: 50.8503, lon: 4.3517 },
        "1020": { lat: 50.8729, lon: 4.3458 },
        "1030": { lat: 50.8676, lon: 4.3792 },
        "1040": { lat: 50.8389, lon: 4.3876 },
        "1050": { lat: 50.8275, lon: 4.3659 },
        "1060": { lat: 50.8328, lon: 4.3458 },
        "1070": { lat: 50.8403, lon: 4.3072 },
        "1080": { lat: 50.8564, lon: 4.3264 },
        "1081": { lat: 50.8656, lon: 4.3264 },
        "1082": { lat: 50.8742, lon: 4.3097 },
        "1083": { lat: 50.8789, lon: 4.3208 },
        "1090": { lat: 50.8828, lon: 4.3347 },
        "1120": { lat: 50.8897, lon: 4.3736 },
        "1130": { lat: 50.8950, lon: 4.4042 },
        "1140": { lat: 50.8742, lon: 4.4042 },
        "1150": { lat: 50.8231, lon: 4.4264 },
        "1160": { lat: 50.8067, lon: 4.4264 },
        "1170": { lat: 50.7986, lon: 4.4097 },
        "1180": { lat: 50.8014, lon: 4.3347 },
        "1190": { lat: 50.8122, lon: 4.3208 },
        "1200": { lat: 50.8456, lon: 4.4208 },
        "1210": { lat: 50.8564, lon: 4.3653 },
    }

    const coords = userNeighborhood ? neighborhoodCoordinates[userNeighborhood] : null


    useEffect(() => {

        if (!coords) return

        const fetchDataApi = async () => {

            try {
                const eventsNear = await axios.get('https://api.brussels:443/api/agenda/0.0.1/events/location', {

                    params: {
                        lat: coords.lat,
                        lon: coords.lon,
                        dist: 3000
                    },

                    headers:
                    {
                        Authorization: 'Bearer c5442c25-bdd2-3434-9385-9101b673cc53',
                        Accept: 'application/json'
                    }
                })

console.log('events near you:', eventsNear.data.response.results.event)
                setLoading(false)
                setData(eventsNear.data.response.results.event)

            } catch (err) {
                setError(true)
                setLoading(false)
            }

        }

        fetchDataApi()


    }, [])

    if (!userNeighborhood) return null

    return (
        <div className={styles.containerRec}>
                    <h2>Near you</h2>
                    <div className={styles.carrousel}>
                        <div className={styles.eventList}>
                        {data.map((event, index) => (<RecCard key={index} event={event} index={index} />))}
                        </div>
                    </div>
                </div>
    )
}
