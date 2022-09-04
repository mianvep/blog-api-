const bcrypt = require("bcrypt");

const hashPassword = (textPassword) => {
	return bcrypt.hashSync(textPassword, 10);
};

const comparePassword = (textPassword, hashedPassword) => {
	return bcrypt.compareSync(textPassword, hashedPassword);
};

module.exports = {
	hashPassword,
	comparePassword,
};
