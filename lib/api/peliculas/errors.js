const err = {
    invalid_page: {
        status: 400,
        errorCode: "bad_request",
        message: "Invalid page range"
    },
    invalid_id: {
        status: 400,
        errorCode: "bad_request",
        message: "Invalid id"
    },
    missing_values: {
        status: 400,
        errorCode: "bad_request",
        message: "Faltan valores requeridos"
    },
    movie_not_found: {
        status: 404,
        errorCode: "not_found",
        message: "No coincide ninguna pelicula"
    },
    bad_request: {
        status: 400,
        errorCode: "bad_request",
        message: "Bad request"
    },
    server_error: {
        status: 500,
        errorCode: "internal_server_error",
        message: "Internal server error"
    }
};

module.exports = err;