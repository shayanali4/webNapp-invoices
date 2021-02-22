import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginScreen(props) {
  const history = useHistory();
  let  user = localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user'))
      : null;
  if (user) {
    history.push("/dashboard");
  }
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = async () => {
  // try {
  //   const { data } = await Axios.post('https://resume-maker1.herokuapp.com/api/users/signin/', { userName: "Shayan", password: 1234 });
  //   console.log("loggedIn User==>", data);
  //   history.push("/dashboard");
  //   } catch (err) {
  //   console.log("Error==>", err);
  //   }
  Axios({
  method: 'post',
  url: 'https://resume-maker1.herokuapp.com/api/users/signin',
  data: {
    userName,
    password
  }
  }).then((success) => {
    user = success.data;
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    history.push("/dashboard");
  }).catch((err) => {
    console.log("error", err);
    setError(true);
  });
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
          {error ?
            <div id="dvMsg" className="danger" style={{ display: 'block' }}>Invalid email or password.
          </div>
            : <></> }         
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