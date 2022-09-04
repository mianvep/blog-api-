const controllers = require("./users.controllers");

const getAll = (req, res) => {
	const data = controllers.getAllUsers();
	return res.status(200).json({ items: data.length, users: data });
};

const getById = (req, res) => {
	const id = req.params.id;
	const data = controllers.getUserById(id);
	if (data) {
		return res.status(200).json(data);
	} else {
		return res
			.status(404)
			.json({ message: `User with id ${id} does not exist` });
	}
};

//? En lugar de create, usamos el termino register
const register = (req, res) => {
	const data = req.body;
	if (!data) {
		return res.status(400).json({ message: "Missing data" });
	} else if (
		!data.first_name ||
		!data.last_name ||
		!data.email ||
		!data.password ||
		!data.birthday_date ||
		!data.country
	) {
		return res.status(400).json({
			message: "All fields must be completed",
			fields: {
				first_name: "string",
				last_name: "string",
				email: "examle@examle.com",
				password: "string",
				birthday_date: "DD/MM/YYYY",
				country: "string",
			},
		});
	} else {
		const response = controllers.createUser(data);
		return res.status(201).json({
			message: `User created successfully with id: ${response.id}`,
			users: response,
		});
	}
};

//Usamos remove, en lugare de delete, debido a que es una palabra reservada
const remove = (req, res) => {
	const id = req.params.id;
	const data = controllers.deleteUser(id);
	if (data) {
		return res.status(204).json();
	} else {
		return res.status(400).json({ message: "Invalid id" });
	}
};

const edit = (req, res) => {
	const id = req.params.id;
	const data = req.body;
	if (!Object.keys(data).length) {
		return res.status(400).json({ message: "Missing data" });
	} else if (
		!data.first_name ||
		!data.last_name ||
		!data.email ||
		!data.phone ||
		!data.rol ||
		!data.profile_image ||
		!data.birthday_date ||
		!data.country ||
		!data.is_active
	) {
		return res.status(400).json({
			message: "All fields must be completed",
			fields: {
				first_name: "string",
				last_name: "string",
				email: "examle@examle.com",
				phone: "+xx xxxxxxx",
				rol: "normal",
				profile_image: "http://www.example.com/img/example.png",
				birthday_date: "DD/MM/YYYY",
				country: "string",
				is_active: true,
			},
		});
	} else {
		const response = controllers.editUser(id, data);
		return res
			.status(200)
			.json({ message: "Edit successfully", user: response });
	}
};

//acá contruimos la logica para las rutas protegidas
const editMyUser = (req, res) => {
	const id = req.user.id; //Esto se obtiene del token desencryptado
	const data = req.body;
	if (!Object.keys(data).length) {
		return res.status(400).json({ message: "Missing data" });
	} else if (
		!data.first_name ||
		!data.last_name ||
		!data.email ||
		!data.phone ||
		!data.profile_image ||
		!data.birthday_date ||
		!data.country ||
		!data.is_active
	) {
		return res.status(400).json({
			message: "All fields must be completed",
			fields: {
				first_name: "string",
				last_name: "string",
				email: "examle@examle.com",
				phone: "+xx xxxxxxx",
				profile_image: "http://www.example.com/img/example.png",
				birthday_date: "DD/MM/YYYY",
				country: "string",
				is_active: true,
			},
		});
	} else {
		const response = controllers.editUser(id, data);
		return res
			.status(200)
			.json({ message: "Edit successfully", user: response });
	}
};

module.exports = {
	getAll,
	getById,
	register,
	remove,
	edit,
	editMyUser,
};
