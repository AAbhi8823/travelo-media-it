const router= require('express').Router();

const portfolio_controller = require('../controllers/portfolio.controllers');


//routes

router.post('/add-portfolio/:web_id',portfolio_controller.add_portfolio);
router.put('/update-portfolio/:web_id/:portfolio_id',portfolio_controller.update_portfolio);

module.exports = router;