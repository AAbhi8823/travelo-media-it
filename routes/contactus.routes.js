const router =require('express').Router();

const contactus_controller=require('../controllers/contactus.controllers')


//routes
router.post('/add-contact-us',contactus_controller.add_contact_us);
router.get('/get-contact-us/:web_id',contactus_controller.get_all_contact_us);
router.get('/get-contact-us-by-id/:web_id/:contact_us_id',contactus_controller.get_contact_us_by_id);




module.exports=router;
