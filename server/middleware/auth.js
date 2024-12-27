const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.accessToken;
  
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
  
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decodedToken;
      const user = await User.findById(req.user._id).select(
        "-password -refreshToken -provider -__v"
      );
      req.user = user;
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

  export {
    authMiddleware
  }