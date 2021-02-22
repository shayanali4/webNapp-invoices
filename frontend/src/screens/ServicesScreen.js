function ServicesScreen() {
    return (
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i className="fa fa-plus" aria-hidden="true" />
                  &nbsp;Invoice Services:
                </h2>
                <h3 id="dvResellerName" >
                  See Our services
                </h3>
                <div className="container-fluid1 container-fluid1">
                  <div className="row">
                    <div className="col-md-12 ">
                      <table style={{width: '100%', border: '1px solid'}}>
                        <tbody><tr >
                            <th >Short Descriptoin</th>
                            <th >Long Description</th>
                            <th >Price</th>
                          </tr>
                          <tr>
                            <td />
                            <td >test service - 1	</td>
                            <td style={{border: '1px solid'}}>$67.00</td>
                          </tr>
                          <tr>
                            <td  />
                            <td >test service - 2	</td>
                            <td >$14.00</td>
                          </tr>
                          <tr>
                            <td > Test service - 1
                            </td>
                            <td>This is the long description of test service - 1	</td>
                            <td >$17.00</td>
                          </tr>
                          <tr>
                            <td > Test service - 2
                            </td>
                            <td >This is the long description of test service - 2	</td>
                            <td >$48.00</td>
                          </tr>
                        </tbody></table>
                      <form>
                        <div className="form-group form-group1">
                          <label htmlFor="exampleFormControlTextarea1">Invoice Footer: &ensp;  &ensp;</label>
                          <textarea placeholder="Invoice Footer Details" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group form-group1">
                          <label htmlFor="exampleFormControlTextarea1">Service Short Description:</label>
                          <textarea placeholder="Service Short Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group form-group1">
                          <label htmlFor="exampleFormControlTextarea1">Service Long Description:</label>
                          <textarea placeholder="Service Long Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group form-group1">
                          <label htmlFor="exampleInputEmail1">Service Price:</label>
                          <input type="number" placeholder="Price" className="input1" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                      </form>
                    </div> 
                  </div> 
                </div> 
              </div>
    );
  }
export default ServicesScreen;