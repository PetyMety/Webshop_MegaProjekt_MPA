import { useCart } from "../context/CartContext.tsx";
import Menu from "../Menu";

export default function Cart() {
  const { productItmes, removeFromCart, clearCart } = useCart();

  return (<>
  <Menu/>
    <div className="container mt-5">
      <h1>Kosár</h1>
      {productItmes.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {productItmes.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {item.name} - {item.price} Ft
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eltávolítás
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning" onClick={clearCart}>
            Kosár ürítése
          </button>
        </>
      )}
    </div>
    </>
  );
}