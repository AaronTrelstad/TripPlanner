import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== checkPassword) {
            return setError("Passwords don't match");
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', { username, email, password });
            console.log("Account Created", response.data);
        } catch (error: any) {
            console.error("Error creating account", error.response.data);
            setError(error.response.data);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
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
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            required
                            id="email"
                            placeholder='Email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            required
                            id="password"
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="checkPassword" className="block text-gray-700">Confirm Password</label>
                        <input 
                            required
                            id="checkPassword"
                            placeholder='Password'
                            type='password'
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to='/login' className="text-blue-500 hover:underline">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
