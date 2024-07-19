import axios from 'axios'
import { useState, useEffect } from 'react'

interface Post {
    title: string
    author: string
    content: string
    comments: string[]
}

const PostComponent = ({ post }: { post: Post }) => (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <h3 className="text-lg text-gray-600 mb-2">{post.author}</h3>
        <p className="mb-2">{post.content}</p>
        <p className="text-sm text-gray-500">Comments: {post.comments.length}</p>
    </div>
)

const Discussions = () => {
    const [thread, setThread] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [newPost, setNewPost] = useState<Post>({ title:'', author:'Username', content:'', comments:[]})

    const fetchDiscussions = () => {
        axios.get('http://localhost:3000/api/getdiscussions')
        .then((response) => {
            setThread(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchDiscussions();
    }, [])

    const handleNewPost = (e: React.FormEvent) => {
        e.preventDefault()

        axios.post('https://localhost:3000/api/publishdiscussion', newPost)
            .then(() => {
                fetchDiscussions();
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewPost(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Discussions</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : thread.length > 0 ? (
                    thread.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))
                ) : (
                    <p>No discussions available</p>
                )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add a new discussion</h2>
                <form onSubmit={handleNewPost} className="space-y-4">
                    <input 
                        type='text'
                        name='title'
                        value={newPost.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    
                    <textarea 
                        name='content'
                        value={newPost.content}
                        onChange={handleChange}
                        placeholder="Content"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Discussions
