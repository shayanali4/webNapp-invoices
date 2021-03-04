// import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsInfo, updateSettings } from "../actions/invoiceActions";
import Header from "../components/Header";

function ConfigurationScreen(props) {
  
  const settingsInfo = useSelector((state) => state.settingsInfo);
  const { settings } = settingsInfo;

  
  // console.log('Settings', settings);
  
  const [stripeKey, setStripeKey] = useState(settings.stripeKey);
  const [invoiceFooter, setInvoiceFooter] = useState(settings.invoiceFooter);
  const [emailTemplate, setEmailTemplate] = useState(settings.emailTemplate);
  const [smsTemplate, setSmsTemplate] = useState(settings.smsTemplate);
  
  
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getSettingsInfo());
    
  // }, [dispatch]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSettings(stripeKey,invoiceFooter,emailTemplate,smsTemplate));
  }
    return (
      <>
        <Header />
        {settingsInfo.settings ?

          <div id="pages_maincontent">
            <h2 className="page_title page1" >
              <i onClick={props.history.goBack} class="fa fa-chevron-left back-ico" aria-hidden="true"></i>

              <i class="fa fa-cog" aria-hidden="true"></i>
                  &nbsp; Configuration
                </h2>
            <h3 id="dvResellerName" >
              Make changes here
                </h3>
            <div className="container-fluid1 container-fluid">
              <div className="row">
                <div className="col-md-12 main123 ">
                  <form onSubmit={(e)=>submitHandler(e)}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Stripe Secret Key:</label>
                      <input value={stripeKey} onChange={(e)=>setStripeKey(e.target.value)} type="key" placeholder="Enter Stripe Secret Key" className="input1" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    {/* <div className="wrapper  wrapper1" id="wrapper">
                      <label htmlFor="yes_no_radio">GST Included</label>
                      <div >
                        <p >
                          <input type="radio" name="yes_no" defaultChecked />Yes
                            </p> &ensp;
                            <p>
                          <input type="radio" name="yes_no" />No
                            </p>
                      </div>
                    </div> */}
                    <div className="form-group from-group1">
                      <label htmlFor="exampleFormControlTextarea1">Invoice Footer:</label>
                      <textarea value={invoiceFooter} onChange={(e) => setInvoiceFooter(e.target.value)}
                        className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <div className="form-group from-group1">
                      <label htmlFor="exampleFormControlTextarea1">Email Template</label>
                      <textarea value={emailTemplate} onChange={(e) => setEmailTemplate(e.target.value)}
                        className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <div className="form-group from-group1">
                      <label style={{ marginTop: "50px" }} htmlFor="exampleFormControlTextarea1">SMS Template</label>
                      <textarea value={smsTemplate} onChange={(e) => setSmsTemplate(e.target.value)}
                        className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="page_single layout_fullwidth_padding">
                 
              <div className="contactform" id="dvform">
                {/* Add form here */}
              </div>
            </div>
          </div>
          : <></>}
      </>
    );
  }

export default ConfigurationScreen;