const router =require("express").Router();

const user_controllers=require("../controllers/user.controllers");


//routes for user
router.post("/add-user",user_controllers.create_user);
router.post("/login",user_controllers.login_user);
router.post("/update-user/:user_id",user_controllers.update_user);
router.post("/logout",user_controllers.logout_user);


router.get("/get-user/:user_id",user_controllers.get_user);



module.exports=router;
