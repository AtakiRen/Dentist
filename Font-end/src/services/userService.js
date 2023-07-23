import axios from "../axios";

const handleLoginApi = (email, password) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Set the appropriate origin or whitelist specific origins instead of '*'
  };

  const data = { email, password };

  return axios.post("/api/login", data, { headers });
};

export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
export const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

export const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
export const edituserService = (inputdata) => {
  return axios.put("/api/edit-user", inputdata);
};

export const getAllCodeService = (InputType) => {
  return axios.get(`/api/allcode?type=${InputType}`);
};

export const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctor = () => {
  return axios.get("/api/get-all-doctors");
};

export const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};

export const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-docter-by-id?id=${inputId}`);
};

export const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

export const getScheduleDoctorbyDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
export const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
export const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

export const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
export const getAllSpecialty = () => {
  return axios.get("/api/get-specialty");
};
export const getPatientforDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
export const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
export const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
export const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
export const getAllClinic = () => {
  return axios.get("/api/get-clinic");
};
export const getDetailClinicByID = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
export default handleLoginApi;
