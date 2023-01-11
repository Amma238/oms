import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';
import emailjs from '@emailjs/browser';
import { paramCase } from 'param-case';
function TempItemsList() {

    const navigate = useNavigate();
    const [it, setItem] = useState("");
    const [itemId, setItemId] = useState("");
    
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const [tempItems, setTempItems] = useState([]);
    const [tempItemId, setTempItemId] = useState("");
    //const [itemId, setItemId] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [discount, setDiscount] = useState("");
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
    const [order, setOrder] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");
    const [orderCost, setOrderCost] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [orderTotal, setOrderTotal] = useState("");
    const [price, setPrice] = useState("");
    const [count, setCount] = useState("");
    const [orderTotalQuantity, setOrderTotalQuantity] = useState("");
    const [data, setData] = useState("");
    const {custId} = useParams();

    useEffect(() => {
       Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
                setCustEmail(response.data.custEmail)
                setCustName(response.data.custName)
            })
        Axios.get(`http://localhost:64911/api/TempItems/customer/${custId}`)
            .then(response => {
                console.log(response.data)
                setTempItems(response.data)
            })
        setPrice(TotalPrice());
        setCount(tempItems.length)
        setOrderTotalQuantity(TotalQuantity())
      
    }, [])



    function TotalPrice() {
        let price = 0
        tempItems.forEach(item => {
            price = (price + item.totalPrice)
        })
        return price;
        
    }
    function TotalQuantity() {
        let totalQuantity = 0
        tempItems.forEach(item => {
            totalQuantity = (totalQuantity + (item.totalPrice/item.unitPrice))
        })
        
        return parseInt(totalQuantity)
    }

    function RemoveItem(tempItemId) {
        Axios.delete(`http://localhost:64911/api/TempItems/${tempItemId}`)
            .then(response => {
                console.log(response.data)
                alert("successfully deleted the item")
                window.location.reload();
            })
    }

    
    function SendEmail() {
        var params = {
            custEmail:custEmail,
            orderStatus: 'Placed',
            custName: custName,
            
        };
        console.log(params)
        
        emailjs.send('service_2zbhhfo', 'template_bjnxp56', params,'Gnz7fS8dOFvOiC63U')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    

    function PlaceOrder() {
        
        SendEmail()
        if (tempItems.length == 0) {
            alert("Can't place order.... No items to buy...")
        }
        else {
            if (customer.custBalance < TotalPrice()) {
                alert("Insufficient Wallet Balance ")
                window.location.reload();
                

            }
            else {
            let newPrice = customer.custBalance - TotalPrice();
            console.log(newPrice)
            const custData = { custId, custName:customer.custName, custEmail: customer.custEmail, custPass: customer.custPass, custPhone: customer.custPhone, custAltPhone: customer.custAltPhone, custBalance: newPrice, custCity: customer.custCity, custState: customer.custState, custAddress: customer.custAddress }
            console.log("CustData", custData)
            
            Axios.put(`http://localhost:64911/api/Customers/update/${custId}`,custData)
                .then(response => {
                    alert("Updated Customer Wallet Balance")
                    console.log(response.data)
                })

            alert("Place Order")
            let orderStatus = 'Placed';
            let orderTotal = tempItems.length;
            let orderCost = TotalPrice();
            let orderQuantity = TotalQuantity();
            let orderDate = new Date().toJSON();
            let orderItems = tempItems;


            let orderData = { orderStatus, orderQuantity, orderCost, orderDate, orderTotal, custId }
            console.log(orderData)
            tempItems.forEach(item => {
                let itemId = item.itemId;
                Axios.get(`http://localhost:64911/api/Items/${itemId}`)
                    .then(response => {
                        //console.log(response.data)
                        //setItem(response.data)
                        let newquantity = response.data.itemQuantity - (item.totalPrice / item.unitPrice)
                        //alert(newquantity)
                        let itemData = { itemId: response.data.itemId, itemQuantity: newquantity, itemDiscount: response.data.itemDiscount, itemCategory: response.data.itemCategory, itemCost: response.data.itemCost, itemUrl: response.data.itemUrl }
                        //console.log(itemData)
                        Axios.put(`http://localhost:64911/api/Items/update/${itemId}`, itemData)
                            .then(response => {
                                console.log(response.data)
                                //alert("Updated Item quantity")
                            })
                    })
            })


            Axios.post(`http://localhost:64911/api/Orders/add`, orderData)
                .then(response => {
                    console.log("inserted order", +response.data.orderId)
                    let oId = response.data.orderId;
                    if (oId != 0) {
                        tempItems && (tempItems).forEach(item => {
                            let orderId = oId;
                            let itemId = item.itemId
                            let discount = item.discount;
                            let quantity = item.totalPrice / item.unitPrice;
                            let unitPrice = item.unitPrice;
                            let totalPrice = item.totalPrice;
                            let orderStatus = 'Placed';
                            let data = { orderId, itemId, discount, quantity, unitPrice, totalPrice, orderStatus }
                            console.log(data)
                            Axios.post(`http://localhost:64911/api/OrderItems/add`, data)
                                .then(response => {
                                    console.log(response.data)
                                    //alert("Added the orderItem ")
                                })
                        });
                        alert("Added all the orderItems")
                        tempItems.forEach(item => {
                            Axios.delete(`http://localhost:64911/api/TempItems/${item.tempItemId}`)
                                .then(response => {
                                    console.log(response.data)
                                })
                        })
                        alert("Deleted templist")
                        window.location.reload();
                        window.location.href = `/customerOrderList/${custId}`
                    }
                })
                }



        } 
        
    }


    const tempItem = tempItems.map((it, index) => {
        return (
            <tr key={it.tempItemId}>
                
                <td>{it.itemId}</td>
                <td>{it.itemCategory}</td>
                <td>{it.totalPrice / it.unitPrice}</td>
                <td>{it.unitPrice}</td>
                <td>{it.totalPrice  }</td>
                <td>{it.discount}</td>
                <td>{customer.custName}</td>
                <td>
                <button className="btn btn-outline-dark" onClick={RemoveItem.bind(this, it.tempItemId)}>Remove</button></td>
                
            </tr>
        )
    })
   


    return (
        <>
            <Home />
            <h4 style={{ color: "red" }}>Your OrderTotal is :{TotalPrice()} and You have a OrderQuantity of:{TotalQuantity()}</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        
                        <th>ItemId</th>
                        <th>ItemCategory</th>
                        <th>Quantity</th>
                        <th>UnitPrice</th>
                        <th>TotalPrice</th>
                        <th>Discount</th>
                        <th>CustomerName</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{tempItem}</tbody>
                
            </table>
            <td>
                <button type="submit" className="btn btn-outline-dark" style={{ marginLeft: "950px", marginRight: "5px" }} onClick={() => navigate(`/itemsList/${custId}`)}>AddMore</button>
                <button type="submit" className="btn btn-outline-dark" style={{ marginRight: "5px" }} onClick={PlaceOrder}>PlaceOrder</button>
            </td>

        </>
        )
}

export default TempItemsList;