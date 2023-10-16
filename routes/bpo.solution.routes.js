const router = require('express').Router();

const bpo_controller = require('../controllers/bposolution.controllers');


//routes for bpo solutions
router.post('/add-bpo-solutions/:web_id', bpo_controller.add_bpo_solutions);
router.put('/update-bpo/website/:web_id/bpo/:bpo_id', bpo_controller.update_bpo_solutions);
router.get('/get-list-bpo-solutions/:web_id', bpo_controller.get_all_bpo_solutions);
router.get('/get-bpo-solution/:web_id/:bpo_id', bpo_controller.get_bpo_solutions);
router.delete('/delete-bpo-solution/:web_id/:bpo_id', bpo_controller.delete_bpo_solutions);



module.exports = router;
