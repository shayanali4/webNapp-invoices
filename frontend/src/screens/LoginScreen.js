import { useHistory } from "react-router-dom";

function LoginScreen(props) {
  const history = useHistory();

  const submitHandler = () => {
    history.push("/dashboard");
  }
    return (
      <div id="pages_maincontent">
        <h2 className="page_title" >
          <i className="fa fa-sign-in" aria-hidden="true" />
            &nbsp;Login Page
        </h2>
        <h3 id="dvResellerName" >
          Login here
        </h3>
        <div className="page_single layout_fullwidth_padding">
          <div id="dvMsg" className="success" style={{ display: 'none' }}>Lead details saved successfully.
            <a onclick="$('#dvMsg').hide();">
              <img src="images/icons/black/menu_close.png" style={{ width: '8%', display: 'inline', float: 'right', marginTop: '-2px' }} />
            </a>
          </div>         
          <div className="contactform" id="dvform">
            <div className="form_row">
              <label>Email: </label>
              <input type="email" name="email" id="Email" defaultValue placeholder="Enter Your Email" className="form_input required" />
            </div>
            <div className="form_row">
              <label>Password: </label>
              <input type="password" name="password" id="Password" defaultValue placeholder="Enter Your Password" className="form_input required" />
            </div>
            <input onClick={()=>submitHandler()} type="button" id="submit" name="submit" className="form_submit" defaultValue="Login" />
          </div>
        </div>
      </div>
    );
  }
export default LoginScreen;