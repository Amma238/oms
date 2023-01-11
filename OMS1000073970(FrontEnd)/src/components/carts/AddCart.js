import Axios from 'axios';
import React, {useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import Home from '../Home';

function AddCart() {

    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const [cartQuantity, setCartQuantity] = useState("");
    const [cartAmount, setCartAmount] = useState("");
    const [customer, setCustomer] = useState([]);
    const [item, setItem] = useState("");
    const { custId, itemId } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
        Axios.get(`http://localhost:64911/api/Items/${itemId}`)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
    }, [])

    function AddToCart() {
        const cartData = { cartAmount: cartQuantity * item.itemCost, cartQuantity, itemId, custId }
        console.log(cartData)
        Axios.post(`http://localhost:64911/api/Carts`, cartData)
            .then(response => {
                console.log(response.data)
                alert("Added to cart")
                
                
            })
        window.location.href = `/cartList/${custId}`;
    }

    return (
        <>
            <Home/>
            <div class="background" style={{marginTop:"-30px"}}>
                <div class="container">
                    <div class="screen">
                        <div class="screen-header">
                            <div class="screen-header-left">
                                <div class="screen-header-button close"></div>
                                <div class="screen-header-button maximize"></div>
                                <div class="screen-header-button minimize"></div>
                            </div>
                            <div class="screen-header-right">
                                <div class="screen-header-ellipsis"></div>
                                <div class="screen-header-ellipsis"></div>
                                <div class="screen-header-ellipsis"></div>
                            </div>
                        </div>
                        <div class="screen-body">
                            <div class="screen-body-item left">
                                <div class="app-title">
                                    <span>Add Item</span>

                                </div>



                            </div>
                            <div class="screen-body-item">
                                <div class="app-form">
                                    
                                    <div class="app-form-group">
                                        <span>Enter the  quantity</span>
                                        <input class="app-form-control" placeholder="Quantity" value={cartQuantity} onChange={e => { setCartQuantity(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Cost" value={cartQuantity*item.itemCost} onChange={e => { setCartAmount(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="itemUrl" value={item.itemUrl} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="itemCategory" value={item.itemCategory}  />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="customerName" value={customer.custName}  />
                                    </div>

                                    <div class="app-form-group buttons">

                                        <button class="app-form-button" type="submit" onClick={AddToCart}>Add</button>
                                        <button class="app-form-button" > Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
    </>
    )
}
export default AddCart;