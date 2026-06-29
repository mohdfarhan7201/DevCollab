const registerUser = async (req, res) => {

    const {
        name,
        username,
        email,
        password
    } = req.body;

    if (
        !name ||
        !username ||
        !email ||
        !password
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    res.status(200).json({
        success: true,
        message: "Register API Working",
        data: {
            name,
            username,
            email,
            password
        }
    });

};

module.exports = {
    registerUser
};