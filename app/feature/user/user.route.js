const express = require('express');
const controller = require('./user.controller');
const router = express.Router();

router.get(
  '/',
  controller.index
);


module.exports = router;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: User
 *     tags:
 *       - Users
 *     description: User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": [
 *                    {
 *                  id: 1,
                    user_name: 'User A',
                    address: '0x8B9Df472d81EE6010C9C2d093e2c6b3f7bD6EfEf'
                  },
                  { 
                    id: 2,
                    user_name: 'User B',
                    address: '0x4D8e6e6E0a02B32555047c91708c179177369b05'
                  },
                  {
                    id: 3,
                    user_name: 'User C',
                    address: '0x6c01eB96c7bf59eABa757f67C91Ff69837A18258'
                  },
                  {
                    id: 4,
                    user_name: 'User D',
                    address: '0x7aac55A07792F93205FD14cbaf14407a8f327F96'
                  }
 *              ]
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
