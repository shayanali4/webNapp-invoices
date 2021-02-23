import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function InvoiceDetailsScreen(props) {
  const selectedClient = useSelector((state) => state.choosenClientInfo);
  const { choosenClient } = selectedClient;    
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedClient) {
      props.history.push('/create');
    }
  }, [props.history, selectedClient]);
  console.log("choosen==>",choosenClient);
    return (

      
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i className="fa fa-plus" aria-hidden="true" />
                  &nbsp;Create Invoice
                </h2>
                <h3 id="dvResellerName" >
                  Enter invoice details here
                </h3>
        <div className="page_single layout_fullwidth_padding">
          {choosenClient ?
          <div className="client-details">
                    <div>
                      <label>Name :</label>
                      <p>{choosenClient.clientName}</p>
                    </div>
                    <div>
                      <label>Email :</label>
                      <p>{choosenClient.email}</p>
                    </div>
                    <div>
                      <label>Phone :</label>
                      <p>{choosenClient.phone}</p>
                    </div>
                    <div>
                      <label>ABN :</label>
                      <p>{choosenClient.ABN}</p>
                    </div>
                  </div>:<></>}
                  
                  <ul className="list">
                    <li>
                      <div>
                        <i className="fa fa-file" aria-hidden="true" />
                      </div>
                      <div className="details">
                        <div><b>Invoice Number 1</b></div>
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
                  </ul>
                  <div className="contactform" id="dvform">
                    <div className="form_row">
                      <label htmlFor="Select Client">Invoice Service: </label>
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Please select invoice service</option>
                        <option value={1}>Service # 1</option>
                        <option value={2}>Service # 2</option>
                        <option value={3}>Service # 3</option>
                      </select>
                    </div>
                    <div className="form_row">
                      <label htmlFor="description">Description: </label>
                      <textarea name="description" id="description" rows={10} placeholder="Enter description" defaultValue={""} />
                    </div>
                    <div className="form_row">
                      <label htmlFor="amount">Amount: </label>
                      <input type="number" name="amount" id="amount" defaultValue placeholder="Enter Amount" className="form_input required" />
                    </div>
                    <input type="button" id="add" name="submit" className="form_submit" defaultValue="Add List Item" />
                    <input type="button" id="submit" name="submit" className="form_submit" defaultValue="Generate Invoice" />
                  </div>
                </div>
              </div>

    );
  }
export default InvoiceDetailsScreen;