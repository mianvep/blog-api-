const { login } = require("./auth.http");

const router = require("express").Router();

router.post("/login", login);

exports.router = router;
