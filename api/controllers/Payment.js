
const httpStatus = require("http-status");
const Service = require("../services/Payment");
const paymentService = new Service();
const create = (req, res) => {
    req.body.userId=req.user
    const {carId } = req.params;
  console.log(carId);

  if (!carId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "id bilgisi eksik" });
    paymentService.create({...req.body,carId})
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };
  const index = (req, res) => {
    paymentService
      .list()
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  };
  module.exports={
    create,
    index
  }