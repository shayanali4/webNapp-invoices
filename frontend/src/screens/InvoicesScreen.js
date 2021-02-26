import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { invoiceList, selectInvoice } from "../actions/invoiceActions";
import Header from "../components/Header";
import { selectedInvoiceReducer } from "../reducers/invoiceReducers";

function InvoicesScreen(props) {
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoiceList());
    // const clients = useSelector((state) => state.clients);

  }, [dispatch]);

  const invoicesInfo = useSelector((state) => state.invoiceInfo);
  console.log('invoice list', invoicesInfo);
  
  const chooseInvoice = (index) => {
    setSelectedInvoice(invoicesInfo.invoicesList.invoices[index]);
    // props.history.push('/generate');
  }

  useEffect(() => {
    dispatch(selectInvoice(selectedInvoice));
    console.log("selected inv==>", selectedInvoice);

  }, [dispatch, selectedInvoice]);
  
  const deleteInvoice = () => {
    // Next task
  }

  const editInvoice = () => {
    // Next task
  }



  return (
      <>
      <Header />
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i className="fa fa-bars" aria-hidden="true" />
                  &nbsp;Invoices
                </h2>
                <h3 id="dvResellerName" >
                  Invoice list
                </h3>
        <div className="page_single layout_fullwidth_padding">
          {invoicesInfo.invoicesList ?
            <ul className="list">
              {invoicesInfo.invoicesList.invoices.map((v, i) =>
                <li onClick={()=>chooseInvoice(i)} key={i}>
                  {/* <div>
                    <i className="fa fa-file" aria-hidden="true" />
                  </div> */}
                  <div className="details">
                    <div><b>{v.clientName}</b></div>
                    <div>
                      <span className="first">
                        {v.phone}
                      </span>
                      <span>
                        ABN
                          </span>
                    </div>
                  </div>
                  <div className="actions">
                    <i onClick={() => editInvoice()} className="fa fa-pencil-square" aria-hidden="true" />
                    <i onClick={() => deleteInvoice()} className="fa fa-trash" aria-hidden="true" />
                  </div>
                </li>
              )}
                    
              {/* <li>
                <div>
                  <i className="fa fa-file" aria-hidden="true" />
                </div>
                <div className="details">
                  <div><b>Invoice Number 2</b></div>
                  <div>
                    <span className="first">
                      Phone
                          </span>
                    <span>
                      ABN
                          </span>
                  </div>
                </div>
                <div className="actions">
                  <i className="fa fa-pencil-square" aria-hidden="true" />
                  <i className="fa fa-trash" aria-hidden="true" />
                </div>
              </li>
              <li>
                <div>
                  <i className="fa fa-file" aria-hidden="true" />
                </div>
                <div className="details">
                  <div><b>Invoice Number 3</b></div>
                  <div>
                    <span className="first">
                      Phone
                          </span>
                    <span>
                      ABN
                          </span>
                  </div>
                </div>
                <div className="actions">
                  <i className="fa fa-pencil-square" aria-hidden="true" />
                  <i className="fa fa-trash" aria-hidden="true" />
                </div>
              </li>
              <li>
                <div>
                  <i className="fa fa-file" aria-hidden="true" />
                </div>
                <div className="details">
                  <div><b>Invoice Number 4</b></div>
                  <div>
                    <span className="first">
                      Phone
                          </span>
                    <span>
                      ABN
                          </span>
                  </div>
                </div>
                <div className="actions">
                  <i className="fa fa-pencil-square" aria-hidden="true" />
                  <i className="fa fa-trash" aria-hidden="true" />
                </div>
              </li>
              <li>
                <div>
                  <i className="fa fa-file" aria-hidden="true" />
                </div>
                <div className="details">
                  <div><b>Invoice Number 5</b></div>
                  <div>
                    <span className="first">
                      Phone
                          </span>
                    <span>
                      ABN
                          </span>
                  </div>
                </div>
                <div className="actions">
                  <i className="fa fa-pencil-square" aria-hidden="true" />
                  <i className="fa fa-trash" aria-hidden="true" />
                </div>
              </li> */}
            </ul> : <></>}
                </div>
      </div>
      </>
    );
  }
    export default InvoicesScreen;