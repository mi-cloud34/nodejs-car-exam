
const httpStatus = require("http-status");
const Service = require("../services/Model");
const modelService = new Service();
const create = (req, res) => {
    req.body.userId=req.user
    modelService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };
  const index = (req, res) => {
    modelService
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