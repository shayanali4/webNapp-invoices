import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { clientList, invoiceList, oldclient, selectInvoice } from "../actions/invoiceActions";
import Header from "../components/Header";
import { selectedInvoiceReducer } from "../reducers/invoiceReducers";

function CustomersScreen(props) {
  const [selectedClient, setSelectedClient] = useState({});
  const [editFlag, setEditFlag] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;  
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientList());

  }, [dispatch]);

  useEffect(() => {
    if (!userInfo ) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);

  useEffect(() => {
    if (editFlag) {
      dispatch(oldclient(selectedClient));
      props.history.push('/customers/edit');
    }
    setEditFlag(false);
  }, [dispatch, props.history, selectedClient,editFlag]);

  const clientsInfo = useSelector((state) => state.clientInfo.clientsList);
  const editCustomer = (index) => {
    setSelectedClient(clientsInfo.clients[index]);

  }

  return (
      <>
      <Header />
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i onClick={props.history.goBack} className="fa fa-chevron-left back-ico" aria-hidden="true"></i>
                  <i class="fas fa-users"></i>
                  &nbsp;Customers
                </h2>
                <h3 id="dvResellerName" >
                  Customers list
                </h3>
        <div className="page_single layout_fullwidth_padding">
          {clientsInfo ?
            <ul className="list">
              {clientsInfo.clients.map((v, i) =>
                <li key={i}>
                  <div className="details">
                    <div><b>{v.clientName}</b></div>
                    <div>
                      <span className="first">
                        {v.email}
                      </span>
                      <span>
                        {v.phone}
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <i onClick={() => { editCustomer(i); setEditFlag(true); }} className="fas fa-user-edit" aria-hidden="true" />
                  </div>
                </li>
              )}
                    
            </ul> : <></>}
                </div>
      </div>
      </>
    );
  }
    export default CustomersScreen;