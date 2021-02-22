import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginScreen(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const submitHandler = async () => {
  try {
    const { data } = await axios.post('https://resume-maker1.herokuapp.com/api/users/signin/', { userName: "Shayan", password: 1234 });
    console.log("loggedIn User==>", data);
    // localStorage.setItem('userInfo', JSON.stringify(data));
    history.push("/dashboard");
    } catch (err) {
    console.log("Error==>", err);
    }
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
          <div id="dvMsg" className="success" style={{ display: 'block' }}>Lead details saved successfully.
          </div>         
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
    );
  }
export default LoginScreen;