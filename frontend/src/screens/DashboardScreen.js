
import {Link, useHistory} from 'react-router-dom'
function DashboardScreen() {
  const history = useHistory();
  let  user = localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user'))
      : null;
  if (!user) {
    history.push("/");
  }

  const signout = () => {
    localStorage.removeItem('user');
    user = null;
    history.push("/");
  };
  return (
       
          
    <div id="pages_maincontent" >
      <div className="log">
                    <h2 className="page_title" >
                      <i className="fa fa-home" aria-hidden="true" />
                      &nbsp;Dashboard 
                    </h2>
      <i onClick={()=>signout()} class="fa fa-sign-out" aria-hidden="true"></i>
</div>
                    <h3 id="dvResellerName" >
                      Welcome {user.userName}
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