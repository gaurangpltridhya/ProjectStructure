const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .send({ Error: "JWT NOT FOUND.!", message: "Not AUthenticated" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send({
        Error: "AccessDenied",
        message: "You are not allow to Do That!",
      });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      res.status(403).send({
        Error: "AccessDenied",
        message: "You are not allowed, Only Admin can access",
      });
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
