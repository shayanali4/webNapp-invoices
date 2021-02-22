
import {Link} from 'react-router-dom'
function DashboardScreen () {
    return (
       
          
                  <div id="pages_maincontent" >
                    <h2 className="page_title" >
                      <i className="fa fa-home" aria-hidden="true" />
                      &nbsp;Dashboard
                    </h2>
                    <h3 id="dvResellerName" >
                      What you want to do 
                    </h3>
                    <div className="page_single layout_fullwidth_padding">
                      <Link to="/create" className="homepage_button btn btn-primary btn-lg btn-block">
                        Create Invoice</Link>
                      <Link to="/invoices" className="homepage_button btn btn-primary btn-lg btn-block">
                        Invoices List
                      </Link>
                      <Link to="/services" className="homepage_button btn btn-primary btn-lg btn-block">
                        Services
                      </Link>
                      <Link to="/configuration" className="homepage_button btn btn-primary btn-lg btn-block">
                        Configuration
                      </Link>
                    </div>
                  </div>

    );
  }
export default DashboardScreen;