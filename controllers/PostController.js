const { Post, User, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send({ msg: "Post creado con éxito", post });
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        include: [User],
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [User],
      });
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async getOneByTitle(req, res) {
    try {
      const post = await Post.findOne({
        where: {
          title: {
            [Op.like]: `%${req.params.title}%`,
          },
        },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },

  async delete(req, res) {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ msg: "La publicación ha sido eliminada con éxito" }); //buena practica poner mensaje en una propiedad de objeto
  }

};

module.exports = PostController;
