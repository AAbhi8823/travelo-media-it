const router =require("express").Router();

const faqs_controllers=require("../controllers/faqs.controllers");


//routes for faqs
router.post("/add-faqs/:web_id",faqs_controllers.add_faqs);
//router.get("/get-faqs/:web_id",faqs_controllers.get_faqs);
router.put("/update-faqs/:web_id/:faqs_id",faqs_controllers.update_faqs_by_id);



module.exports=router;