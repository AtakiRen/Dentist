"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "soumaAd@gmail.com",
        password: "12345678",
        firstName: "Ataki",
        lastName: "Souma",
        address: "Tokyo-Japan",
        gender: "1",
        image: "",
        roleId: "R1",
        positionId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
