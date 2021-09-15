const logger = require("app/lib/logger");
const Model = require("app/model").user_bettings;
const User = require("app/model").users;
const Insight = require("app/service/poc-insight");


module.exports = {
  index: async (req, res, next) => {
    try {
      const offset = parseInt(req.query.offset) || 0;
      const limit = parseInt(req.query.limit) || 20;
      const { count: total, rows: bets } = await Model.findAndCountAll({
        attributes: ['bet_spin', 'bet_unit', 'bet_win', 'bet_lost', 'bet_layout', 'number_win', 'bet_tx_hash' ,'bet_success'],
        where: {
          user_id: req.params.user_id
        },
        offset,
        limit,
        order: [["bet_spin", "DESC"]]
      });
      return res.ok({
        items: bets,
        offset: offset,
        limit: limit,
        total: total
      });
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
      let user = await User.findOne({
        where: {
          id: req.params.user_id
        }
      })
      let tx = await Insight.placeBet(req.body.bet_layout, user.private_key);
      console.log(tx)
      if (!tx) {
        data.bet_status = false;
      } else {
        data.bet_tx_hash = tx;
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
