import routes from "@/utils/routes";
import axios from "axios";

export const fetchACollection = async (slug) => {
  try {
    // Make the GET request
    const response = await axios.get(routes.api.getaCollection(slug));

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching categories:", error);
    throw error;
  }
};

