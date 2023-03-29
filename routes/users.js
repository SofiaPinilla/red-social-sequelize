const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()

router.post("/createUser", UserController.create)
router.get("/getAll",UserController.getAll)
router.delete("/deleteById/:id", UserController.delete)
router.put("/updateById/:id",UserController.update)

module.exports = router;