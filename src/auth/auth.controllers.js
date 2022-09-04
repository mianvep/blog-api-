const { comparePassword } = require("../tools/crypt");
const { getUserByEmail } = require("../users/users.controllers");

const loginUser = (email, password) => {
	const user = getUserByEmail(email);
	if (user) {
		const verifyPassword = comparePassword(password, user.password);
		if (verifyPassword) {
			return user;
		}
	}
	return false;
};

module.exports = {
	loginUser,
};
