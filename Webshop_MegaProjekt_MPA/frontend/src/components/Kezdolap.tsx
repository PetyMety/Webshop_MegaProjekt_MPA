import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Menu from "../Menu";
import { useAuth } from "../context/Contexts"; 
import { useCart } from "../context/CartContext.tsx";

interface Product {
    id: number,
    name: string,
    imageUrl: string,
    material: string,
    description: string,
    price: number, 
}

export default function Kezdolap(){
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {success} = useAuth();
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
                console.log(data); 
            })
            .catch((error) => { 
                //console.log(error.message) 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <Menu></Menu>
        <h1>Termekek</h1>
        <div className="row">
        {products.map((product) =>(
            
                <div className="col-sm-3">
                <div className="card" >
                <img className="card-img-top" width={250} height={250}  src={product.imageUrl} alt={product.name}></img>
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{product.material}</li>
                    <li className="list-group-item">{product.description}</li>
                    <li className="list-group-item"><h6>{product.price} Ft</h6></li>    
                </ul>
                {success && (
                <div className="card-body">
                    <button
                                className="btn btn-primary"
                                onClick={() => addToCart(product)}>Kosárba</button>
                </div>)}
                </div>
                </div>))}
                </div>
                </>
}