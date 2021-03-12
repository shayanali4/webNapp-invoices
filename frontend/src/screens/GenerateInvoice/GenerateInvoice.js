
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BitlyClient } from 'bitly-react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import './style.css';
import { settingsReducer } from '../../reducers/invoiceReducers';
import { sendEmailBackend } from '../../actions/emailActions';
import { updatePaymentDetails } from '../../actions/invoiceActions';
import StripePayment from '../../components/StripePayment/StripePayment';
import StripeCard from '../../components/StripeCard/StripeCard';

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

  const [paymentList, setPaymentList] = useState(invoice.selectedInvoice?invoice.selectedInvoice.paymentList:[]);
  const [payMethod, setPayMethod] = useState('');
  const [payValue, setPayValue] = useState('');
  const [payDate, setPayDate] = useState('');
  const [stripePayment, SetStripePayment] = useState('');

  const [balanceFlag, setBalanceFlag] = useState(true);

  const dispatch = useDispatch();

  let gst = 0;
  let totalPrice = 0;
  if (invoice.selectedInvoice) {
    totalPrice = invoice.selectedInvoice.listItems.reduce((prev, next) => prev + next.price, 0);
    gst = totalPrice / 11;
  }
  let paidAmount = 0;
  if (invoice.selectedInvoice) {
    // setPaymentList(invoice.selectedInvoice.paymentList);
    paidAmount = invoice.selectedInvoice.paymentList.reduce((prev, next) => prev + next.payValue, 0);
  }
  console.log('paid =>',paidAmount)
  
  let balanceAmount = totalPrice - paidAmount;

  useEffect(() => {
    if (balanceAmount > 0) {
      setBalanceFlag(true);
    } else {
      setBalanceFlag(false);
    }
  }, [balanceAmount, balanceFlag]);
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

  const updatePayment = (e) => {
    e.preventDefault();
    const date = GetFormattedDate();
    setPayDate(date)
    setPaymentList(oldArray => [...oldArray, { payMethod, payValue, date }]);
    setPayValue('');
    
  };

  useEffect(() => {
    if (invoice.selectedInvoice) {
      if (paymentList.length >= 1) {
        dispatch(updatePaymentDetails(invoice.selectedInvoice._id, paymentList));
      }
    }
    }, [paymentList]);

  const GetFormattedDate=()=> {
    var todayTime = new Date();
    var month = todayTime.getMonth()+1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var hours = todayTime.getHours();
    var minutes = todayTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return day + "/" + month + "/" + year + " , " + strTime;
  }

  const receiver = 'shayanali4@live.com';

  const sendEmail = () => {
    dispatch(sendEmailBackend(receiver,emailTemplate));
  }
  console.log('pay==>',paymentList);
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
                  <span><b>Email: </b>
                    <span id="ctl04_lblCompanyEmail">aussiesmarketplace@gmail.com</span>
                  </span>
                  <span><b>Phone: </b>
                    <span id="ctl04_lblCompanyPhone">0430496430</span>
                  </span>
                  <span><b>ABN: </b>
                    <span id="ctl04_lblCompanyABN">31251544956</span>
                  </span>
                </div>
              </section>
              <hr />
              <div className="clearfix" />
              <div className="inv-details">
              <section className="invoice-section section" >
                <div className="first"  >Invoice</div>
                <div className="second"><span><b>Date: </b><span id="ctl04_lblDate">12/02/2021</span></span></div>
                <div className="second"><span><b>Invoice # </b><span id="ctl04_lblOrderNo">{invoice.selectedInvoice.invoiceNumber}</span></span></div>
              </section>
              <section className="invoice-section section" >
                {invoice.selectedInvoice ?
                  <>
                    <div className="first">Customer Details</div>
                      <div><span className="second" >
                      <b>Company Name: </b><span >
                        {invoice.selectedInvoice.companyName}
                      </span>
                      </span>
                      </div>
                      
                    <div><span className="second" >
                      <b>Name: </b><span >
                        {invoice.selectedInvoice.clientName}
                      </span>
                      
                    </span>
                    </div>
                    <div><span className="second"><b>Email: </b>
                  <span id="ctl04_lblClientEmail">
                        {invoice.selectedInvoice.email}
                      </span>
                    </span>
                    </div>
                    <div><span className="second" ><b>Phone: </b>
                  <span id="ctl04_lblClientPhone">
                        {invoice.selectedInvoice.phone}
                      </span>
                    </span>
                    </div>
                    <div><span className="second" ><b>ABN: </b>
                  <span id="ctl04_lblClientABN">
                        {invoice.selectedInvoice.ABN}
                      </span>
                    </span>
                    </div>
                  </> : <></>}
                </section>
                </div>
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





                    <table className="first1 " >
                      <tbody className=" mob"  >
                        <tr className="amount-total  mob">
                          <td className="second" >Total: $<span id="ctl04_lblTotalAmount">{totalPrice}</span></td>
                      </tr>
                        <tr id="ctl04_gstpanel" className="amount-total">
                          <td className="second">GST: $<span id="ctl04_lblGSTAmount">{gst.toFixed(2)}</span></td>
                        </tr>
                        
                        <tr className="amount-total">
                          <td className="third">Amount Paid: $<span id="ctl04_lblPaidAmount">{paidAmount}</span></td>
                        </tr>
                        <tr className="amount-total">
                          <td className="third">Balance Amount: $<span id="ctl04_lblBalanceAmount">{balanceAmount}</span></td>
                        </tr>
                      </tbody></table>
                    <div className="payment-info" dangerouslySetInnerHTML={{__html: foot}} />










                  {/* <div className="col">
                  <div id="dvFooter" >
                    </div>
                </div> */}
              
              </section>
              <br />
              {balanceFlag ?
                <section>
                  <div className="paywithstripe">
                    <p>Would you like to pay using your Debit/Credit Card?</p>
                    <div>
                      <span>
                        <input onChange={(e) => SetStripePayment(e.target.value)} id="pay-yes" type="radio" name="pay-now" value='yes' />
                        <label htmlFor="pay-yes">Yes</label>
                      </span>
                      <span>
                        <input onChange={(e) => SetStripePayment(e.target.value)} defaultChecked id="pay-no" type="radio" name="pay-now" value='no' />
                        <label htmlFor="pay-no">No</label>
                      </span>
                      </div>
                  </div>
              
                  {stripePayment === 'yes' ?
                    <StripeCard pay={balanceAmount} email={invoice.selectedInvoice.email} paidAmount={paidAmount} /> : <></>}
                </section> : <></>}
              <br />
              <section className="admin-use">
                <h4>For Admin Use Only</h4>
                <p>Send directly to your customer</p>
                <div className="send">
                  {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter">Send Email</button>
                  <button>Send SMS</button> */}
                  <button onClick={()=>setSmsModal(true)} type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#smsModal">Send SMS</button>
                  <button onClick={()=>setEmailModal(true)} type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#emailModal">Send Email</button>
                  <button onClick={()=>setPaymentModal(true)} type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#paymentModal">Received Payment</button>

                </div>

                {/*SMS Modal */}
                <div id="smsModal" className={`modal ${smsModal?'show':''}`}>

                    <div className="modal-content">
                        <div className="modal-header">
                            <span onClick={()=>setSmsModal(false)} className="close">&times;</span>
                            <h2>Send SMS</h2>
                        </div>
                    <div className="modal-body">
                      <div className='bitly'>
                        <p><b>Bitly Url :</b></p>
                        {bitlyUrl === '' ?
                          <button onClick={() => generateUrl()}>Generate Url</button> :
                          <div className="tooltip">
                            <p>{bitlyUrl}</p>
                            <button onClick={() => copyUrl()} onMouseOut={()=>outFunc()}>
                              <span className="tooltiptext" id="myTooltip">
                                Copy to clipboard
                                </span>
                                Copy
                                </button>
                          </div>}
                      </div>
                      {bitlyUrl !== '' ?
                        <div className="message">
                          <p><b>Enter your message :</b></p>
                          <textarea value={`${smsTemplate} \n\nHere is the download link : ${bitlyUrl}`} onChange={(e) => setSmsTemplate(e.target.value)} placeholder='Enter Message'></textarea>
                        </div> :<></>}
                        </div>
                        <div className="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      <button>Send</button>
                        </div>
                    </div>

                </div>
                {/*Email Modal */}
                <div id="emailModal" className={`modal ${emailModal?'show':''}`}>

                    <div className="modal-content">
                        <div className="modal-header">
                            <span onClick={()=>setEmailModal(false)} className="close">&times;</span>
                            <h2>Send Email</h2>
                        </div>
                    <div className="modal-body">
                      <div className="message">
                        <p><b>Enter Message :</b></p>
                        <textarea value={emailTemplate} onChange={(e)=>setEmailTemplate(e.target.value)} placeholder='Enter Message'></textarea>
                      </div>
                        </div>
                        <div className="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      <button onClick={()=>sendEmail()}>Send</button>
                        </div>
                    </div>

                </div>
                {/*Payment Modal */}
                <div id="paymentModal" className={`modal ${paymentModal?'show':''}`}>

                    <div className="modal-content">
                        <div className="modal-header">
                            <span onClick={()=>setPaymentModal(false)} className="close">&times;</span>
                            <h4>Received Payment</h4>
                        </div>
                    <div className="modal-body">
                      {balanceFlag?
                      <div className="received-payment">
                        {/* <p><b>Payment Method :</b></p> */}
                        {/* <span>
                          <input onChange={(e) => setPayMethod(e.target.value)} value='Cash'
                            id='cash' type="radio" name='payment' />
                          <label htmlFor='cash'>Cash</label>
                        </span>
                        <span>
                          <input onChange={(e) => setPayMethod(e.target.value)} value='Cheque'
                            id='cheque' type="radio" name='payment' />
                          <label htmlFor='cheque'>Cheque</label>
                        </span>
                        <span>
                          <input onChange={(e) => setPayMethod(e.target.value)} value='Bank Transfer'
                            id='banktransfer' type="radio" name='payment' />
                          <label htmlFor='banktransfer'>Bank Transfer</label>
                        </span>
                        <span>
                          <input onChange={(e) => setPayMethod(e.target.value)} value='Stripe'
                            id='stripe' type="radio" name='payment' />
                          <label htmlFor='stripe'>Stripe</label>
                        </span>
                        <span>
                          <input onChange={(e) => setPayMethod(e.target.value)} value='EFPOS'
                            id='efpos' type="radio" name='payment' />
                          <label htmlFor='efpos'>EFPOS</label>
                        </span> */}
                          <form onSubmit={(e) => updatePayment(e)}>
                        <span>
                          <label htmlFor='payment-option'><b>Paayment Method: </b></label>
                          <select required id='payment-option' onChange={(e) => setPayMethod(e.target.value)}>
                            <option value='' default>Please select payment option</option>
                            <option value='Cash'>Cash</option>
                            <option value='Cheque'>Cheque</option>
                            <option value='Bank Transfer'>Bank Transfer</option>
                            <option value='Stripe'>Stripe</option>
                            <option value='EFPOS'>EFPOS</option>
                          </select>
                        </span>
                        <span className='rec-payment-input'>
                          <label htmlFor='received-payment'><b>Value: </b></label>
                          <input required max={balanceAmount} min="0" onChange={(e) => setPayValue(parseFloat(e.target.value))} value={payValue}
                            id='received-payment' type="number" placeholder='Enter received value' />
          
                        </span>
                        {payValue === '' && payMethod==='' ? <></> :
                          <button type='submit'>Payment Received</button>}
                            </form>
                      </div>:<></>}
                      <div>
                        {paymentList.length === 0 ?<></>:
                          <table id="tblSearch" className="table table-hover nowrap my-3">
                            
                          <thead style={{ backgroundColor: "#00CED1" }} >
                            <tr>
                              <th className="first" style={{ width: '45%' }}>Date</th>
                              <th className="second" style={{ width: '25%' }}>Payment Method</th>
                              <th className="second" style={{ width: '15%' }}>Payment Received</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.selectedInvoice.paymentList.map((v, i) => 
                              <tr key={i}>
                                <td className="first" style={{ width: '45%' }}>{v.date.toLocaleString()}</td>
                                <td className="second" style={{ width: '25%' }}>{v.payMethod}</td>
                                <td className="second" style={{ width: '15%' }}>${v.payValue}</td>
                              </tr>
                            )}
                            
                            {/* <tr>
                              <td className="first" style={{ width: '25%' }}>03/02/2021</td>
                              <td className="second" style={{ width: '45%' }}>Cheque</td>
                              <td className="second" style={{ width: '15%' }}>$35</td>
                            </tr>
                            <tr>
                              <td className="first" style={{ width: '25%' }}>01/03/2021</td>
                              <td className="second" style={{ width: '45%' }}>Bank Transfer</td>
                              <td className="second" style={{ width: '15%' }}>$65</td>
                            </tr> */}
                            {/* {invoice.selectedInvoice.listItems.map((v, i) =>
                              <tr key={i}>
                                <td className="first">{v.longDescription}</td>
                                <td className="second" >${v.price}</td>
                              </tr>
                            )} */}

                          </tbody>
                        </table>}
                      </div>
                      <div className='amount-details'>
                        <div>
                          <p><b>Total Amount :</b></p>
                          <p>${totalPrice}</p>
                        </div>
                        <div>
                          <p><b>Paid Amount :</b></p>
                          <p>${paidAmount}</p>
                        </div>
                        <div>
                          <p><b>Balance Amount :</b></p>
                          <p>${totalPrice-paidAmount}</p>
                        </div>
                      </div>
                    </div>
                        <div className="modal-footer">
                      {/* <h3>Modal Footer</h3> */}
                      {/* <button>Send</button> */}
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

