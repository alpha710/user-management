const { findUser, validatePassword } = require('./login.service');

const login = async (req, res) => {
    try {
        const user = await findUser(req.body.email.toLowerCase());
        if (!user)
            return res.end(JSON.stringify({ status: 400, message: 'Account does not exist.', data: null }));
        const passwordMatch = validatePassword(req.body.password, user.password);
        if (!passwordMatch)
            return res.end(JSON.stringify({ status: 400, message: 'Invalid password.', data: null }));
        delete user.password;
        return res.end(JSON.stringify({ status: 200, message: 'Login successful', data: { user } }));
    } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: 500, message: 'Internal Server Error', error: true }));
    }
};

module.exports = {
    login
};