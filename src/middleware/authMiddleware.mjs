import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const authenticate = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization; // Use the correct header key
    //   console.log("Authorization Header:", authHeader);
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization header with Bearer token is required' });
      }
  
      // Extract the token from the Bearer string
      const token = authHeader.split(' ')[1];
  
      const decoded =  jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.id = decoded.id; // Attach the user ID to the request
      console.log(process.env.JWT_SECRET)
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  
 export default authenticate;
  