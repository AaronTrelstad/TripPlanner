import axios from 'axios'
import { useState, useEffect } from 'react'

interface Message {
    id: number
    author: string
    recipient: string
    content: string
    date: Date
}

const Messages = () => {
    const [thread, setThread] = useState<Message[]>([])

    useEffect(() => {
        fetchMessages()
    })

    const fetchMessages = () => {
        axios.get('https://localhost:3000/api/getmessages')
            .then((response) => {
                setThread(response.data)
            })
    }

    return (
        <>
        </>
    )
}

export default Messages
