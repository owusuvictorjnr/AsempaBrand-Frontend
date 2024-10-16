import routes from "@/utils/routes";
import axios from "axios";
import { auth, googleProvider } from '@/firebase';
import { signInWithPopup} from "firebase/auth";

// Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${routes.api.register}`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;  
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error("An error occurred while setting up the request.");
    }
  }
};


// Function to handle user verify
export const VerifyUser = async (userData) => {
  try {
    const response = await axios.post(`${routes.api.verify}`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;  
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error("An error occurred while setting up the request.");
    }
  }
};

// Function to handle user otpresend
export const ResendOTP = async (userData) => {
    try {
      const response = await axios.post(`${routes.api.resendOTP}`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;  
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  };
  

// Function to handle user login
export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${routes.api.login}`, userData, {
        withCredentials: true,  
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;  
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  };

  // Function to handle user login
export const forgotPassword= async (userData) => {
    try {
      const response = await axios.post(`${routes.api.requestReset}`, userData, {
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;  
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  };
    // Function to handle user login
export const ResetUserPassword= async (uid,token,userData) => {
    try {
      const response = await axios.post(`${routes.api.resetPassword}${uid}/${token}/`, userData, {
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;  
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  };

// Function to handle Google authentication
export const handleGoogleAuth = async () => {
  try {
    // Step 1: Sign in with Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Step 2: Get the ID token from the signed-in user
    const idToken = await user.getIdToken();  // Get the ID token, which is required by your backend

    // Step 3: Send the ID token to your backend
    const response = await loginGoogleUser(idToken); // Assuming loginGoogleUser makes an API call

    // Step 4: Return the backend's response
    return {
      response,
    };
  } catch (error) {
    const errorMessage = error.message;

    // Optionally return the error details for further handling
    return { error: errorMessage };
  }
};

// Function to send the ID token to the backend for verification
const loginGoogleUser = async (idToken) => {
  try {
    // Send the ID token in the payload with the key 'id_token'
    const response = await axios.post('http://54.235.108.224/api/v1/auth/google/', {
      id_token: idToken,  // Correctly send the ID token here
    });
    return response.data; // Return the backend's response
    
  } catch (error) {
    console.error('Error sending ID token to the backend:', error.message);
    throw error; // Re-throw the error for handling elsewhere
  }
};