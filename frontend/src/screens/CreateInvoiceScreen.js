import { useHistory } from "react-router-dom";

function CreateInvoiceScreen(props) {
  const history = useHistory();

  const submitHandler = () => {
    history.push("/invoice-details");
  }
  return (
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
                    <div id="dvMsg" className="success" style={{display: 'none'}}>Lead details saved successfully.<a onclick="$('#dvMsg').hide();"><img src="images/icons/black/menu_close.png" style={{width: '8%', display: 'inline', float: 'right', marginTop: '-2px'}} /></a>
                    </div>
                    <div className="contactform" id="dvform">
                      <div className="radio">
                        <input defaultChecked type="radio" id="old" name="client" defaultValue="Old Client" />
                        <label htmlFor="old">Old Client</label>
                      </div>
                      <div className="radio">
                        <input type="radio" id="new" name="client" defaultValue="New Client" />
                        <label htmlFor="new">New Client</label>
                      </div>
                      <div className="old-client">
                        <div className="form_row">
                          <label htmlFor="Select Client">Select Client: </label>
                          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option selected>Please select a client</option>
                            <option value={1}>Client # 1</option>
                            <option value={2}>Client # 2</option>
                            <option value={3}>Client # 3</option>
                          </select>                                        
                        </div>
                      </div>
                      <div className="new-client">
                        <div className="form_row">
                          <label htmlFor="Name">Name: </label>
                          <input type="text" id="Name" placeholder="Enter Name" className="form_input required" />
                        </div>
                        <div className="form_row">
                          <label htmlFor="Email">Email: </label>
                          <input type="email" id="Email" placeholder="Enter Email" className="form_input required" />
                        </div>
                        <div className="form_row">
                          <label htmlFor="Phone">Phone: </label>
                          <input type="number" id="Phone" placeholder="Enter Phone" className="form_input required" />
                        </div>
                        <div className="form_row">
                          <label htmlFor="ABN">ABN: </label>
                          <input type="number" id="ABN" placeholder="Enter ABN" className="form_input required" />
                        </div>
                      </div>
                  <input onClick={()=>submitHandler()} type="button" id="submit" name="submit" className="form_submit" defaultValue="Next" />
                    </div>
                  </div>
    </div>
    );
  }

  export default CreateInvoiceScreen;