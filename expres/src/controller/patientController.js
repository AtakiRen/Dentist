import patientSevice from "../services/patientService";
let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientSevice.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Errorr form server",
    });
  }
};

let postVerifyBookingAppointment = async (req, res) => {
  try {
    let infor = await patientSevice.postVerifyBookingAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Eror form server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookingAppointment: postVerifyBookingAppointment,
};
