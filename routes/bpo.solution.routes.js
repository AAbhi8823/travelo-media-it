const router = require('express').Router();

const bpo_controller = require('../controllers/bposolution.controllers');


//routes for bpo solutions
router.post('/add-bpo-solutions/:web_id', bpo_controller.add_bpo_solutions);




module.exports = router;
