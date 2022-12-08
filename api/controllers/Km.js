
const httpStatus = require("http-status");
const Service = require("../services/Km");
const kmService = new Service();
const create = (req, res) => {
    req.body.userId=req.user
    kmService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };
  const index = (req, res) => {
    kmService
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