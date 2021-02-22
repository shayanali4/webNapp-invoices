function  InvoicesScreen (props) {
    return (
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i className="fa fa-bars" aria-hidden="true" />
                  &nbsp;Invoices
                </h2>
                <h3 id="dvResellerName" >
                  Invoice list
                </h3>
                <div className="page_single layout_fullwidth_padding">
                  <div id="dvMsg" className="success" style={{display: 'none'}}>Lead details saved successfully.<a onclick="$('#dvMsg').hide();"><img src="images/icons/black/menu_close.png" style={{width: '8%', display: 'inline', float: 'right', marginTop: '-2px'}} /></a>
                  </div>
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
                    </li>
                  </ul>
                </div>
              </div>
    );
  }
    export default InvoicesScreen;