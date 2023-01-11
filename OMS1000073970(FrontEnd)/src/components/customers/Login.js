import Axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';




function Login() {
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

    function LoginForm() {



        Axios.get(`http://localhost:64911/api/Customers/login/${custEmail}/${custPass}`)
            .then(response => {
                console.log(response.data)
                if (response.data.custName == '') {
                    alert("Invalid credentials")

                }
                else {
                    if (response.data.custName=='Admin') {
                        alert("Admin Login")
                        window.location.href = `adminItemList/${response.data.custId}`;
                    }
                    else {
                        window.location.href = `itemsList/${response.data.custId}`
                    }
                   
                }
            })
    }
    return (
        <>
            <section class="vh-100 gradient-custom" style={{ marginTop: "-20px" }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-dark text-white" style={{ borderRadius: "1rem;" }}>
                                <div class="card-body p-5 text-center">

                                    <div class="mb-md-5 mt-md-4 pb-5">

                                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p class="text-white-50 mb-5">Please enter your email and password!</p>
                                        <div class="form-outline form-white mb-4">
                                            <label class="form-label" for="custId" >Email/Phone</label>
                                            <input type="email" id="custEmail" class="form-control form-control-lg" onChange={e => { setCustEmail(e.target.value) }} value={custEmail} />

                                        </div>
                                        <div class="form-outline form-white mb-4">
                                            <label class="form-label" for="custPass">Password</label>
                                            <input type="password" id="custPass" class="form-control form-control-lg" onChange={e => { setCustPass(e.target.value) }} value={custPass} />

                                        </div>
                                        <p class="small mb-5 pb-lg-2"><a class="text-white-50" href={`/updatePassword`}>Forgot password?</a></p>
                                        <button class="btn btn-outline-light btn-lg px-5" type="submit" style={{ marginTop: "-30px" }} onClick={LoginForm.bind(this, custEmail, custPass)}>Login</button>
                                    </div>
                                    <div style={{ marginTop: "-90px" }}>
                                        <p class="mb-0">Don't have an account? <a href={`/register`} class="text-white-50 fw-bold">Register Here..!</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );



}
export default Login;