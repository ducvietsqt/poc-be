const express = require('express');
const controller = require('./spin.controller');
const router = express.Router();

router.get(
  '/',
  controller.index
);

router.post(
  '/',
  controller.nextSpin
);

router.get(
  '/:number',
  controller.getSpin
);


module.exports = router;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/spins:
 *   get:
 *     summary: Spin
 *     tags:
 *       - Spins
 *     description: Spin
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": 10
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

 /**
 * @swagger
 * /api/v1/spins/{number}:
 *   get:
 *     summary: Spin
 *     tags:
 *       - Spins
 *     description: Spin
 *     parameters:
 *       - name: number
 *         in: path
 *         required: true
 *         type: integer
 *         format: int32
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
 *                  "number": 35,
 *                  "start_tx_hash": "",
 *                  "end_tx_hash": ""  
 *                }
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

 /**
 * @swagger
 * /api/v1/spins:
 *   post:
 *     summary: Spin
 *     tags:
 *       - Spins
 *     description: Spin
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": 10
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */



