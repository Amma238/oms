import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mushroom from '../../images/MushroomBiryani.jfif';

function UpdatePassword() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    const [custId, setCustId] = useState("");
    const [custName, setCustName] = useState("");
    const [custPass, setCustPass] = useState("");
    const [custConfirmPass, setCustConfirmPass] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custPhone, setCustPhone] = useState("");
    const [custAltPhone, setCustAltPhone] = useState("");
    const [custCity, setCustCity] = useState("");
    const [custState, setCustState] = useState("");
    const [custAddress, setCustAddress] = useState("");
    const [custBalance, setCustBalance] = useState("");
   
    

    
    function submitForm() {
       
        
        Axios.get(`http://localhost:64911/api/Customers/email/${custEmail}`)
            .then(response => {
                setCustomer(response.data)
                if (customer.custEmail != custEmail) {
                    //console.log(response.data)
                    alert("Email not matched")
                }
                else {
                    //alert("Incorrect Email ")
                    setCustomer(response.data)
                    setCustId(response.data.custId);
                    setCustName(response.data.custName)
                    setCustEmail(response.data.custEmail)
                    setCustPhone(response.data.custPhone)
                    setCustAltPhone(response.data.custAltPhone)
                    setCustCity(response.data.custCity)
                    setCustState(response.data.custState)
                    setCustAddress(response.data.custAddress)
                    setCustBalance(response.data.custBalance)
                    console.log("customer", customer)
                    document.getElementById("pass1").style.visibility = 'visible';
                    document.getElementById("pass2").style.visibility = 'visible';
                    if (custPass != '') {
                        ReSubmitForm();
                    }
                }
            })
       
    }
    function ReSubmitForm() {
        

            if (custPass != custConfirmPass) {
                alert("Password doesn't match.Re-Enter them");

            }
            else {
                //alert("Updated password")

                const customer = { custId,custName, custPass, custEmail, custPhone, custAltPhone, custCity, custState, custAddress, custBalance }
                console.log(customer)
                Axios.put(`http://localhost:64911/api/Customers/update/${custId}`, customer)
                    .then(response => {
                        console.log(response.data)
                        alert("Updated password")
                        window.location.href = `/login`
                    })
            }
        
    }

    return (
        <>
            <div class="background" style={{ width: "65%", marginLeft: "250px", height: "500px" }}>
                <div class="container" >
                    
                    <div class="screen"  >

                        <div class="screen-body" >
                            <div class="screen-body-item left">
                                <div class="app-title">
                                    <span>UpdatePassword</span>
                                    <span><img  style={{ width: "200px" }} /></span>

                                </div>

                            </div>

                            <div class="screen-body-item" >
                                <div class="app-form" style={{ marginTop: "-20px" }}>

                                    <div class="app-form-group">

                                            <input class="app-form-control" type="email" placeholder="Enter email" style={{ textAlign: "center" }} value={custEmail} onChange={e => { setCustEmail(e.target.value) }} required/>
                                    </div>
                                    <div class="app-form-group"  >

                                        <input class="app-form-control" id="pass1" type="password" placeholder="Enter Password" style={{ textAlign: "center", visibility: "hidden" }} value={custPass} onChange={e => { setCustPass(e.target.value) }} required />
                                        <input class="app-form-control" id="pass2" type="password" placeholder="Confirm Password" style={{ textAlign: "center", visibility: "hidden" }} value={custConfirmPass} onChange={e => { setCustConfirmPass(e.target.value) }} required />
                                    </div>
                                    </div>

                                    <div class="app-form-group buttons">

                                        <button class="app-form-button" type="submit" onClick={submitForm}> Submit</button>
                                        
                                    </div>
                             </div>
                        </div>
                               
                     </div>
                </div>

                    
                 
            </div>
        </>
        )
}

export default UpdatePassword;