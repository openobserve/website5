import { customFetch } from "../../utils/customFetch";

export const getAllProjects = async ({ path}) => {
   
    const data = await customFetch({
      method: "GET",
      path: `api/${path}`,
    });
  
    return data;
  };
  