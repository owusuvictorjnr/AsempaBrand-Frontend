import routes from "@/utils/routes";
import axios from "axios";

export const fetchCategories = async () => {
  try {
    // Make the GET request
    const response = await axios.get(routes.api.getCategories);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCollections = async () => {
    try {
      // Make the GET request
      const response = await axios.get(routes.api.getCollections);
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  
export const fetchNewArrivals = async () => {
    try {
      // Make the GET request
      const response = await axios.get(routes.api.getNewArrivals);
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  export const fetchTopSelling = async () => {
    try {
      // Make the GET request
      const response = await axios.get(routes.api.getTopSellingProducts);
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching categories:", error);
      throw error;
    }
  };