import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/login', { email, password })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Signed in");
                    login(response.data.token, response.data.user);
                    navigate("/"); 
                }
            })
            .catch((error) => {
                console.error("Error signing in", error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Sign In</h2>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            required
                            id="email"
                            placeholder='Email'
                            type='text'
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
                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Enter
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to='/signup' className="text-blue-500 hover:underline">
                        Create an Account
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to='/reset' className="text-blue-500 hover:underline">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
