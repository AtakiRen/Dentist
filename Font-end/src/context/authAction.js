import { googleSignIn } from "./AuthContext"; // Import the googleSignIn method from the AuthContext.js

// Define action creators
export const loginUserWithGoogle = () => {
  return async (dispatch) => {
    try {
      await googleSignIn(); // Dispatch the googleSignIn method from AuthContext.js
      // You can perform any additional logic here after successful login if needed
    } catch (error) {
      console.log(error);
    }
  };
};
