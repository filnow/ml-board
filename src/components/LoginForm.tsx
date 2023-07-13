import React from 'react'
import { useState } from 'react'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        if (username === 'admin' && password === 'admin') {
            alert('Logged in!')
        } else {
            setError('Incorrect username or password!')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </label>
            <button type="submit">Log in</button>
        </form>
    )
}

