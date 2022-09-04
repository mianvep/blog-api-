const { database } = require("../database/dataInfo");
const uuid = require("uuid");
const { hashPassword } = require("../tools/crypt");

const getAllUsers = () => {
	return database;
	//? select * from users
};

const getUserById = (id) => {
	const data = database.filter((item) => item.id === id);
	return data ? data[0] : false;
	//? select * from users where id ${id}
};

const createUser = (data) => {
	const newUser = {
		id: uuid.v4(), // unico
		first_name: data.first_name,
		last_name: data.last_name,
		email: data.email, // unico
		password: hashPassword(data.password),
		phone: data.phone ? data.phone : "", //unico
		birthday_date: data.birthday_date,
		rol: "normal",
		profile_image: data.profile_image ? data.profile_image : "",
		country: data.country,
		is_active: true,
		verified: false,
	};
	database.push(newUser);
	return newUser;
};

const editUser = (id, data) => {
	const index = database.findIndex((user) => user.id === id);
	if (index !== -1) {
		database[index] = {
			id: id,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email, // unico
			password: database[index].password,
			phone: data.phone, //unico
			birthday_date: data.birthday_date,
			rol: data.rol,
			profile_image: data.profile_image,
			country: data.country,
			is_active: data.is_active,
			verified: false,
		};
		return database[index];
	} else {
		return createUser(data);
	}
};

const deleteUser = (id) => {
	const index = database.findIndex((user) => user.id === id);
	if (index !== -1) {
		database.splice(index, 1);
		return true;
	} else {
		return false;
	}
};

//Este controlador es provicional, ya que nos puede ocacionar problemas en caso de que existan usuarios con correos repetidos
const getUserByEmail = (email) => {
	const data = database.filter((user) => user.email === email);
	return data.length ? data[0] : false;
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	editUser,
	deleteUser,
	getUserByEmail,
};
