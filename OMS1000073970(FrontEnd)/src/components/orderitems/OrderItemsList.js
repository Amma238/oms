import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';

function OrderItemsList() {

    const navigate = useNavigate();
    const [orderItem, setOrderItem] = useState([]);
    const [orderItemId, setOrderItemId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [orderStatus, setOrderStatus] = useState("")
    const [item, setItem] = useState([]);
    const [itemId, setItemId] = useState("");
    //const [itemId, setItemId] = useState("");
    const [discount, setDiscount] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const [data, setData] = useState([]);
    const { custId, orderId } = useParams();
    //const [item, setItem] = useState([]);
    //console.log(orderId)
    useEffect(() => {
        Axios.get(`http://localhost:64911/api/OrderItems/orderId/${orderId}`)
            .then(response => {
                console.log(response.data)
                setOrderItem(response.data)
                setItemId(response.data.itemId)
                //console.log(itemId)
                
                
               
            })
       
        
    }, [])

   

    

    const orderItems = orderItem.map((orditem, index) => {
        return (
            <tr key={orditem.orderItemId} >
                
                <td>{orditem.orderId}</td>
                <td>{orditem.orderStatus}</td>
                <td>{orditem.quantity}</td>
                <td>{orditem.unitPrice}</td>
                <td>{orditem.totalPrice}</td>
                <td>{orditem.discount}</td>
                <td ><button className="btn btn-outline-dark" onClick={() => navigate(`/orderItemDetails/${custId}/${orditem.orderItemId}/${orditem.itemId}/${orderId}`)}>Details</button></td>
                
            </ tr >
            
            )
    })
    return (
        <>
            <Home />
            <table className="table table-striped" >
                <thead style={{ backgroundColor: "lavender" }}>
                    <tr>
                        
                        
                        <td>OrderId</td>
                        <td>OrderStatus</td>
                        <td>Quantity</td>
                        <td>UnitPrice</td>
                        <td>TotalPrice</td>
                        <td>Discount</td>
                        <td>Actions</td>
                       

                    </tr>
                </thead>
                <tbody>{orderItems}</tbody>
                
               

                
            </table>
            <button class="btn btn-outline-dark" onClick={() => navigate(-1)} style={{marginLeft:"1000px"}}>Back</button>
           
        </>
        )
}

export default OrderItemsList;