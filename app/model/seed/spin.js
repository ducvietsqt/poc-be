const Model = require("app/model").spins;
const config = require("app/config");

module.exports = async () => {
  let count = await Model.count();
  if (count == 0) {
    await Model.create({
      number: 0,
      secret: config.insight.secret
    }, {
      returning: true
    });
  }
};