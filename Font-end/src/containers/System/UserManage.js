import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  edituserService,
} from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModelUser: false,
      isOpenModelEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromNodejs();

    //console.log("getuser from api", response);
  }

  // use -1 componentDisMount
  getAllUserFromNodejs = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModelUser: true,
    });
  };

  toggleUserMNodel = () => {
    this.setState({
      isOpenModelUser: !this.state.isOpenModelUser,
    });
  };
  toggleUserEditMNodel = () => {
    this.setState({
      isOpenModelEditUser: !this.state.isOpenModelEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromNodejs();
        this.setState({
          isOpenModelUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODEL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUserFromNodejs();
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = async (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenModelEditUser: true,
      userEdit: user,
    });
  };
  ProcesshandleEditUser = async (user) => {
    try {
      let response = await edituserService(user);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenModelEditUser: false,
        });
        await this.getAllUserFromNodejs();
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /***  Life Cycle
   * Run components
   * 1. Run  construct -> init state
   * 2. Did mount
   * 3. Render
   *
   *
   *
   *
   ****/

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModelUser}
          toggleFromParent={this.toggleUserMNodel}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModelEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModelEditUser}
            toggleFromParent={this.toggleUserEditMNodel}
            currentUser={this.state.userEdit}
            EditUser={this.ProcesshandleEditUser}
          />
        )}
        <div className="title text-center">Manage users with Souma</div>
        <div className="mx-2">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <React.Fragment key={item.id}>
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt "></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
