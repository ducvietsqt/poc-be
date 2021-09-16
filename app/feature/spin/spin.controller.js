const logger = require("app/lib/logger");
const Model = require("app/model").spins;
const UserBetting = require("app/model").user_bettings;
const Insight = require("app/service/poc-insight");

module.exports = {
  index: async (req, res, next) => {
    try {
      let current = await Insight.getCurrentSpin();
      console.log('current: ', current)
      if (current) {
        return res.ok(parseInt(current));
      }
      let result = await Model.findAll({
        attributes: ['number'],
        order: [["number", "DESC"]],
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
        attributes: ['id', 'number', 'secret'],
        order: [["number", "DESC"]],
        raw: true
      });
      let secret = spins.length > 0 ? spins[0].secret : 4;
      let number = spins.length > 0 ? spins[0].number : 0;
      let newSecret = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
      let winNumber;
      console.log('secret: ', secret)
      let tx = await Insight.sendBankSecretValueNewRound(secret, newSecret);
      if (tx) {
        let spin = await Insight.getSpin(number);
        winNumber = spin && spin.isEnded && spin.winNumber ? parseInt(spin.winNumber) : null;
        // if (!winNumber) {
        //   let max = 36;
        //   let min = 0;
        //   winNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        // }
        if (winNumber) {
          let bettings = await UserBetting.findAll({ 
            where: {
              bet_spin: number
            },
            raw: true
          })
          for (let betting of bettings) {
            let betWin = betting.bet_layout.indexOf(winNumber) == -1 ? 0 : 1;
            let betLost = betting.bet_unit - betWin;
            await UserBetting.update({
              number_win: winNumber,
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
            end_tx_hash: tx
          }, {
            where: {
              id: spins[0].id
            }
          })
          await Model.create({
            number: number + 1,
            secret: newSecret,
            start_tx_hash: tx
          })
        }    
      }     
      return res.ok(winNumber);
    }
    catch (err) {
      logger.error('nextSpin fail:', err);
      next(err);
    }
  }
}
