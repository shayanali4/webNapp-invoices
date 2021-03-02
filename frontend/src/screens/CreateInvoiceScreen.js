import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientList, newclient, oldclient } from "../actions/invoiceActions";
import Header from "../components/Header";

function CreateInvoiceScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;  
  
  const [clientStatus, setClientStatus] = useState('old');
  const [clientIndex, setClientIndex] = useState(0);
  const [selectedClient, setSelectedClient] = useState({});
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState();
  const [ABN, setABN] = useState();
  const dispatch = useDispatch();

  const submitHandler = () => {
    if (clientStatus === 'old') {
      dispatch(oldclient(selectedClient));
      props.history.push('/invoice-details');
    } else {
      dispatch(newclient(clientName, companyName, email, address, phone, ABN));
      props.history.push('/invoice-details');
    }
  }



  useEffect(() => {
    dispatch(clientList());
    // const clients = useSelector((state) => state.clients);

  }, [clientStatus, dispatch]);

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);

  const clientsInfo = useSelector((state) => state.clientInfo.clientsList);

  // const { clients } = clientsInfo;
  // if (clientsInfo) {
  //   console.log(clientsInfo.clients);
  // }
  useEffect(() => {
    if (clientsInfo) {
      setSelectedClient(clientsInfo.clients[clientIndex]);
      // console.log("filtered client", selectedClient);
    }
  }, [clientIndex, clientsInfo]);
  return (
    <>
      <Header />
    <div id="pages_maincontent">
      <h2 className="page_title">
        <i onClick={props.history.goBack} class="fa fa-chevron-left back-ico" aria-hidden="true"></i>
        <i className="fa fa-plus" aria-hidden="true" />
          &nbsp;Create Invoice
      </h2>
      <h3 id="dvResellerName" >
        Enter client details here
      </h3>
      <div className="page_single layout_fullwidth_padding">
        <div className="contactform" id="dvform">
          <div className="radio-options">
            <div className="radio">
              <input defaultChecked type="radio" id="old" name="client" value="old"
              onChange={(e)=>setClientStatus(e.target.value)} />
              <label htmlFor="old">Old Client</label>
            </div>
            <div className="radio">
              <input type="radio" id="new" name="client" value="new"
              onChange={(e)=>setClientStatus(e.target.value)} />
              <label htmlFor="new">New Client</label>
            </div>
          </div>
          {clientStatus === 'old' ?
            <div className="old-client">
              <div className="form_row">
                <label htmlFor="Select Client">Select Client: </label>
                <select onChange={(e)=>setClientIndex(e.target.value)} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option selected>Please select a client</option>
                  {clientsInfo ? <>
                    {clientsInfo.clients.map((v, i) =>
                      <option id={i} value={i}>{v.clientName}</option>
                  )}
                  </>
                    : <></>}
                </select>                                        
              </div>
            </div> : clientStatus === 'new' ?
            <div className="new-client">
              <div className="form_row">
                <label htmlFor="Name">Client Name: </label>
                  <input onChange={(e) => setClientName(e.target.value)} value={clientName}
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
                    type="number" id="Phone" placeholder="Enter Phone" className="form_input required" />
              </div>
              <div className="form_row">
                <label htmlFor="ABN">ABN: </label>
                  <input onChange={(e) => setABN(e.target.value)} value={ABN}
                    type="number" id="ABN" placeholder="Enter ABN" className="form_input required" />
              </div>
            </div>
            :<></>}     
          <input onClick={() => submitHandler()} type="button" id="submit" name="submit" className="form_submit" defaultValue="Next" />
        </div>
      </div>
      </div>
    </>
    );
  }

  export default CreateInvoiceScreen;