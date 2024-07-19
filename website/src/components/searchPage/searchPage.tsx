import { useState } from 'react'
import axios from 'axios'

interface SearchResult {
    address: string
    cost: string
}

const SearchPage = () => {
    const [city, setCity] = useState<string>("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        try {
            const response = await axios.get(`https://localhost:8080/api/getlocations?city=${city}`)
            setResults(response.data)
        } catch (error) {
            setError(true)
            console.error("Error fetching search results", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Locations</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Search
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error fetching search results.</p>}
            {!loading && !error && results.length > 0 && (
                <ul className="list-disc list-inside">
                    {results.map((result, index) => (
                        <li key={index} className="mb-2">
                            <p><strong>Address:</strong> {result.address}</p>
                            <p><strong>Cost:</strong> {result.cost}</p>
                        </li>
                    ))}
                </ul>
            )}
            {!loading && !error && results.length === 0 && (
                <p>No results found for {city}</p>
            )}
        </div>
    )
}

export default SearchPage
