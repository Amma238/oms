import Axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';


function CustomerList() {

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
    const { custId, Id } = useParams();
    //console.log(id)


    useEffect(() => {

        Axios.get(`http://localhost:64911/api/Customers`)
            .then(response => {
                console.log(response.data)
                setCustomer(response.data)
            })
    }, [])

    function DeleteCustomer(Id) {
        Axios.delete(`http://localhost:64911/api/Customers/delete/${Id}`)
            .then(response => {
                console.log(response.data)
                alert("Deleted the customer successfully")
                window.location.reload();
            })
    }

    const customers = customer.map((cust, index) => {
        
            return (


                <tr key={cust.custId}>
                    <td>{cust.custId}</td>
                    <td>{cust.custName}</td>
                    <td>{cust.custEmail}</td>
                    <td>{cust.custPhone}</td>
                    <td>{cust.custAltPhone}</td>
                    <td>{cust.custCity}</td>
                    <td>{cust.custState}</td>
                    <td>{cust.custAddress}</td>
                    <td>
                        <button className="btn btn-outline-secondary" type="submit" style={{ marginRight: "5px" }} onClick={() => navigate(`/customerDetails/${custId}/${cust.custId}`)}>Details</button>
                        <button className="btn btn-outline-secondary" type="submit" style={{ marginRight: "5px" }} onClick={() => navigate(`/updateCustomer/${custId}/${cust.custId}`)}>Update</button>
                        <button className="btn btn-outline-secondary" type="submit" onClick={DeleteCustomer.bind(this, cust.custId)}>Delete</button>
                    </td>
                </tr>

            )
        
        })

    return (
        <>
            <Admin/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>AlternatePhone</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Address</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>{customers}</tbody>
            </table>


        </>
        )
}

export default CustomerList;