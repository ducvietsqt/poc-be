const express = require('express');
const controller = require('./user-betting.controller');
const router = express.Router();

router.get(
  '/:user_id/bettings',
  controller.index
); 

router.post(
  '/:user_id/bettings',
  controller.betting
);


module.exports = router;

/*********************************************************************/
/**
 * @swagger
 * /api/v1/users/{user_id}/bettings:
 *   get:
 *     summary: betting
 *     tags:
 *       - Users
 *     description: betting
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: integer
 *         format: int32
 *       - name: offset
 *         in: query
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
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
 *                    "items": [
 *                    {
                    bet_spin: 1,
                    bet_unit: 1,
                    bet_win: 0,
                    bet_lost: 1,
                    bet_layout: [15],
                    number_win: 16,
                    bet_tx_hash: '',
                    bet_success: true
                  }
              ],
              "offset": 0,
              "limit": 10,
              "total": 1
 *              }
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
 * /api/v1/users/{user_id}/bettings:
 *   post:
 *     summary: betting
 *     tags:
 *       - Users
 *     description: User
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: integer
 *         format: int32
 *       - in: body
 *         name: data
 *         description: Data for update.
 *         schema:
 *            type: object
 *            required:
 *            - user_id
 *            - spin
 *            - bet_layout
 *            example:
 *               {
                   "spin": 0,
                   "bet_layout": [1, 10, 15]
                 }
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": true
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
