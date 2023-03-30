const express = require("express")
const UserController = require("../controllers/UserController")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/createUser", UserController.create)
router.get("/getAll",UserController.getAll)
router.delete("/deleteById/:id",authentication,isAdmin, UserController.delete)
router.put("/updateById/:id",authentication,UserController.update)
router.post("/login",UserController.login)
router.delete("/logout",authentication,UserController.logout)

module.exports = router;