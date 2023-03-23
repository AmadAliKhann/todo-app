// errorHandler.middleware.js
// error handler 404 - route does not exist
export const noRouteHandler = (req, res, next) => {
    const error = new Error('Not Found! 😠');
    error.status = 404;
    next(error)
}





// main error handler - internal server problem
export const mainErrorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).send({ error: err.message }) // make error status dynamic by trying to read the status of the actual error and send the message of the property.
    }
}