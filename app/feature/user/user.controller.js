const logger = require("app/lib/logger");
const Model = require("app/model").users;

module.exports = {
  index: async (req, res, next) => {
    try {
      let result = await Model.findAll({
        attributes: ['id', 'user_name', 'address'],
        raw: true
      });
      return res.ok(result);
    }
    catch (err) {
      logger.error('get users:', err);
      next(err);
    }
  }
}
