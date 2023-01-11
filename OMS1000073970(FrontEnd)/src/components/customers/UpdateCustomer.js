import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateCustomer() {
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
    console.log(custId)

    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustName(response.data.custName)
                setCustEmail(response.data.custEmail)
                setCustPass(response.data.custPass)
                setCustPhone(response.data.custPhone)
                setCustAltPhone(response.data.custAltPhone)
                setCustCity(response.data.custCity)
                setCustState(response.data.custState)
                setCustAddress(response.data.custAddress)
                setCustBalance(response.data.custBalance)
            })
    },[])

    function CustomerUpdate(custId) {
        const customer = { custId,custName, custPass, custEmail, custPhone, custAltPhone, custCity, custState, custAddress, custBalance }
        console.log(customer)
        Axios.put(`http://localhost:64911/api/Customers/update/${custId}`, customer)
            .then(response => {
                console.log(response.data)
                alert("Updated the customer details successfully")
                window.location.href = `/adminDetails/${custId}`;
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

                                        <span> Update Customer </span>

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
                                        <input class="app-form-control"  placeholder="Password" value={custPass} onChange={e => { setCustPass(e.target.value) }} />
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

                                        <button class="app-form-button" type="submit" onClick={CustomerUpdate.bind(this, custId)}>Update</button>
                                        <button class="app-form-button" onClick={() => navigate(-1)}>Back<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                        </svg></button>
                                       
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

export default UpdateCustomer;