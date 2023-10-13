const router =require('express').Router();
const service_controller=require('../controllers/services.controllers')

//service routes
router.post('/add-service',service_controller.add_service);
router.post('/add-sub-service',service_controller.add_sub_service);
router.get('/get-services/:web_id',service_controller.get_all_services);
router.put('/update-service',service_controller.update_service);


module.exports=router;
