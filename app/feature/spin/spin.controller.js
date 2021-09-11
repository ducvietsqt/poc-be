const logger = require("app/lib/logger");
const Model = require("app/model").spins;
const UserBetting = require("app/model").user_bettings;

module.exports = {
  index: async (req, res, next) => {
    try {
      let result = await Model.findAll({
        attributes: ['number'],
        raw: true
      });
      return res.ok(result.length > 0 ? result[0].number : 0);
    }
    catch (err) {
      logger.error('get current spin:', err);
      next(err);
    }
  },
  nextSpin: async (req, res, next) => {
    try {
      let spins = await Model.findAll({
        attributes: ['id', 'number'],
        raw: true
      });
      let number = spins.length > 0 ? spins[0].number : 0;
      let max = 36;
      let min = 0;
      let number_win = Math.floor(Math.random() * (max - min + 1)) + min;
      let bettings = await UserBetting.findAll({ 
        where: {
          bet_spin: number
        },
        raw: true
      })
      for (let betting of bettings) {
        let betWin = betting.bet_layout.indexOf(number_win) == -1 ? 0 : 1;
        let betLost = betting.bet_unit - betWin;
        await UserBetting.update({
          number_win: number_win,
          bet_win: betWin,
          bet_lost: betLost
        },
        {
          where: {
            id: betting.id
          }
        })
      }
      await Model.update({
        number: number + 1
      }, {
        where: {
          id: spins[0].id
        }
      })
      return res.ok(number + 1);
    }
    catch (err) {
      logger.error('get current spin:', err);
      next(err);
    }
  }
}
