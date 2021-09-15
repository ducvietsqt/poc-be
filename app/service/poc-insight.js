const config = require('app/config');
const logger = require("app/lib/logger");
const axios = require('axios');
const api = axios.create({
  baseURL: config.insight.url,
  timeout: 2000
});

module.exports = {
  getCurrentSpin: async () => {
    try {
      let response = await api.get(`/api/current-round`);
      return response.data.round_id;
    }
    catch (err) {
      logger.error('get current spin fail:', err);
      return null;
    }
  },
  getSpin: async (spin) => {
    try {
      let response = await api.get(`/api/rounds/${spin}`);
      return response.data;
    }
    catch (err) {
      logger.error('get spin info fail:', err);
      return null;
    }
  },
  setInitialBankHash: async (secret) => {
    try {
      let response = await api.post(`/api/banks/hash`, {secret: secret});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('setInitialBankHash fail:', err);
      return null;
    }
  },
  sendBankSecretValueNewRound: async (secret, newSecret) => {
    try {
      let response = await api.post(`/api/banks/new-round`, {secret: secret, new_secret: newSecret});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('sendBankSecretValueNewRound fail:', err);
      return null;
    }
  },
  placeBet: async (bets, privateKey) => {
    try {
      let response = await api.post(`/api/bet`, {bets: bets, private_key: privateKey});
      return response.data.txHash;
    }
    catch (err) {
      logger.error('placeBet fail:', err);
      return null;
    }
  }
}