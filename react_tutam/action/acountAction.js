import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const loginAction = async (email, password) => {
    try {
      const apiParams = new URLSearchParams();
      apiParams.append("email", email);
      apiParams.append("password", password);
  
      const response = await axios.post("http://localhost:4000/planeT/login", 
      {params: apiParams});
      
  
      //NOTE : Axios will return the data in response.data
  
      //From the API we see that all the movies information is in the response.data.results
  
      console.log("Response from Backend");
      console.log(response.data);
  
      return baseApiResponse(response.data.results, true);
    } catch (error) {
      console.error(error);
      return baseApiResponse(null, false);
    }
  };

//Create getMovieDetails API Here
export const getMovieDetails = async (movieId) => {
try {
  const apiParams = new URLSearchParams();
  apiParams.append("api_key", import.meta.env.VITE_API_KEY);

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/movie/${movieId}`,
    { params: apiParams }
  );
  
  console.log("Response from Backend");
    console.log(response.data);

    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

