const logger = require("app/lib/logger");
const Model = require("app/model").user_bettings;

module.exports = {
  index: async (req, res, next) => {
    try {
      let result = await Model.findAll({
        attributes: ['bet_spin', 'bet_unit', 'bet_win', 'bet_lost', 'bet_layout', 'number_win'],
        where: {
          user_id: req.params.user_id
        },
        raw: true
      });
      return res.ok(result);
    }
    catch (err) {
      logger.error('get users:', err);
      next(err);
    }
  },
  betting: async (req, res, next) => {
    try {
      let data = {
        bet_unit: req.body.bet_layout.length,
        bet_layout: req.body.bet_layout,
        user_id: req.params.user_id,
        bet_spin: req.body.spin
      }
      let betting = await Model.findOne({ 
        where: {
          user_id: req.params.user_id,
          bet_spin: req.body.spin
        }
      });
      if (betting) {
        await Model.update(data, {
          where: {
            user_id: req.params.user_id,
            bet_spin: req.body.spin
          }
        })
      } else {
        await Model.create(data);
      } 
      return res.ok(true);
    }
    catch (err) {
      logger.error('betting:', err);
      next(err);
    }
  }
}
