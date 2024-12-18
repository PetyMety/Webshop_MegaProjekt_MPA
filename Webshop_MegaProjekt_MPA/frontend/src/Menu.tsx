import { Link } from "react-router-dom";
import { useAuth } from "./context/Contexts"; 


export default function Menu(){

    const {success} = useAuth();


return <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Menü</span>
                    <div className="navbar-nav">
                    <Link to="/kezdolap" className="nav-link">Kezdőlap</Link>{!success ? (<><Link to="/login" className="nav-link">Bejelentkezés</Link>
                    <Link to="/registation" className="nav-link">Regisztráció</Link></>
                    ) : (
                    <><Link to="/cart" className="nav-link">Kosár</Link>
                        <Link to="/profile" className="nav-link">Profil</Link>
                        <a href="/kezdolap" className="nav-link">Kijelentkezés</a></>)}
                    </div>
        </nav>}