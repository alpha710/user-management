const { validateEmail, createUser, countEmail } = require('./signup.service');

const signup = async (req, res) => {
    try {
        const isEmailVaild = validateEmail(req.body.email.toLowerCase());
        if (!isEmailVaild)
            return res.end(JSON.stringify({ status: 400, message: 'Invalid email id.', data: null }));
        const emailCount = await countEmail(req.body.email.toLowerCase());
        if (emailCount)
            return res.end(JSON.stringify({ status: 400, message: 'The email id you have entered is already in use. Please enter a different email id.', data: null }));
        const user = await createUser(req.body);
        return res.end(JSON.stringify({ status: 200, message: 'Signup successful', data: { user } }));
    } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: 500, message: 'Internal Server Error', error: true }));
    }
};

module.exports = {
    signup
};