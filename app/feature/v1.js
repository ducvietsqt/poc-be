const express = require('express');
const router = express.Router();

router.use('/spins', require("./spin/spin.route"));
router.use('/users', require("./user/user.route"));
router.use('/users', require("./user-betting/user-betting.route"));

module.exports = router;
