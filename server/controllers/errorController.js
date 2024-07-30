/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
