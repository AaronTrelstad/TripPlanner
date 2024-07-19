import { useState, useEffect } from 'react'
import axios from 'axios'

const Trending = () => {
    const [topLocations, setTopLocations] = useState<string[]>([])
    const [locationError, setLocationError] = useState<boolean>(false)
    const [topEvents, setTopEvents] = useState<string[]>([])
    const [eventError, setEventError] = useState<boolean>(false)

    useEffect(() => {
        axios.get('http://localhost:3000/api/gettoplocations')
            .then((response) => {
                setTopLocations(response.data);
            })
            .catch((error) => {
                setLocationError(true)
                console.error("Error fetching top locations", error)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/api/getevents')
            .then((response) => {
                setTopEvents(response.data);
            })
            .catch((error) => {
                setEventError(true)
                console.error("Error fetching top locations", error)
            })
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Top Locations</h1>
                    {locationError ? (
                        <div className="text-red-500">
                            <p>Error fetching locations</p>
                        </div>
                    ) : (
                        <ul className="list-disc list-inside">
                            {topLocations.map((location, index) => (
                                <li key={index} className="mb-2">{location}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Top Events</h1>
                    {eventError ? (
                        <div className="text-red-500">
                            <p>Error fetching events</p>
                        </div>
                    ) : (
                        <ul className="list-disc list-inside">
                            {topEvents.map((event, index) => (
                                <li key={index} className="mb-2">{event}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Trending
