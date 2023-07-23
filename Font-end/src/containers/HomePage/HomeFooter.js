import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
class HomeFooter extends Component {
  render() {
    return (
      <div
        className="home-footer"
        style={{ background: "#64b9e5", padding: "20px" }}
      >
        <div className="content-left">
          <p>&copy;2023 Dentist Care by AtakiSouma.</p>
        </div>
        <div className="content-center">
          <p></p>
        </div>
        <div className="content-right">
          <p></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
