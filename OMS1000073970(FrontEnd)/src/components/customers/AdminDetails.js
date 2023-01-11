import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Admin from '../Admin';


function AdminDetails() {

    const navigate = useNavigate();
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
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustName(response.data.custName)
                setCustEmail(response.data.custEmail)
                setCustPhone(response.data.custPhone)
                setCustAltPhone(response.data.custAltPhone)
                setCustCity(response.data.custCity)
                setCustState(response.data.custState)
                setCustAddress(response.data.custAddress)
                setCustBalance(response.data.custBalance)
            })
        

    }, [])
    return (
        <>

            <Admin/>
            <div class="background">
                <div class="container" style={{ marginTop: "-5px" }}>
                    <div class="screen" style={{ width: "600px" }}>
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

                                    <span>Admin Details</span>
                                    
                                </div>



                            </div>
                            <div class="screen-body-item">
                                <div class="app-form">
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Name" value={custName} onChange={e => { setCustName(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Email" value={custEmail} onChange={e => { setCustEmail(e.target.value) }} />
                                    </div>

                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Phone No" value={custPhone} onChange={e => { setCustPhone(e.target.value) }} />
                                    </div>

                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="City" value={custCity} onChange={e => { setCustCity(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="State" value={custState} onChange={e => { setCustState(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Address" value={custAddress} onChange={e => { setCustAddress(e.target.value) }} />
                                    </div>

                                    <div class="app-form-group buttons">

                                        <button class="app-form-button" type="submit" onClick={() => navigate(`/updatecustomer/${custId}/${custId}`)} >Update</button>
                                        <button class="app-form-button" onClick={() => navigate(`/adminItemList/${custId}`)}> Back</button>
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

export default AdminDetails;