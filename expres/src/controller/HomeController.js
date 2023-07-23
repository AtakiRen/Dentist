import { render } from "ejs";
import db from "../models/index";
import CRUDService from "../services/CRUDService";
import user from "../models/user";
// home page
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
// get CURD
let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let messsage = await CRUDService.createNewUsers(req.body);
  console.log(messsage);
  return res.send("Post information in server");
};
let displaygetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUsers();
  console.log("---------------------");
  console.log(data);
  console.log("---------------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInFoByID(userId);
    // check user data not found
    return res.render("editCRUD.ejs", { userData: userData });
  } else {
    return res.send("user not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;

  console.log(id);
  if (id) {
    await CRUDService.deleteUserbyId(id);
    return res.send("delete  user sucess");
  } else {
    return res.send("user not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displaygetCRUD: displaygetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
