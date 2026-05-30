class Response {
    
    static success(res, message = "Success", data = {}, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = "Something went wrong", errors = {}, statusCode = 400) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }
}

module.exports = Response;