const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (name, email) => {
    return jwt.sign({ name, email }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return next(
                ApiError.badRequest(`User with ${email} already exists`)
            );
        }
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            signUpDate: new Date(),
            status: "Active",
        });
        const token = generateJwt(user.name, user.email);
        return res.json({ token });
    }

    async login(req, res, next) {
        const currentDate = new Date();
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return next(ApiError.internal("User not found or password mismatch"));
        }
        if (user.status === "Blocked") {
            return next(ApiError.internal("User is blocked"));
        }
        await user.update({ lastSignInDate: currentDate });
        const token = generateJwt(user.name, user.email);
        return res.json({ token });
    }

    async checkAuthorization(req, res) {
        const token = generateJwt(req.user.name, req.user.email);
        return res.json({ token });
    }
}

module.exports = new UserController();
