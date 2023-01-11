import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';


function AddItem() {

    const [item, setItem] = useState([]);
    const [itemId, setItemId] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const [itemName, setItemName] = useState("");
    const { custId } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Items`)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
    }, [])

    function AddItems() {
        if (custId != 1) {
            alert("You are not the admin can't add an item")
        }
        else {
            const item = { itemCategory, itemQuantity, itemCost, itemDiscount, itemUrl,itemName }
            console.log(item)
            Axios.post(`http://localhost:64911/api/Items/add`, item)
                .then(response => {
                    console.log(response.data)
                    alert("Successfully added new item")
                    window.location.href=`/adminItemList/${custId}`
                })
        }
    }
    function Cancel() {
        alert("Sorry we can't add this item")
        window.location.href=`/adminItemList/${custId}`
    }
    return (
        <>
            <Admin/>
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
                                    <span>Add Item</span>
                                    
                                </div>



                            </div>
                            <div class="screen-body-item">
                                <div class="app-form">
                                    <div class="app-form-group">
                                        <select class="app-form-control" name="category" onChange={e => { setItemCategory(e.target.value) }}>
                                            <option value="Select a Category">Select a Category</option>
                                            <option value="Veg">Veg</option>
                                            <option value="Non-Veg">Non-Veg</option>
                                            <option value="Soups">Soups</option>
                                            <option value="Starters">Starters</option>
                                        </select>
                                       
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Name" value={itemName} onChange={e => { setItemName(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Quantity" value={itemQuantity} onChange={e => { setItemQuantity(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Cost" value={itemCost} onChange={e => { setItemCost(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Discount" value={itemDiscount} onChange={e => { setItemDiscount(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Url" value={itemUrl} onChange={e => { setItemUrl(e.target.value) }} />
                                    </div>
                                    
                                    <div class="app-form-group buttons">

                                        <button class="app-form-button" type="submit" onClick={AddItems}>Add</button>
                                        <button class="app-form-button" onClick={Cancel}> Cancel</button>
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
export default AddItem;