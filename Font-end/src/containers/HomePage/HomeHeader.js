import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import logo from "../../assets/images/bookingcare-2020.svg";
import { UserAuth } from "../../context/AuthContext";

//
class HomeHeader extends Component {
  static contextType = UserAuth;

  handleSignIn = () => {
    if (this.props.history) {
      this.props.history.push("/loginGoogle");
    }
  };
  changeLanguage = (language) => {
    // alert(language);
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  // handleLogout = () => {
  //   this.context.logout(); // Call the logout function from AuthContext
  // };
  render() {
    const { user, googleSignIn, logOut } = this.context;
    // const { user, logOut } = UserAuth();
    let language = this.props.language;
    console.log("user in hoem", user);

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="header-logo"
                src={logo}
                onClick={() => this.returnToHome()}
              />
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specialty" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.specialty" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.clinic" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.choosegooddoc" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.checkuppackage" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.generalhealthexamination" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
              <div className="avatar">
                {user ? (
                  // If user is logged in, show the avatar and logout button
                  <div className="user-avatar">
                    <img src={user.photoURL} alt="User Avatar" />
                    <button onClick={logOut}>Logout</button>
                  </div>
                ) : (
                  // If user is not logged in, show "Sign In" button
                  <button onClick={() => this.handleSignIn()}>Sign In</button>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="homebanner.medicalbackgorund" />
              </div>
              <div className="title2">
                <FormattedMessage id="homebanner.comprehesnsive" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.specializedexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.remoteexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.generalexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.medicaltest" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.mentalhealth" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homebanner.dentalexamination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
