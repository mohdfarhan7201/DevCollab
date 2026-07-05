const ApiError = require("../utils/apiError");

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return next(
        new ApiError(
          400,
          err.errors?.[0]?.message || "Validation error"
        )
      );
    }
  };
}

module.exports = { validate };   // ✅ IMPORTANT CHANGE