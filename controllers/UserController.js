const { User, Post, Token, Sequelize } = require("../models/index.js"); //importo modelo
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

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
      const password = await bcrypt.hash(req.body.password, 10); //encriptamos contraseña
      const bodyWithPasswordHashed = { ...req.body, password };
      // const user = await User.create({...req.body, password});
      const user = await User.create(bodyWithPasswordHashed);
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
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Usuario actualizado con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).send(error); //error del servidor
    }
  },
  async login(req, res) {
    // User.findOne({
    //     where:{
    //         email:req.body.email
    //     }
    // }).then(user=>{
    //     if(!user){
    //         return res.status(400).send({message:"Usuario o contraseña incorrectos"})
    //     }
    //     const isMatch = bcrypt.compareSync(req.body.password, user.password);
    //     if(!isMatch){
    //         return res.status(400).send({message:"Usuario o contraseña incorrectos"})
    //     }
    //     res.send(user)
    // })
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password); //comparo contraseñas
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret); // creo el token
      Token.create({ token, UserId: user.id });
      res.send({ token, message: "Bienvenid@ " + user.name, user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },
};

module.exports = UserController;
