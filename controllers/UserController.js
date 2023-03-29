const { User, Post } = require("../models/index.js"); //importo modelo

const UserController = {
  async create(req, res) {
    req.body.role = "user"; //role por defecto
    // User.create(req.body)
    //     .then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
    //     .catch(err =>{
    //         console.error(err)
    //         res.send(err)
    //     })
    try {
      const user = await User.create(req.body);
      res.status(201).send({ msg: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      res.send(error); //para que en el postman (en la respuesta) venga el error
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: [Post],
      });
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async delete(req, res) {
    //borro usuario
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      //borro posts del usuario
      await Post.destroy({
        where: {
          UserId: req.params.id,
        },
      });
      res.send({
        msg: "El usuario ha sido eliminado con éxito",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async update(req, res) {
    try {
      await User.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
            res.send('Usuario actualizado con éxito');
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
   }
};

module.exports = UserController;
