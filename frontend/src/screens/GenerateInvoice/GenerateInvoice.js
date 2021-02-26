
import { useSelector } from 'react-redux';
import './style.css';

function GenerateInvoice() {

  const invoice = useSelector(state=> state.selectedInvoice);
  console.log("generate invoice", invoice);
  // const { userInfo } = userSignin;  
    return (


            
  
          <div id="ctl04_dvpanel" className="container-fluid tab-pane" >
        <div className="second" >
          {invoice.selectedInvoice ?

            <div className="dvMainInvoice" >
              <section id="memo">
                <div >
                  <img src="https://onlinepayment.webnapp.com.au/img/logo.jpeg" id="ctl04_logo" alt="logo" />
                </div>
                <div className="second">
                  <span >Email: <span id="ctl04_lblCompanyEmail">aussiesmarketplace@gmail.com</span></span><br />
                  <span >Phone: <span id="ctl04_lblCompanyPhone">0430496430</span></span><br />
                  <span >ABN: <span id="ctl04_lblCompanyABN">31251544956</span></span><br />
                </div>
              </section>
              <hr />
              <div className="clearfix" />
              <section className="invoice-section section" style={{ marginTop: '0px', display: 'inline-block', float: 'left', padding: '7px' }}>
                <div className="first"  >Invoice</div>
                <div className="second"><span >Date: <span id="ctl04_lblDate">12/02/2021</span></span></div>
                <div><span className="second" >Invoice No: <span id="ctl04_lblOrderNo">INV1013</span></span></div>
              </section>
              <section className="invoice-section section1" >
                {invoice.selectedInvoice ?
                  <div >
                    <span className="first" ><b>Customer Details</b></span><br />
                    <span className="second" style={{ display: 'inline-block', minWidth: '30px' }}>
                      <b>Name: <span id="ctl04_lblClientName">
                        {invoice.selectedInvoice.clientName}
                      </span>
                      </b>
                    </span>
                    <br />
                    <span className="second">Email:
                  <span id="ctl04_lblClientEmail">
                        {invoice.selectedInvoice.email}
                      </span>
                    </span>
                    <br />
                    <span className="second" >Phone:
                  <span id="ctl04_lblClientPhone">
                        {invoice.selectedInvoice.phone}
                      </span>
                    </span>
                    <br />
                    <span className="second" >ABN:
                  <span id="ctl04_lblClientABN">
                        {invoice.selectedInvoice.ABN}
                      </span>
                    </span>
                    <br />
                  </div> : <></>}
              </section>
              <div className="clearfix" />


              <div className="below">
                <div >
                  <span id="ctl04_lblGST" style={{ paddingLeft: '20px' }}>GST is included in the quote* </span>
                  <span>    prices are in AUD</span>
                </div>
              </div>
              <section className="items">
                {/* {invoice.selectedInvoice.servicesList} */}
                <table id="tblSearch" className="table table-hover nowrap">
                  <thead style={{ backgroundColor: "#00CED1" }} >
                    <tr>
                      <th className="first" style={{ width: '75%' }}><div style={{ textAlign: 'left' }}>Description</div></th>
                      <th className="second" style={{ width: '25%' }}><div style={{ textAlign: 'right' }}>Price</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.selectedInvoice.servicesList.map((v, i) =>
                      <tr key={i}>
                        <td className="first">{v.longDescription}</td>
                        <td className="second" >${v.price}</td>
                      </tr>
                    )}

                    {/* <tr>
                      <td className="first" >Item - 2</td>
                      <td className="second">$761.65</td>
                    </tr> */}
                    {/* <tr className="desc">
                      <td className="first" >Lorem ipsum dolor siit amet pretium nisl neque sed lacus. Nulla facilisi. In tincidunt tincidunt leo.</td>
                      <td className="second" >$19.00</td>
                    </tr> */}
                  </tbody>
                </table>
              </section>


              <section className="sums" >
                <div className="row">





                  <div className="col-md-6">
                    <table className="first1 " >
                      <tbody className=" mob"  ><tr className="amount-total  mob">
                        <td className="second" >Total: $<span id="ctl04_lblTotalAmount">824.63</span></td>
                      </tr>
                        <tr id="ctl04_gstpanel" className="amount-total">
                          <td className="second">GST: $<span id="ctl04_lblGSTAmount">74.97</span></td>
                        </tr>
                        <tr className="amount-total">
                          <td className="second">Amount Paid: $<span id="ctl04_lblPaidAmount">0.00</span></td>
                        </tr>
                        <tr className="amount-total">
                          <td className="second">Balance Amount: $<span id="ctl04_lblBalanceAmount">824.63</span></td>
                        </tr>
                      </tbody></table>
                  </div>
                  <div className="col-md-6">
                    <div className="payment-info">
                      <div className="first">For bank deposit,<br /> Please use <span style={{ color: 'red' }}>Invoice number in Reference</span></div>
                      <div className="second"><br /><span style={{ color: 'black', fontWeight: 'bold' }}>Bank account details:</span></div>
                      <div>Bank: NAB Bank</div>
                      <div>Account Name: Aussies Marketplace Services</div>
                      <div>BSB: 085005</div>
                      <div>Account Number: 93-564-5576</div>
                    </div>
                  </div>









                  {/* <div className="col">
                  <div id="dvFooter" >
                    </div>
                </div> */}
              
                </div>
              </section>
              <br />
              <section className="admin-use">
                <h4>For Admin Use Only</h4>
                <p>Send directly to your customer</p>
                <div className="send">
                  <button>Send Email</button>
                  <button>Send SMS</button>
                </div>
              </section>
              <div className="clearfix" />
            </div> : <></>}
            </div>
          </div>








    )
}
export default GenerateInvoice;

