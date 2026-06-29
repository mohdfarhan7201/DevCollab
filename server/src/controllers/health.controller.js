const ApiResponse = require("../utils/apiResponse");

const healthCheck = (req, res) => {

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Server is running successfully"
            )
        );

};

module.exports = {
    healthCheck
};