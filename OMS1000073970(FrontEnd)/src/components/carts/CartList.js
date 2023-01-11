import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';


function CartList() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const [cartQuantity, setCartQuantity] = useState("");
    const [cartAmount, setCartAmount] = useState("");
    const [customer, setCustomer] = useState([]);
    const [count, setCount] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [item, setItem] = useState("");
    const { custId } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
        
        Axios.get(`http://localhost:64911/api/Carts/customer/${custId}`)
            .then(response => {
                console.log(response.data)
                setCart(response.data)
                setCount(cart.length)
                setTotalPrice(TotalCartCost)
                console.log(count, totalPrice)
                

            })
    }, [])

    function DeleteItem(cartId) {
        Axios.delete(`http://localhost:64911/api/Carts/${cartId}`)
            .then(response => {
                console.log(response.data)
                alert("Deleted the item from the cart" )
                window.location.href=`/itemsList/${custId}`;
            })

    }
    function TotalCartCost() {
        let price = 0;
        cart.forEach(item => {
            price = price + item.cartAmount;
        })
        return price;
    }

    function Proceed(itemId) {
        
        cart.forEach(val => {
            
            
            Axios.get(`http://localhost:64911/api/Items/${val.itemId}`)
                .then(response => {
                    console.log(response.data)
                    setItem(response.data)
                    let tempData = {itemId: val.itemId, itemCategory: item.itemCategory, unitPrice: item.itemCost, totalPrice: val.cartQuantity * item.itemCost, discount: item.itemDiscount, custId}
                    console.log(tempData)
                    Axios.post(`http://localhost:64911/api/TempItems`, tempData)
                        .then(response => {
                            console.log(response.data)
                            //alert("Successfully added to temp-item table")
                        })
                })
        })
        cart.forEach(val => {
            Axios.delete(`http://localhost:64911/api/Carts/${val.cartId}`)
                .then(response => {
                    console.log(response.data)
                })
        })
        window.location.href=`tempItemList/${custId}`

    }
    
    


    const carts = cart.map((ct, index) => {

        return (
            <tr key={ct.cartId}>
                <td>{ct.cartId}</td>
                <td>{ct.cartAmount}</td>
                <td>{ct.cartQuantity}</td>
                <td>{ct.custId}</td>
                <td>{ct.itemId}</td>
                
                <td><button className="btn btn-primary-warning" onClick={DeleteItem.bind(this, ct.cartId)}>Remove</button></td>
            </tr>
            )
    })
    return (
        <>
            <Home/>
            <table className="table table-striped" style={{ marginTop: "5px" }}>
                <thead style={{ backgroundColor: "blueviolet" }}>
                    <tr>
                        <th>CartId</th>
                        <th>CartAmount</th>
                        <th>CartQuantity</th>
                        <th>CustomerId</th>
                        
                        <th>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{carts}</tbody>
            </table>
            <button className="btn btn-outline-dark" style={{ marginLeft: "900px", marginRight: "5px" }} onClick={() => navigate(`/itemsList/${custId}`)}>Add</button>
            <button className="btn btn-outline-dark" onClick={Proceed}>Proceed</button>

        </>
        )
}

export default CartList;