const router = require('express').Router();

const preminum_controller = require('../controllers/preminum.controllers');

//create preminum service
router.post('/add-premium', preminum_controller.add_premium);
router.put('/update-premium/:premium_id', preminum_controller.update_premium);
router.get('/get-premium', preminum_controller.get_all_premium);


module.exports = router;