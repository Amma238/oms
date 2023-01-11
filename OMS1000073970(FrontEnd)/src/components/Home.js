import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Hexa from '../images/Hexalogo.jfif';
import ItemsList from './items/ItemsList';


function Home() {
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
    const [category, setCategory] = useState("");
    const { custId } = useParams();

    function SearchByCategory(category) {
        //alert(category)
        window.location.href =`/itemListByCategory/${custId}/${category}`
    }

    function Logout() {
        alert("Sorry to see you go:" + customer.custName)
        window.location.href=`/login`
    }
    useEffect(() => {
        Axios.get(`http://localhost:64911/api/Customers/${custId}`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
    },[])
    

    return (
        <>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{ fontSize: "15px"}}>

                <div class="container-fluid">

                    <a class="navbar-brand" href="#" style={{ color: "blue" }}><img src={Hexa} style={{width:"30px",marginRight:"5px"}}/>HexaCart</a>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
                            <li class="nav-item text-center mx-2 mx-lg-1">
                                <a class="nav-link " aria-current="page"  href={`/itemslist/${custId}`}>
                                    <div>
                                        <i class="fas fa-home fa-lg mb-1"></i>
                                    </div>
                                    Home
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                    </svg>
                                </a>
                            </li>
                            <li >

                                <form class="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0"  >
                                    <input type="search" class="form-control" placeholder="SearchByCategory" aria-label="Search" onChange={e => { setCategory(e.target.value) }} style={{marginRight:"2px"}} />
                                    <button class="btn btn-primary" type="button" data-mdb-ripple-color="dark" onClick={SearchByCategory.bind(this, category)}>
                                        Search
                                    </button>
                                </form>   
                                
                                    
                            </li>
                         
                            <li class="nav-item text-center mx-2 mx-lg-1">
                                <a class="nav-link " aria-current="page" href={`/customerOrderList/${custId}`} >
                                    <div>
                                        <i class="fas fa-home fa-lg mb-1"></i>
                                    </div>
                                    Orders
                                    
                                </a>
                            </li>
                            
                            
                            <li class="nav-item text-center mx-2 mx-lg-1" >
                                <a class="nav-link " aria-current="page" style={{ marginLeft: "250px" }} href={`/customerDetails/${custId}`}>
                                    {customer.custName}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item text-center mx-2 mx-lg-1" >
                                <button class="btn btn-dark " aria-current="page" onClick={Logout} >
                                  
                                    SignOut
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                </button>
                            </li>

                            
                            
                        </ul>
                        
                       
                        
                    </div>

                </div>

            </nav>
            


        </>
    )
}

export default Home;