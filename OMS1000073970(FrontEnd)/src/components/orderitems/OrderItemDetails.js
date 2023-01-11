import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Moment from 'moment';

function OrderItemDetails() {

    const navigate = useNavigate();
    const [orderItem, setOrderItem] = useState([]);
    //const [orderItemId, setOrderItemId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [orderStatus, setOrderStatus] = useState("")
    const [item, setItem] = useState([]);
    const [itemName, setItemName] = useState("");
    //const [itemId, setItemId] = useState("");
    const [discount, setDiscount] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const [data, setData] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [order, setOrder] = useState([]);
    const { custId, orderItemId, itemId, orderId } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:64911/api/OrderItems/orderItemId/${orderItemId}/${itemId}/${orderId}`)
            .then(response => {
                console.log(response.data)
            })
        Axios.get(`http://localhost:64911/api/Items/${itemId}`)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
        Axios.get(`http://localhost:64911/api/Orders/${orderId}`)
            .then(response => {
                console.log(response.data)
                setOrder(response.data)
            })
    }, [])


    return (
        <>
            <div class="background">
                <div class="container" style={{ width: "500px" }}>
                    <div class="screen" >
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
                                    <span style={{color:"blue"}}>Status:{order.orderStatus}</span>
                                    
                                    <span>OrderId:{orderId}</span>

                                </div>



                            </div>
                            <div class="screen-body-item">
                                <div class="app-form-group">
                                    <input class="app-form-control" placeholder="Category" value={item.itemCategory} onChange={e => { setItemQuantity(e.target.value) }} />
                                </div>
                                <div class="app-form-group">
                                    <input class="app-form-control" placeholder="Name" value={item.itemName} onChange={e => { setItemName(e.target.value) }} />
                                </div>
                                <div class="app-form-group">
                                    <input class="app-form-control" placeholder="Quantity" value={Moment(order.orderDate).format('DD-MM-YYYY')} />
                                    </div>
                                <div class="app-form-group ">
                                    <span>ItemCost</span>
                                        <input class="app-form-control" placeholder="Cost" value={item.itemCost} onChange={e => { setItemCost(e.target.value) }} />
                                    </div>
                                <div class="app-form-group">
                                    <span>Discount</span>
                                        <input class="app-form-control" placeholder="Discount" value={item.itemDiscount} onChange={e => { setItemDiscount(e.target.value) }} />
                                    </div>
                                   

                                    <div class="app-form-group buttons">

                                    <button class="app-form-button" type="submit" onClick={()=>navigate(-1)} >Back</button>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            
        </>
        )
}
export default OrderItemDetails;