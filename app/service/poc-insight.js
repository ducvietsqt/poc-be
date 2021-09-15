const config = require('app/config');
const logger = require("app/lib/logger");
const axios = require('axios');
// const api = axios.create({
//   baseURL: config.insight.url,
//   timeout: 2000
// });
const insightUrl = config.insight.url;

module.exports = {
  getCurrentSpin: async () => {
    try {
      let response = await axios.get(`${insightUrl}/api/current-round`);
      return response.data.round_id;
    }
    catch (err) {
      logger.error('get current spin fail:', err);
      return null;
    }
  },
  getSpin: async (spin) => {
    try {
      let response = await axios.get(`${insightUrl}/api/rounds/${spin}`);
      return response.data;
    }
    catch (err) {
      logger.error('get spin info fail:', err);
      return null;
    }
  },
  setInitialBankHash: async (secret) => {
    try {
      let response = await axios.post(`${insightUrl}/api/banks/hash`, {secret: secret});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('setInitialBankHash fail:', err);
      return null;
    }
  },
  sendBankSecretValueNewRound: async (secret, newSecret) => {
    try {
      let response = await axios.post(`${insightUrl}/api/banks/new-round`, {secret: secret, new_secret: newSecret});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('sendBankSecretValueNewRound fail:', err);
      return null;
    }
  },
  placeBet: async (bets, privateKey) => {
    try {
      let response = await axios.post(`${insightUrl}/api/bet`, {bets: bets, private_key: privateKey});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('placeBet fail:', err);
      return null;
    }
  }
}