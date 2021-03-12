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

  const invoicesListInfo = useSelector((state) => state.invoicesListInfo);
  console.log('invoice list', invoicesListInfo);

  const getSelectedInvoice = useSelector((state) => state.invoiceInfo);
  // console.log(getSelectedInvoice)

  
  const chooseInvoice = (index) => {
    setSelectedInvoice(invoicesListInfo.invoicesList[index]);
    // console.log("select",invoicesListInfo.invoicesList[index])
  }

  useEffect(() => {
    dispatch(selectInvoice(selectedInvoice));
    // console.log("selected inv==>", selectedInvoice);

  }, [dispatch, selectedInvoice]);
  const [invoiceClick, setInvoiceClick] = useState(false);
  useEffect(() => {
    if (invoiceClick) {
      if (getSelectedInvoice.selectedInvoice) {
        props.history.push('/generate');
        setInvoiceClick(false);
      }
    }
    // console.log("selected inv==>", selectedInvoice);

  }, [dispatch, getSelectedInvoice,invoiceClick, props.history]);
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
                  <i onClick={props.history.goBack} className="fa fa-chevron-left back-ico" aria-hidden="true"></i>
                  <i className="fa fa-bars" aria-hidden="true" />
                  &nbsp;Invoices
                </h2>
                <h3 id="dvResellerName" >
                  Invoice list
                </h3>
        <div className="page_single layout_fullwidth_padding">
          {invoicesListInfo.invoicesList ?
            <ul className="list">
              {invoicesListInfo.invoicesList.map((v, i) =>
                <li onClick={() => { chooseInvoice(i);setInvoiceClick(true) }} key={i}>
                  {/* <div>
                    <i className="fa fa-file" aria-hidden="true" />
                  </div> */}
                  <div className="details">
                    <div><b>{v.companyName} (${v.totalAmount})</b></div>
                    <div>
                      <span className="first">
                        {v.invoiceNumber}
                      </span>
                      <span>
                        {v._id}
                          </span>
                    </div>
                    <div>
                      <span className="first">
                        {v.clientName}
                      </span>
                      <span>
                        {v.email}
                          </span>
                    </div>
                  </div>
                  <div className="actions">
                    <i onClick={() => { editInvoice(i); }} className="fas fa-edit" aria-hidden="true" />
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