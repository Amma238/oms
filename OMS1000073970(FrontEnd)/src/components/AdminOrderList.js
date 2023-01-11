import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Moment from 'moment';

import Admin from './Admin';

function AdminOrderList() {

    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");
    const [orderCost, setOrderCost] = useState("");
    const [orderDate, setOrderDate] = useState("");
    //const [custId, setCustId] = useState("");
    const [customer, setCustomer] = useState([]);
    //const [custId, setCustId] = useState("");
    const [custName, setCustName] = useState("");
    const [custPass, setCustPass] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custPhone, setCustPhone] = useState("");
    const [custAltPhone, setCustAltPhone] = useState("");
    const [custCity, setCustCity] = useState("");
    const [custState, setCustState] = useState("");
    const [custAddress, setCustAddress] = useState("");
    const [custBalance, setCustBalance] = useState("");
    const { custId } = useParams();


    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Orders`)
            .then(response => {
                console.log(response.data)
                setOrder(response.data)
            })

        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
    }, [])

    const orders = order.map((ord, index) => {
        return (
            <tr key={ord.orderId}>
                <td>{ord.orderId}</td>
                <td>{ord.orderStatus}</td>
                <td>{ord.orderQuantity}</td>
                <td>{ord.orderCost}</td>
                <td>{Moment(ord.orderDate).format("DD-MM-YYYY")}</td>
                <td>{ord.orderTotal}</td>
                <td><a href={`/customerDetails/${custId}/${ord.custId}`} style={{ color: "black" }}>{ord.custId}</a></td>
                <td>
                    <button className="btn btn-outline-dark" onClick={() => navigate(`/orderItemList/${custId}/${ord.orderId}`)}>View Details</button>
                    
                </td>
            </tr>
        )
    })

    return (
        <>
            <Admin />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>OrderStatus</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>OrderTotal</th>
                        <th>CustomerId</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{orders}</tbody>

            </table>
        </>
    )
}

export default AdminOrderList;