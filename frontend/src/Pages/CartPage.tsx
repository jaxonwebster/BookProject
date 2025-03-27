import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            <div className="row">
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.projectId} className="list-group-item d-flex justify-content-between align-items-center">
                                {item.title} - {item.quantity} × ${item.price.toFixed(2)} = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.projectId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>
            <button className="btn btn-success">Checkout</button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate('/projects')}>Continue Browsing</button>
        </div>
    );
}
export default CartPage;