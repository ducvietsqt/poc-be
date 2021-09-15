const Model = require("app/model").spins;

module.exports = async () => {
  let count = await Model.count();
  if (count == 0) {
    await Model.create({
      number: 0,
      secret: 4
    }, {
      returning: true
    });
  }
};