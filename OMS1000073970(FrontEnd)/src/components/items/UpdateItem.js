import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateItem() {

    const [item, setItem] = useState([]);
    //const [itemId, setItemId] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const { itemId } = useParams()
    console.log(itemId)
    
    

    useEffect(() => {
        
        Axios.get(`http://localhost:64911/api/Items/${itemId}`)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
    }, [])

    function UpdateItems(itemId) {
        const item = { itemId,itemCategory, itemQuantity, itemCost, itemDiscount, itemUrl }
        console.log(item)
        Axios.put(`http://localhost:64911/api/Items/update`, item)
            .then(response => {
                console.log(response.data)
                alert("Successfully updated new item")
            })
    }
    
    return (
        <>
            <div class="background">
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
                                    <span>Update Item</span>

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

                                        <button class="app-form-button" type="submit" onClick={UpdateItems}>Update</button>
                                        <button class="app-form-button" > Cancel</button>
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
export default UpdateItem;