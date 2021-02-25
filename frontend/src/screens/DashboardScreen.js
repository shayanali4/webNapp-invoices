
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { signout } from '../actions/userActions';
import Header from '../components/Header';
function DashboardScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;    
  const dispatch = useDispatch();

  const signoutHandler = () => {
        dispatch(signout());
  }

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/');
    }
    }, [props.history, userInfo]);
  return (
    <>   
    <Header />   
    <div id="pages_maincontent" >
      <div className="log">
        <h2 className="page_title" >
          <i className="fa fa-home" aria-hidden="true" />
          &nbsp;Dashboard 
        </h2>
      <i onClick={()=>signoutHandler()} class="fa fa-sign-out" aria-hidden="true"></i>
      </div>
      {userInfo ?
      <h3 id="dvResellerName" >
          Welcome {userInfo.userName}
        </h3> :
        <></>}          
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
    </>
    );
  }
export default DashboardScreen;