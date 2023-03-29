const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/createPost",PostController.create)
router.get("/getAll",PostController.getAll)
router.get("/getById/:id",PostController.getById)
router.get("/getOneByTitle/:title",PostController.getOneByTitle)
router.delete("/deleteById/:id",PostController.delete)
module.exports = router