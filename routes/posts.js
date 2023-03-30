const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.post("/createPost",authentication, PostController.create)
router.get("/getAll",PostController.getAll)
router.get("/getById/:id",PostController.getById)
router.get("/getOneByTitle/:title",PostController.getOneByTitle)
router.delete("/deleteById/:id",authentication,PostController.delete)

module.exports = router