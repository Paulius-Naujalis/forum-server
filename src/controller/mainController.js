const uid = require('uid-safe')
const bcrypt = require('bcrypt')
const UserSchema = require('../schemas/UserSchema')

module.exports = {
    register: async (req, res) => {
        const { username, email, password, image } = req.body;
        const userExists = await UserSchema.findOne({ username });
        if (userExists) {
            return res.send({ error: true, message: 'User with this username exists', data: null });
        }
        const emailExists = await UserSchema.findOne({ email });
        if (emailExists) {
            return res.send({ error: true, message: 'User with this email exists', data: null });
        }
        const id = await uid(7);
        const hashedPass = await bcrypt.hash(password, 3);
        const user = new UserSchema({
            secret: id,
            username,
            email,
            password: hashedPass,
            image
        });
        await user.save();
        return res.send({ error: false, message: 'User successfully registrated!', data: null });
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const loginUser = await UserSchema.findOne({ username });
        if (loginUser) {
            const passMatch = bcrypt.compare(password, loginUser.password)
            if (passMatch) {
                return res.send({ error: false, message: `Welcome back ${username}!`, data: loginUser })
            }
            return res.send({ error: true, message: 'Invalid password', data: null });
        };
        return res.send({ error: true, message: 'Invalid username', data: null });
    },
    getSingleUser: async (req, res) => {
        const { secret } = req.params;
        const findUser = await UserSchema.findOne({ secret });
        if (findUser) {
            return res.send({ error: false, message: 'User found', data: findUser });
        }
        return res.send({ error: true, message: 'User not found', data: null });
    }
};  
