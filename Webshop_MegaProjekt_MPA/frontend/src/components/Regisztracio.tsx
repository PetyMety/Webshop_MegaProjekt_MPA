import { useState } from "react";
import Menu from "../Menu";

export default function Regisztracio(){
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const newUser = {
           name: name,
           username: username,
           email: email,
           location: location,
           password: password
        }
        //console.log(newUser);
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            })
            if (!response.ok) {
                const msg = await response.json();
                console.log(msg.message);
                throw new Error(`${msg.message}`);
            }
            setSuccess(true);
            setName('');
            setUsername('');
            setEmail('');
            setLocation('');
            setPassword('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            // ...
        }
    }
    return <>
    <Menu></Menu>
        <div className="container mt-5">
            <h1 className="text-center mb-4">Regisztráció</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        id="cpuCore"
                        className="form-control"
                        value={location}
                        required
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="displaySize"
                        className="form-control"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Processing..." : "Regisztráció"}
                </button>
            </form>
            {success && <div className="alert alert-success mt-3">Sikeresen regisztráció!</div>}
            {error && <div className="alert alert-danger mt-3">Hiba: {error}</div>}
        </div></>
}