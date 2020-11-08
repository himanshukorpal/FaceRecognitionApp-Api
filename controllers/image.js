const clarifai = require("clarifai");
const { response } = require("express");

const app = new Clarifai.App({
  apiKey: "61b24568d3574a27bc32ca71e78cc235",
});
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to find entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
