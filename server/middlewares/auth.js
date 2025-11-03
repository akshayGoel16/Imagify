import jwt from "jsonwebtoken";

// THE FOLLOWING MIDDLEWARE WILL BE EXECUTED BEFORE THE USER_CREDIT CONTROLLER FUNCTION
const userAuth = async (req, res, next) => {

  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Please Try Again!",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      // req.body.userId = tokenDecode.id;
    req.user = { id: tokenDecode.id }; 
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Token! Please Try Again!",
      });
    }

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export default userAuth;