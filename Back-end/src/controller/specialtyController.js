import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Errorr form server",
    });
  }
};
let getSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Errorr form server",
    });
  }
};

let getDetailSpecialtybyId = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtybyId(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Errorr form server",
    });
  }
};

module.exports = {
  createSpecialty: createSpecialty,
  getSpecialty: getSpecialty,
  getDetailSpecialtybyId: getDetailSpecialtybyId,
};
