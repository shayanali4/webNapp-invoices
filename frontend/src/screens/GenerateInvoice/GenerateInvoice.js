
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BitlyClient } from 'bitly-react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import './style.css';
import { settingsReducer } from '../../reducers/invoiceReducers';

function GenerateInvoice() {
  const [smsModal, setSmsModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [bitlyUrl, setBitlyUrl] = useState('');
  const invoice = useSelector(state => state.invoiceInfo);
  const settings = useSelector(state => state.settingsInfo.settings);
  // if (invoice.selectedInvoice) {
    //   console.log("generate invoice", invoice.selectedInvoice);
    // }
  const [emailTemplate, setEmailTemplate] = useState(settings.emailTemplate);  
  const [smsTemplate, setSmsTemplate] = useState(settings.smsTemplate);
  let gst = 0;
  let totalPrice = 0;
  if (invoice.selectedInvoice) {
    totalPrice = invoice.selectedInvoice.listItems.reduce((prev, next) => prev + next.price, 0);
    gst = totalPrice / 11;
  }
  
  const foot = settings.invoiceFooter;
  const bitly = new BitlyClient('930b46de2b827c05809757b390d38b7ed5d5613b', {});
  const generateUrl = async () => {
    let result;
    try {
      result = await bitly.shorten('https://google.com');
    } catch (e) {
      throw e;
    }
    console.log(result);
    setBitlyUrl(result.url);
    return result;

  }

  const copyUrl = () => {
    navigator.clipboard.writeText(bitlyUrl);
    var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied !";

  }

  const outFunc = () => {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copy to clipboard";
  }
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
                <div><span className="second" >Invoice No: <span id="ctl04_lblOrderNo">{invoice.selectedInvoice.invoiceNumber}</span></span></div>
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
                    {invoice.selectedInvoice.listItems.map((v, i) =>
                      <tr key={i}>
                        <td className="first">{v.longDescription}</td>
                        <td className="second" >${v.price}</td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </section>


              <section className="sums" >
                <div className="row">





                  <div className="col-md-6">
                    <table className="first1 " >
                      <tbody className=" mob"  >
                        <tr className="amount-total  mob">
                          <td className="second" >Total: $<span id="ctl04_lblTotalAmount">{totalPrice}</span></td>
                      </tr>
                        <tr id="ctl04_gstpanel" className="amount-total">
                          <td className="second">GST: $<span id="ctl04_lblGSTAmount">{gst.toFixed(2)}</span></td>
                        </tr>
                        
                        <tr className="amount-total">
                          <td className="second">Amount Paid: $<span id="ctl04_lblPaidAmount">0.00</span></td>
                        </tr>
                        <tr className="amount-total">
                          <td className="second">Balance Amount: $<span id="ctl04_lblBalanceAmount">{totalPrice}</span></td>
                        </tr>
                      </tbody></table>
                  </div>
                  <div className="col-md-6">
                    <div className="payment-info" dangerouslySetInnerHTML={{__html: foot}} />

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
                  {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter">Send Email</button>
                  <button>Send SMS</button> */}
                  <button onClick={()=>setSmsModal(true)} type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#smsModal">Send SMS</button>
                  <button onClick={()=>setEmailModal(true)} type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#emailModal">Send Email</button>
                  <button onClick={()=>setPaymentModal(true)} type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#paymentModal">Payment Received</button>

                </div>

                {/*SMS Modal */}
                <div id="smsModal" class={`modal ${smsModal?'show':''}`}>

                    <div class="modal-content">
                        <div class="modal-header">
                            <span onClick={()=>setSmsModal(false)} class="close">&times;</span>
                            <h2>Send SMS</h2>
                        </div>
                    <div class="modal-body">
                      <div className='bitly'>
                        <p><b>Bitly Url :</b></p>
                        {bitlyUrl === '' ?
                          <button onClick={() => generateUrl()}>Generate Url</button> :
                          <div className="tooltip">
                            <p>{bitlyUrl}</p>
                            <button onClick={() => copyUrl()} onMouseOut={()=>outFunc()}>
                              <span class="tooltiptext" id="myTooltip">
                                Copy to clipboard
                                </span>
                                Copy
                                </button>
                          </div>}
                      </div>
                      {bitlyUrl !== '' ?
                        <div className="message">
                          <p><b>Enter your message :</b></p>
                          <textarea value={`${smsTemplate} \nHere is the download link : ${bitlyUrl}`} onChange={(e) => setSmsTemplate(e.target.value)} placeholder='Enter Message'></textarea>
                        </div> :<></>}
                        </div>
                        <div class="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      <button>Send</button>
                        </div>
                    </div>

                </div>
                {/*Email Modal */}
                <div id="emailModal" class={`modal ${emailModal?'show':''}`}>

                    <div class="modal-content">
                        <div class="modal-header">
                            <span onClick={()=>setEmailModal(false)} class="close">&times;</span>
                            <h2>Send Email</h2>
                        </div>
                    <div class="modal-body">
                      <div className="message">
                        <p><b>Enter Message :</b></p>
                        <textarea value={emailTemplate} onChange={(e)=>setEmailTemplate(e.target.value)} placeholder='Enter Message'></textarea>
                      </div>
                        </div>
                        <div class="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      <button>Send</button>
                        </div>
                    </div>

                </div>
                {/*Payment Modal */}
                <div id="paymentModal" class={`modal ${paymentModal?'show':''}`}>

                    <div class="modal-content">
                        <div class="modal-header">
                            <span onClick={()=>setPaymentModal(false)} class="close">&times;</span>
                            <h4>Payment Received</h4>
                        </div>
                    <div class="modal-body">
                      <div>
                        <p><b>Payment Method :</b></p>
                        <span>
                          <input id='cash' type="radio" name='payment' />
                          <label htmlFor='cash'>Cash</label>
                        </span>
                        <span>
                          <input id='cheque' type="radio" name='payment' />
                          <label htmlFor='cheque'>Cheque</label>
                        </span>
                        <span>
                          <input id='banktransfer' type="radio" name='payment' />
                          <label htmlFor='banktransfer'>Bank Transfer</label>
                        </span>
                        <span>
                          <input id='stripe' type="radio" name='payment' />
                          <label htmlFor='stripe'>Stripe</label>
                        </span>
                        <span>
                          <input id='efpos' type="radio" name='payment' />
                          <label htmlFor='efpos'>EFPOS</label>
                        </span>
                      </div>
                      <div>
                        <table id="tblSearch" className="table table-hover nowrap my-3">
                          <thead style={{ backgroundColor: "#00CED1" }} >
                            <tr>
                              <th className="first" style={{ width: '25%' }}>Date</th>
                              <th className="second" style={{ width: '45%' }}>Payment Method</th>
                              <th className="second" style={{ width: '15%' }}>Payment Received</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="first" style={{ width: '25%' }}>01/02/2021</td>
                              <td className="second" style={{ width: '45%' }}>Stripe</td>
                              <td className="second" style={{ width: '15%' }}>$20</td>
                            </tr>
                            <tr>
                              <td className="first" style={{ width: '25%' }}>03/02/2021</td>
                              <td className="second" style={{ width: '45%' }}>Cheque</td>
                              <td className="second" style={{ width: '15%' }}>$35</td>
                            </tr>
                            <tr>
                              <td className="first" style={{ width: '25%' }}>01/03/2021</td>
                              <td className="second" style={{ width: '45%' }}>Bank Transfer</td>
                              <td className="second" style={{ width: '15%' }}>$65</td>
                            </tr>
                            {/* {invoice.selectedInvoice.listItems.map((v, i) =>
                              <tr key={i}>
                                <td className="first">{v.longDescription}</td>
                                <td className="second" >${v.price}</td>
                              </tr>
                            )} */}

                          </tbody>
                        </table>
                      </div>
                      <div className='amount-details'>
                        <div>
                          <p><b>Total Amount :</b></p>
                          <p>${totalPrice}</p>
                        </div>
                        <div>
                          <p><b>Paid Amount :</b></p>
                          <p>$0</p>
                        </div>
                        <div>
                          <p><b>Balance Amount :</b></p>
                          <p>${totalPrice}</p>
                        </div>
                      </div>
                    </div>
                        <div class="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      <button>Send</button>
                        </div>
                    </div>

                </div>
              </section>
              <div className="clearfix" />
            </div> : <></>}
            </div>
          </div>








    )
}
export default GenerateInvoice;

