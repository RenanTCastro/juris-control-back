const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateJwt = require("../utils/jwt");

const PRIVATE_KEY = "11FF09E";

require("dotenv").config();

module.exports = {

  // register user
  async register(req, res, next) {
    try {
      const { email, password, user_name } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      await knex("users").insert({
        email,
        password: hashedPassword,
        user_name,
      });

      const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: "1h" });

      return res.status(201).json({ token });
    } catch (error) {
      res.json(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await knex("users").where({ email: email });

      if (!(email && password)) {
        res.status(400).send({ error: "É necessário preencher todos campos" });
      }

      if (!user.length) {
        res.status(401).json({ error: "E-mail não existe" });
      } else {
        const isAuthenticated = bcrypt.compareSync(password, user[0].password);

        if (!isAuthenticated) {
          res.status(401).json({ error: "Senha incorreta" });
        } else {
          const token = await generateJwt.generateJwt({
            user_id: user[0].user_id,
          });
          res.send({
            token: token,
            user_id: user[0].user_id,
            color: user[0].color,
          });
        }
      }
    } catch (error) {
      res.json(error);
    }
  },

  async getUsers(req, res, next) {
    try {
      const user = await knex("users");
      return res.status(201).json({ user });
    } catch (error) {
      res.json(error);
    }
  },
};