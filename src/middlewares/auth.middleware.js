const { getUserById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: "migueek", // debe estar en una variable de entorno
	};
	passport.use(
		new JwtStrategy(opts, (decoded, done) => {
			//done es una funcion interna
			const data = getUserById(decoded.id);
			if (data) {
				console.log("decoded jwt", decoded);
				return done(null, decoded); // Retornaremps decoded cuando se ejecute con exito
			} else {
				return done(true, false);
			}
		})
	);
};
