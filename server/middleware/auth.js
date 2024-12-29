import jwt  from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized user! Invalid token.",
    });
  }
};

export default authMiddleware;