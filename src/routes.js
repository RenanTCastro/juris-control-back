const express = require("express");
const routes = express.Router();

// Controllers
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");

// Teste route
routes.get("/", UserController.teste);

// User routes
routes.post("/gerar-qr", UserController.gerarQRCode);
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.get("/users", UserController.getUsers);

// Product routes
routes.post("/adiciona-produto", ProductController.adicionaProduto);
routes.put("/atualizar-produto/:product_id", ProductController.editarProduto);
routes.get("/buscar-produto", ProductController.buscarProduto);
routes.delete("/deletar-produto/:product_id", ProductController.deletarProduto);
routes.get("/categorias", ProductController.retornarCategorias);

module.exports = routes;