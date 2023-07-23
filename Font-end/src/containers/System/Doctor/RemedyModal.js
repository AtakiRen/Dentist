import React, { Component } from "react";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  LANGUAGES,
  CRUD_ACTIONS,
  dateFormat,
  CommonUtils,
} from "../../../utils";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import _, { range } from "lodash";

import { saveBulkScheduleDoctor } from "../../../services/userService";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  hanleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log("list time: ", rangeTime);
    let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;
    return (
      <React.Fragment>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="md"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title text-center">
              Send invoice for Patient
            </h5>
            <button
              type="button"
              className="close"
              aria-label="close"
              onClick={closeRemedyModal}
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>

          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email Benh nhan</label>
                <input
                  className="fomr-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeEmail(event)}
                />
              </div>

              <div className="col-6 form-group">
                <label>Choose files prescription</label>
                <input
                  className="fomr-control-file"
                  type="file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.hanleSendRemedy()}>
              Send
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
