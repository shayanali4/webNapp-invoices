import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer } from '../actions/invoiceActions';
import Header from '../components/Header';
import MessageBox from '../components/MessageBox';

function EditCustomersScreen(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const selectedClient = useSelector((state) => state.choosenClientInfo);
    const { choosenClient } = selectedClient;
    
    const [customerName, setCustomerName] = useState(choosenClient?choosenClient.clientName:'');
    const [companyName, setCompanyName] = useState(choosenClient?choosenClient.companyName:'');
    const [email, setEmail] = useState(choosenClient?choosenClient.email:'');
    const [address, setAddress] = useState(choosenClient?choosenClient.address:'');
    const [phone, setPhone] = useState(choosenClient?choosenClient.phone:'');
    const [ABN, setABN] = useState(choosenClient?choosenClient.ABN:'');

    const [messageFlag, setMessageFlag] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!userInfo ) {
            props.history.push('/');
        }
    }, [props.history, userInfo]);
    
    // useEffect(() => {
    //     if (!choosenClient ) {
    //         props.history.push('/customers');
    //     }
    // }, [props.history, choosenClient]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editCustomer(choosenClient._id, customerName, companyName, email, address, phone, ABN));
        // props.history.push('/');
        setMessageFlag(true);
        setTimeout(()=>{setMessageFlag(false)},3000)
    };

    return (
        <>
      <Header />
        <div id="pages_maincontent">
        <h2 className="page_title">
            <i onClick={props.history.goBack} className="fa fa-chevron-left back-ico" aria-hidden="true"></i>
            <i className="fas fa-user-edit" aria-hidden="true" />
            &nbsp;Edit Customers
        </h2>
        <h3 id="dvResellerName" >
            Edit Customer details here
        </h3>
                <div className="page_single layout_fullwidth_padding">
                    {messageFlag ?
                        <MessageBox variant='success'>Customer Details Updated</MessageBox> : <></>}
            <div className="contactform" id="dvform">
            
                <div className="new-client">
                <div className="form_row">
                    <label htmlFor="Name">Customer Name: </label>
                    <input onChange={(e) => setCustomerName(e.target.value)} value={customerName}
                        type="text" id="Name" placeholder="Enter Name" className="form_input required" />
                    </div>
                <div className="form_row">
                    <label htmlFor="CompanyName">Company Name: </label>
                    <input onChange={(e) => setCompanyName(e.target.value)} value={companyName}
                        type="text" id="CompanyName" placeholder="Enter Company Name" className="form_input required" />
                </div>
                <div className="form_row">
                    <label htmlFor="Email">Email: </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        type="email" id="Email" placeholder="Enter Email" className="form_input required" />
                    </div>
                <div className="form_row">
                    <label htmlFor="Address">Address: </label>
                    <input onChange={(e) => setAddress(e.target.value)} value={address}
                        type="text" id="Address" placeholder="Enter Address" className="form_input required" />
                </div>
                <div className="form_row">
                    <label htmlFor="Phone">Phone: </label>
                    <input onChange={(e) => setPhone(e.target.value)} value={phone}
                        type="text" id="Phone" placeholder="Enter Phone" className="form_input required" />
                </div>
                <div className="form_row">
                    <label htmlFor="ABN">ABN: </label>
                    <input onChange={(e) => setABN(e.target.value)} value={ABN}
                        type="text" id="ABN" placeholder="Enter ABN" className="form_input required" />
                </div>
                </div>    
            <input onClick={(e) => submitHandler(e)} type="button" id="submit" value='Update' name="submit" className="form_submit" />
            </div>
        </div>
        </div>
        </>
        )
    }

export default EditCustomersScreen;