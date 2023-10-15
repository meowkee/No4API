const { User } = require("../models/models");

class UsersController {
    async getUsers(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async deleteUser(req, res) {
        const { email } = req.body;
        await User.destroy({ where: { email } });
        return res.json("User deleted successfully");
    }

    async changeUserStatus(req, res) {
        const { email, changeOn } = req.body;
        const user = await User.update({status: changeOn}, { where: { email } });
        return res.json("User updated successfully");
    }
}

module.exports = new UsersController();
