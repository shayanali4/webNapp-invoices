import React, { useRef } from "react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import GenerateInvoice from "../screens/GenerateInvoice/GenerateInvoice";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        {/* <div style={{ fontSize: "40px", color: "green" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium
          viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Eu
          lobortis elementum nibh tellus. Urna molestie at elementum eu
          facilisis sed odio morbi quis. Et molestie ac feugiat sed lectus
          vestibulum mattis ullamcorper. Ut tellus elementum sagittis vitae et.
          Leo urna molestie at elementum. Vestibulum rhoncus est pellentesque
          elit ullamcorper dignissim. Sollicitudin nibh sit amet commodo nulla
          facilisi. Amet luctus venenatis lectus magna. Ultricies integer quis
          auctor elit sed vulputate mi.
        </div>
        <div style={{ color: "blue" }}>
          Characteristics of active learning 1. You look for ways of being more
          involved in what you are learning. 2. You are engaged in the whole
          learning process (and in a position to see why information has been
          selected). 3. You look for links between different things that you
          discover. 4. You make a conscious effort to make sense of, and find
          meaning in, what you learn. Understanding is usually deeper. 5. You
          are involved in reflection and self-evaluation. 6. Your attention span
          is longer because your mind is more fully engaged. 7. Long-term memory
          is assisted. If you understand what you learn, and keep relating what
          you learn to what you already know, you are more likely to remember
          what you have learnt. 8. Linking information helps you to see how you
          can apply it to different situations. 9. Learning is personalised and
          interesting.
        </div>
        <img
          width="100%"
          src="https://honglytech.com/wp-content/uploads/2020/06/laptop-coffee-arm-1205256.jpg"
        alt="" /> */}
<div>
            <div class="view view-main">
                <div class="pages">
                    <div data-page="about" class="page">
                        <div class="page-content">
                            <div id="ctl04_dvpanel" class="container-fluid tab-pane">
                                <div class="second">
                                    <div class="dvMainInvoice">
                                        <section id="memo">
                                            <div>
                                                <img src="https://onlinepayment.webnapp.com.au/img/logo.jpeg" id="ctl04_logo" alt="logo" />
                                            </div>
                                                <div class="second">
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
                                        <div class="clearfix">
                                        </div>
                                        <div class="inv-details">
                                            <section class="invoice-section section">
                                                <div class="first">Invoice</div>
                                                <div class="second">
                                                    <span><b>Date: </b>
                                                        <span id="ctl04_lblDate">12/02/2021</span>
                                                    </span>
                                                </div>
                                                <div class="second">
                                                    <span><b>Invoice # </b>
                                                        <span id="ctl04_lblOrderNo">INV2265</span>
                                                    </span>
                                                </div>
                                            </section>
                                            <section class="invoice-section section">
                                                <div class="first">Customer Details</div>
                                                <div>
                                                    <span class="second">
                                                        <b>Company Name: </b>
                                                        <span>XZ Exports</span>
                                                    </span></div>
                                                <div><span class="second">
                                                    <b>Name: </b>
                                                    <span>Shayan Ali</span>
                                                </span></div>
                                                <div><span class="second">
                                                    <b>Email: </b><span id="ctl04_lblClientEmail">shayanali4@live.com</span></span></div><div><span class="second"><b>Phone: </b><span id="ctl04_lblClientPhone">54241422425</span></span></div><div><span class="second"><b>ABN: </b><span id="ctl04_lblClientABN">564454548864</span></span></div></section></div><div class="clearfix"></div><div class="below"><div><span id="ctl04_lblGST" >GST is included in the quote* </span><span>    prices are in AUD</span></div></div><section class="items"><table id="tblSearch" class="table table-hover nowrap"><thead ><tr><th class="first" ><div >Description</div></th><th class="second" ><div >Price</div></th></tr></thead><tbody><tr><td class="first">this is long description</td><td class="second">$85</td></tr><tr><td class="first">this is long description</td><td class="second">$85</td></tr><tr><td class="first">this is long description</td><td class="second">$85</td></tr></tbody></table></section><section class="sums"><table class="first1 "><tbody class=" mob"><tr class="amount-total  mob"><td class="second">Total: $<span id="ctl04_lblTotalAmount">255</span></td></tr><tr id="ctl04_gstpanel" class="amount-total"><td class="second">GST: $<span id="ctl04_lblGSTAmount">23.18</span></td></tr><tr class="amount-total"><td class="third">Amount Paid: $<span id="ctl04_lblPaidAmount">100</span></td></tr><tr class="amount-total"><td class="third">Balance Amount: $<span id="ctl04_lblBalanceAmount">155</span></td></tr></tbody></table><div class="payment-info"></div></section><br /><a class="download-btn" href="/pdf">CLICK HERE TO DOWNLOAD YOUR INVOICE</a><br /><br /><section><div class="paywithstripe"><p>Would you like to pay using your Debit/Credit Card?</p><div><span><input id="pay-yes" type="radio" name="pay-now" value="yes" /><label for="pay-yes">Yes</label></span><span><input id="pay-no" type="radio" name="pay-now" value="no" checked="" /><label for="pay-no">No</label></span></div></div></section><br /><section class="admin-use"><h4>For Admin Use Only</h4><p>Send directly to your customer</p><div class="send"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#smsModal">Send SMS</button><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#emailModal">Send Email</button><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#paymentModal">Received Payment</button></div><div id="smsModal" class="modal "><div class="modal-content"><div class="modal-header"><span class="close">×</span><h2>Send SMS</h2></div><div class="modal-body"><div class="bitly"><p><b>Bitly Url :</b></p><button>Generate Url</button></div></div><div class="modal-footer"><button>Send</button></div></div></div><div id="emailModal" class="modal "><div class="modal-content"><div class="modal-header"><span class="close">×</span><h2>Send Email</h2></div><div class="modal-body"><div class="message"><p><b>Enter Message :</b></p><textarea placeholder="Enter Message"></textarea></div></div><div class="modal-footer"><button>Send</button></div></div></div><div id="paymentModal" class="modal "><div class="modal-content"><div class="modal-header"><span class="close">×</span><h4>Received Payment</h4></div><div class="modal-body"><div class="received-payment"><form><span><label for="payment-option"><b>Paayment Method: </b></label><select required="" id="payment-option"><option value="" default="">Please select payment option</option><option value="Cash">Cash</option><option value="Cheque">Cheque</option><option value="Bank Transfer">Bank Transfer</option><option value="Stripe">Stripe</option><option value="EFPOS">EFPOS</option></select></span><span class="rec-payment-input"><label for="received-payment"><b>Value: </b></label><input required="" max="155" min="0" id="received-payment" type="number" placeholder="Enter received value" value="" /></span></form></div><div><table id="tblSearch" class="table table-hover nowrap my-3"><thead ><tr><th class="first" >Date</th><th class="second" >Payment Method</th><th class="second" >Payment Received</th></tr></thead><tbody><tr><td class="first" >11/3/2021 , 10:56 am</td><td class="second" >Cash</td><td class="second" >$50</td></tr><tr><td class="first" >12/3/2021 , 12:12 pm</td><td class="second" >Cash</td><td class="second" >$50</td></tr></tbody></table></div><div class="amount-details"><div><p><b>Total Amount :</b></p><p>$255</p></div><div><p><b>Paid Amount :</b></p><p>$100</p></div><div><p><b>Balance Amount :</b></p><p>$155</p></div></div></div><div class="modal-footer"></div></div></div></section>

                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
      </div>
    );
  }
}

const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default Example;
// render(<Example />, document.querySelector("#root"));