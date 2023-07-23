import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./DetailDoctor.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import { getDetailInforDoctor } from "../../../services/userService";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctors: {},
      currentDoctorId: -1,
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctors: res.data,
        });
      }
    }
  }

  render() {
    console.log("helo detail doctor", this.state);
    let { language } = this.props;
    let { detailDoctors } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctors && detailDoctors.positionData) {
      nameVi = `${detailDoctors.positionData.valueVi}, ${detailDoctors.lastName}`;
      nameEn = `${detailDoctors.positionData.valueVi}, ${detailDoctors.firstName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctors && detailDoctors.image
                    ? detailDoctors.image
                    : ""
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctors &&
                  detailDoctors.Markdown &&
                  detailDoctors.Markdown.description && (
                    <span>{detailDoctors.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctors &&
              detailDoctors.Markdown &&
              detailDoctors.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctors.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
