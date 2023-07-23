import express from "express";
import HomeController from "../controller/HomeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", HomeController.getHomePage);
  router.get("/crud", HomeController.getCRUD);
  router.post("/post-crud", HomeController.postCRUD);
  router.get("/get-crud", HomeController.displaygetCRUD);
  router.get("/edit-crud", HomeController.getEditCRUD);
  router.post("/put-crud", HomeController.putCRUD);
  router.get("/delete-crud", HomeController.deleteCRUD);

  //  start to use REST API
  //1.  api login
  router.post("/api/login", userController.handleLogin);
  //2. api get all users
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  //3. create a user
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  //4. edit user
  router.put("/api/edit-user", userController.handleEditUser);
  //5. delete user
  router.delete("/api/delete-user", userController.handleDeleteUser);
  //6.get all code
  router.get("/api/allcode", userController.getAllCode);
  // 7 . get top doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  //8. get all doctor
  router.get("/api/get-all-doctors", doctorController.getAllDoctor);
  // 9.save infor doctor
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  // 10. get all detail doctyor
  router.get(
    "/api/get-detail-docter-by-id",
    doctorController.getDetailDocterbyId
  );
  // 11. create bulk docter schedule
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  //12. get schedul;edoctor
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getSchedulebyDate
  );
  // 14.extra information
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  // 15.get profile-doctor
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  //16. get paitenbtbooign appointment
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );

  // 17. verify appointment
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookingAppointment
  );
  // 18. create new specilaty
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  // 19. /api/get-specialty
  router.get("/api/get-specialty", specialtyController.getSpecialty);
  //20. get list paitent for doctor
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  // 21. send remedy     sendRemedy
  router.post("/api/send-remedy", doctorController.sendRemedy);

  //22.  create clinic
  router.post("/api/create-new-clinic", clinicController.createClinic);

  // 24. sepcialty id
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtybyId
  );
  // 25. get all clinic
  router.get("/api/get-clinic", clinicController.getAllClinic);
  // 26. get detail clinic
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicbyID
  );
  // home
  return app.use("/", router);
};

//module.export = initWebRoute;
export default initWebRoute;
