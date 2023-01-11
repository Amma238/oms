import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Mushroom from '../../images/MushroomBiryani.jfif';
function ItemListByCategory() {

    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [itemId, setItemId] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemDiscount, setItemDiscount] = useState("")
    const [itemUrl, setItemUrl] = useState("");
    const { custId,category } = useParams();
    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Items/category/${category}`)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
    }, [])
    return (
        <>
            <Home />
            <div className="row" >
                {item.map((items, index) => {
                    return (
                        <div className="col-md-3" key={index} style={{ marginTop: "5px" }}>
                            <div className="card rounded-lg" style={{ width: "17.5rem" }}>
                                <img className="card-img-top" src={items.itemUrl} alt="Card image cap" style={{ width: "270px", height: "230px" }} />
                                <div class="card-body">
                                    <h5 className="card-title">{items.itemCategory}</h5>
                                    <p className="card-text" style={{ color: "blue" }}>AvailableQuantity:{items.itemQuantity}</p>
                                    <p className="card-text" style={{ color: "red" }}>Discount:{items.itemDiscount}</p>
                                    <button onClick={() => navigate(`/newtempItem/${custId}/${items.itemId}`)} className="btn btn-dark" style={{ marginRight: "3px" }}>BuyNow</button>
                                    <button onClick={() => navigate(`/addToCart/${custId}/${items.itemId}`)} className="btn btn-dark">AddCart</button>
                                </div>
                            </div>
                        </div>


                    )
                })
                }
            </div>
        </>
        )
}
export default ItemListByCategory;