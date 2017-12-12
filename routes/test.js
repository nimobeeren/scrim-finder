const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
	res.send("Hello world!");
});

module.exports = router;
