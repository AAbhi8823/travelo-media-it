const router =require("express").Router();

const website_controllers=require("../controllers/website.controllers");

//routes for website
router.post("/add-website",website_controllers.add_website);
router.get("/get-website",website_controllers.get_website);
router.put("/update-website/:web_id",website_controllers.update_website);




module.exports=router;