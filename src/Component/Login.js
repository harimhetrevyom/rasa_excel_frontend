import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Base from '../Base'


const useStyles = makeStyles(theme => ({
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5%"
  }
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(null)

  const onClickLogin = () => {
    let payload = {
      email: email,
      password: password
    };

    axios.post("http://localhost:7000/user/login", payload).then(res => {
      if (res.data.status === 200) {
        setUsername(res.data.username)
        setIsLogged(true);
        localStorage.setItem('loginData', JSON.stringify(res.data.data))
        localStorage.setItem('isLogged', true)
        history.push('/RasaPredictor')
      } else {
        toast.error("Email or Password is incorrect !", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  };

  return (
    <Base>
    <MDBContainer>
      <MDBRow className={classes.justifyCenter}>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Your password
            </label>
            <input
              type="password"
              id="defaultFormLoginPasswordEx"
              className="form-control"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="text-center mt-4">
              <MDBBtn color="primary" onClick={onClickLogin}>
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  </Base>
  );
};

export default Login;
