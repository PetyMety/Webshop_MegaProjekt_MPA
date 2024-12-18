import { useState } from "react";
import { useAuth } from "../context/Contexts";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

export default function Profile() {
  const { success, user, setUser } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!success) {
    navigate("/login"); // Visszavisz a kezdolapra ha nem vagyunk bejelentkezve
  }
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek.");
      return;
    }
    if (!validatePassword(password)) {
      setError("A jelszónak legalább 6 karakterből kell állnia, kisbetűt, nagybetűt és számot is tartalmaznia kell.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/users/${user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Hiba a jelszó módosítása során!");

      setMessage("Jelszó sikeresen módosítva!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <><Menu/>
    <div className="container mt-5">
      <h1 className="mb-4">Profil</h1>
      <form className="bg-light p-4 rounded shadow" onSubmit={handlePasswordChange}>
        {/* Username edit */}
        <div className="mb-3">
          <label className="form-label">Felhasználónév</label>
          <input type="text" className="form-control" value={user?.username} readOnly />
        </div>
        {/* Password edit */}
        <div className="mb-3">
          <label className="form-label">Új jelszó</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó megerősítése</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Jelszó módosítása
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
    </>
  );
}