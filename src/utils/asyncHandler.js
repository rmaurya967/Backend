const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.reslove(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
