const router = require("express").Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

const services = require("./users.http");

//esto se usa cuando una misma ruta tiene diferentes verbos, cuando presenta uno solo, se hace directamente router.verb('/example')
router
	.route("/") // /api/v1/users/
	.get(services.getAll)
	.post(services.register);

router
	.route("/me")
	.put(passport.authenticate("jwt", { session: false }), services.editMyUser);

router
	.route("/:id")
	.get(services.getById)
	.delete(services.remove)
	.put(services.edit);

exports.router = router;
