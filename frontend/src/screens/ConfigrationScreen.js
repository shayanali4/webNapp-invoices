// import { useHistory } from "react-router-dom";

import Header from "../components/Header";

function ConfigurationScreen(props) {
  // const history = useHistory();
    return (
      <>
        <Header />
      
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
                      <form>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Stripe Secret Key:</label>
                          <input type="key" placeholder="Enter Stripe Secret Key" className="input1" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="wrapper  wrapper1" id="wrapper">
                          <label htmlFor="yes_no_radio">GST Included</label>
                          <div >
                            <p >
                              <input  type="radio" name="yes_no" defaultChecked />Yes
                            </p> &ensp;
                            <p>
                              <input type="radio" name="yes_no" />No
                            </p>
                          </div>
                        </div>
                        <div className="form-group  from-group1">
                          <label htmlFor="exampleFormControlTextarea1">Invoice Footer:</label>
                          <textarea  className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group from-group1">
                          <label htmlFor="exampleFormControlTextarea1">Email Template</label>
                          <textarea  className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group from-group1">
                          <label style={{marginTop:"50px"}} htmlFor="exampleFormControlTextarea1">SMS Template</label>
                          <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
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
      </>
    );
  }

export default ConfigurationScreen;