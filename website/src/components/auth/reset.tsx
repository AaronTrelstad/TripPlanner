import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Reset = () => {
    const [username, setUsername] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        axios.post('http://localhost:3000/api/resetpassword', {username, oldPassword, newPassword})
            .then((response) => {
                if (response) {
                    console.log("Password reset successful")
                    setSuccess("Password reset successful")
                    setError(null)
                }
            })
            .catch((error) => {
                console.error("Error resetting password", error)
                setError("Error resetting password")
                setSuccess(null)
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Email</label>
                        <input 
                            required
                            id="username"
                            placeholder='Username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="oldPassword" className="block text-gray-700">Old Password</label>
                        <input 
                            required
                            id="oldPassword"
                            placeholder='Password'
                            type='password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                        <input 
                            required
                            id="newPassword"
                            placeholder='Password'
                            type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Enter
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to='/login' className="text-blue-500 hover:underline">
                        Already have an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Reset
