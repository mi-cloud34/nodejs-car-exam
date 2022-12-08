
const httpStatus = require("http-status");
const Service = require("../services/Year");
const yearService = new Service();
const create = (req, res) => {
    req.body.userId=req.user
    yearService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };
  const index = (req, res) => {
    yearService
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