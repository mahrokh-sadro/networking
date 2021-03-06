const mongoose = require("mongoose");

//check for a valid object id

const checkObjectId = (idToCheck) => (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ message: "Invalid ID" });
  next();
};

module.exports = checkObjectId;
