import Axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';





function RegisterCustomer() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    const [custId, setCustId] = useState("");
    const [custName, setCustName] = useState("");
    const [custPass, setCustPass] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custPhone, setCustPhone] = useState("");
    const [custAltPhone, setCustAltPhone] = useState("");
    const [custCity, setCustCity] = useState("");
    const [custState, setCustState] = useState("");
    const [custAddress, setCustAddress] = useState("");
    const [custBalance, setCustBalance] = useState("");



    function AddCustomer() {
        const customer = { custName, custPass, custEmail, custPhone, custAltPhone, custCity, custState, custAddress, custBalance }
        console.log(customer)
        Axios.post(`http://localhost:64911/api/Customers/add`, customer)
            .then(response => {
                console.log(response.data)
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
                                    <span>Register </span>
                                    <span>Customer</span>
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
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Password" value={custPass} onChange={e => { setCustPass(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group">
                                        <input class="app-form-control" placeholder="Phone No" value={custPhone} onChange={e => { setCustPhone(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Alternate Phone" value={custAltPhone} onChange={e => { setCustAltPhone(e.target.value) }} />
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
                                    <div class="app-form-group ">
                                        <input class="app-form-control" placeholder="Balance" value={custBalance} onChange={e => { setCustBalance(e.target.value) }} />
                                    </div>
                                    <div class="app-form-group buttons">

                                        <button class="app-form-button" type="submit" onClick={AddCustomer}>Add</button>
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
export default RegisterCustomer;