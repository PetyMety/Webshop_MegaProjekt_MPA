import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { useAuth } from "../context/Contexts";

export default function Login(){
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const navigate = useNavigate();
    
    const { success, setSuccess, setUser } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const newUser = {
           username: username,
           email: email,
           password: password
        }
        try {
            const response = await fetch('http://localhost:3000/users/login', {
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
            const msg = await response.json();
             setUser({
                id: msg.userId,
                username: newUser.username,
                email: newUser.email
            });
            navigate("/kezdolap")
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            // ...
        }
    }
    return (
      <>
          <Menu />
          <div className="container mt-5">
              <h1 className="text-center mb-4">Bejelentkezés</h1>
              <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
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
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                          type="password"
                          id="password"
                          className="form-control"
                          value={password}
                          required
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? "Processing..." : "Bejelentkezés"}
                  </button>
              </form>
              {success && <div className="alert alert-success mt-3">Sikeres bejelentkezés!</div>}
              {error && <div className="alert alert-danger mt-3">Hiba: {error}</div>}
          </div>
      </>
  );
  
}