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

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onClickRegister = () => {
    let payload = {
      username: username,
      email: email,
      password: password
    };
    if (
      payload.username !== "" &&
      payload.email !== "" &&
      payload.password !== ""
    ) {
      if (password === confirmPassword) {
        axios.post("http://localhost:7000/user/register", payload).then(res => {
          console.log(res);

          if (res.data.status === 200) {
            toast.success("Registration Successful !", {
              position: toast.POSITION.TOP_CENTER
            });
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else {
            toast.error("Something went wrong  !", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        });
      } else {
        toast.error("Confirm password did't matched  !", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } else {
      toast.error("All fields are mandetory !", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <Base>
    <MDBContainer>
      <MDBRow className={classes.justifyCenter}>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Sign up</p>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Username
            </label>
            <input
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
              Email
            </label>
            <input
              type="email"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label
              htmlFor="defaultFormRegisterPasswordEx"
              className="grey-text"
            >
              Password
            </label>
            <input
              type="password"
              id="defaultFormRegisterConfirmEx"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <label
              htmlFor="defaultFormRegisterConfirmPasswordEx"
              className="grey-text"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="defaultFormRegisterPasswordEx"
              className="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <div className="text-center mt-4">
              <MDBBtn color="primary" onClick={onClickRegister}>
                Register
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

export default Register;
