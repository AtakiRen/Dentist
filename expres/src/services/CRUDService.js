import bcrypt from "bcrypt";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
let createNewUsers = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordformBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordformBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("creat new user successfully");
    } catch (e) {
      reject(e);
    }
  });
};

// fucntionm hash passwsord
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassword = await bcrypt.hashSync(password, salt);
      resolve(hashpassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInFoByID = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserbyId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        resolve(); // return
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUsers: createNewUsers,
  getAllUsers: getAllUsers,
  getUserInFoByID: getUserInFoByID,
  updateUserData: updateUserData,
  deleteUserbyId: deleteUserbyId,
};
