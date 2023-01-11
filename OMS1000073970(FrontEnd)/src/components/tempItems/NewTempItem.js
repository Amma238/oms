import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mushroom from '../../images/MushroomBiryani.jfif';

function NewTempItem() {
    const navigate = useNavigate();
    const [orderItemId, setOrderItemId] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [orderStatus, setOrderStatus] = useState("")
    const [item, setItem] = useState([]);
    //const [itemId, setItemId] = useState("");
    const [discount, setDiscount] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const [tempItems, setTempItems] = useState([]);
    const [tempItemId, setTempItemId] = useState("");
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
                setUnitPrice(response.data.itemCost)
                setDiscount(response.data.itemDiscount)
                

            })
    }, [])

    function AddTempItem() {
        if (quantity == '') {
            alert("Please enter the required quantity")
        }
        else {

            const tempItem = { itemCategory: item.itemCategory, unitPrice, totalprice: unitPrice * quantity, discount, custId: custId, itemId }
            console.log(tempItem)
            Axios.post(`http://localhost:64911/api/TempItems`, tempItem)
                .then(response => {
                    console.log(response.data)
                    alert("Successfully added")
                    window.location.href = `/tempItemList/${custId}`
                })

            
        }
    }
    return (
        <>
           
            <div class="background" style={{ width: "65%", marginLeft: "200px", height: "500px" }}>
                <div class="container" >
                    <div class="screen"  >
                       
                        <div class="app-form-group" >
                            <span style={{ fontWeight: "bold", fontSize: "20px", color: "red" }}>Discount Price:{discount}<span>&#37;</span></span>

                        </div>
                        <div class="screen-body" >
                            <div class="screen-body-item left">
                                <div class="app-title">
                                    <span>Buy Item</span>
                                    <span><img src={item.itemUrl} style={{width:"200px"}}/></span>

                                </div>

                            </div>

                            <div class="screen-body-item" >
                                <div class="app-form" style={{ marginTop: "-20px" }}>

                                    <div class="app-form-group">

                                        <input class="app-form-control" placeholder="ItemId" style={{ textAlign: "center" }} value={item.itemId} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Category" style={{ textAlign: "center" }} value={item.itemCategory} onChange={e => { setItemCategory(e.target.value) }} />
                                    </div>
                                    

                                    <div class="app-form-group">
                                        <span>Available Quantity</span>
                                        <input class="app-form-control" placeholder="Quantity" style={{ textAlign: "center" }} value={item.itemQuantity} onChange={e => { setItemQuantity(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <span>UnitPrice</span>
                                        <input class="app-form-control" placeholder="UnitPrice" style={{ textAlign: "center" }} value={unitPrice} onChange={e => { setUnitPrice(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <span>Enter Quantity</span>
                                        <input class="app-form-control" id="quantity" value={quantity} style={{ textAlign: "center" }} onChange={e => { setQuantity(e.target.value) }}  />
                                    </div>
                                    <div class="app-form-group">
                                        <span>Total Price</span>
                                        <input class="app-form-control" placeholder="Total Price" style={{ textAlign: "center" }} value={quantity * unitPrice} onChange={e => { setTotalPrice(e.target.value) }} />
                                    </div>



                                    <div class="app-form-group buttons">

                                            <button class="app-form-button" type="submit" onClick={AddTempItem} > Add</button>
                                        <button class="app-form-button" onClick={()=>navigate(`/itemsList/${custId}`)}> Cancel</button>
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
export default NewTempItem;