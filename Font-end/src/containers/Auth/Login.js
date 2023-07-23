import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { push } from "connected-react-router";
// import { loginUserWithGoogle } from "../../context/authAction";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./login.scss";
import { FormattedMessage } from "react-intl";
import handleLoginApi from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      redirectToDashboard: false,
    };
  }

  // google sign in
  // handleGoogleSignIn = async () => {
  //   try {
  //     await this.props.loginUserWithGoogle();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // end

  // call function check login
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    // start
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
    //end
  };
  // end call login

  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    // const { user, isLoggedIn } = this.props;
    // if (isLoggedIn) {
    //   return <Redirect to="/home" />; // Redirect to "/dashboard" if isLoggedIn is true
    // }
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12  text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>UserName:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassWord(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowPassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "far fa-eye-slash "
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your passdword</span>
            </div>
            <div className="col-12 text-center mt-4">
              <span className="text-other-login">Or Login with</span>
            </div>
            <div className="col-12 social-login">
              {/* <button onClick={() => this.handleGoogleSignIn()}>
                Login with google
              </button> */}
              <button style={{ border: "none" }}>
                <i className="fab fa-google-plus-g google"></i>
              </button>
              {/* <i className="fab fa-google-plus-g google"></i> */}
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // user: state.user,
    // isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // googleSignIn: () => dispatch(googleSignIn()),
    // loginUserWithGoogle,
    navigate: (path) => dispatch(push(path)),

    //   userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
