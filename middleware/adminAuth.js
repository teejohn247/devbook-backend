const adminAuth = (req, res, next) => {
    if (req.payload.admin) {
      next();
    } else {
      res.status(403).json({ status: 403, error: 'Access denied!' });
    }
  };
export default adminAuth;