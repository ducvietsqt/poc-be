/*eslint no-process-env: "off"*/
require('dotenv').config();
require('rootpath')();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3001;
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const database = require('app/lib/database');
const logger = require('app/lib/logger');
const config = require('app/config');
const Insight = require('app/service/poc-insight');
const Spin = require('app/model').spins;

const app = express();
app.use(morgan('dev'));

database.init(async err => {
  if (err) {
    logger.error(`database start fail:`, err);
    return;
  }

  require('app/model');
  database.instanse.sync({ force: false }).then(() => {
    logger.info('Resync data model and do not drop any data');
    require('app/model/seed');
  });

  app.set('trust proxy', 1);
  app.use('/', require('app/index'));
  app.use(express.static('public'));
  const server = http.createServer(app);
  server.listen(process.env.PORT, async function () {
    console.log(`server start successfully on port: ${process.env.PORT}`);
    var exec = require('child_process').exec;
    var cmd = 'npx sequelize-cli db:migrate';
    exec(cmd, function (error, stdout, stderr) {
      console.log('error', error);
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    })
    var current = await Insight.getCurrentSpin();
    console.log('current', current);
    var spin = await Insight.getSpin(current);
    console.log('spin', spin);
    if(!spin || spin.bankHash == '0x0000000000000000000000000000000000000000000000000000000000000000') {
      let tx = await Insight.setInitialBankHash(config.insight.secret);
      console.log('tx: ', tx);
      let spin = await Spin.findOne({
        where: {
          number: parseInt(current)
        }
      })
      if (spin) {
        await Spin.update({
          secret: config.insight.secret,
          start_tx_hash: tx
        }, {
          where: {
            number: current
          }
        })
      } else {
        await Spin.create({
          number: parseInt(current),
          secret: config.insight.secret,
          start_tx_hash: tx
        })
      }
    }
  });
  process.on('SIGINT', () => {
    process.exit(0);
  });
});

process.on('unhandledRejection', function (reason, p) {
  logger.error('unhandledRejection', reason, p);
});

process.on('uncaughtException', err => {
  logger.error('uncaughtException', err);
});
