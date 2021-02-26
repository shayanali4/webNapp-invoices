import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loadingbox from "../components/LoadingBox";
import { signin } from "../actions/userActions";
import MessageBox from "../components/MessageBox";
import Header from "../components/Header";

function LoginScreen(props) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;    
    
    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch(signin(userName, password));
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push('/dashboard');
        }
    }, [props.history, userInfo]);
  return (
    <>
      <Header />
        <div id="pages_maincontent">
          <h2 className="page_title" >
            <i className="fa fa-sign-in" aria-hidden="true" />
              &nbsp;Login Page
          </h2>
          <h3 id="dvResellerName" >
            Login here
          </h3>
          <div className="page_single layout_fullwidth_padding">
            {/* {error ?
              <div id="dvMsg" className="danger" style={{ display: 'block' }}>Invalid email or password.
            </div>
              : <></> }          */}
            {loading && <Loadingbox/>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="contactform" id="dvform">
              <div className="form_row">
                <label>UserName: </label>
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter Your Username" className="form_input required" />
              </div>
              <div className="form_row">
                <label>Password: </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" className="form_input required" />
              </div>
              <input onClick={()=>submitHandler()} type="button" id="submit" name="submit" className="form_submit" defaultValue="Login" />
            </div>
          </div>
        </div>
      </>
    );
  }
export default LoginScreen;