const express = require("express");
const passport = require("passport");
require("./middlewares/auth.middleware")(passport);

const userRoutes = require("./users/users.routes").router;
const authRoutes = require("./auth/auth.routes").router;
const blogRoutes = require("./posts/post.routes").router;

const app = express();

//?sirve para poder recibir y manipular informacion de las peticiones POST
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
	return res.status(200).json({ message: "Success" });
});

// Creamos nuetra ruta
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", blogRoutes);

app.listen(PORT, () => {
	console.log(`Srver started at http://localhost:${PORT}`);
});
