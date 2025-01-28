/**
 * Custom fetch function with default options and error handling.
 * @param {Object} options - The fetch options.
 * @param {string} options.method - The HTTP method (default: "GET").
 * @param {string} options.path - The API endpoint path.
 * @param {Object|string} options.body - The request body.
 * @param {Object} options.headers - The request headers.
 * @param {Object} options.queryParams - The query parameters.
 * @param {Object} options.otherOptions - Other options for the fetch request.
 * @throws {Error} HTTP error.
 * @returns {Promise<Object>} The response data.
 */
export async function customFetch({
  method = "GET", // HTTP method (default: "GET")
  path = "", // API endpoint path
  body = null, // request body
  headers = {}, // request headers
  queryParams = {}, // query parameters
  otherOptions = {}, // other options for the fetch request
}) {
  // Base URL from environment variable
  const baseURL = await import.meta.env.PUBLIC_API_BASE_URL;
  // Construct the URL with path and query parameters
  let url = path ? `${baseURL}/${path}` : baseURL;
  queryParams._t = new Date().getTime(); // Add a unique parameter to bypass cache
  if (Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += `?${queryString}`;
  }

  // Include Authorization header if token is provided
  // if (process.env.TOKEN) {
  //   headers["Authorization"] = `Bearer ${process.env.TOKEN}`;
  // }

  // Default fetch options
  const options = {
    method: method.toUpperCase(), // uppercase method
    headers: {
      "Content-Type": "application/json",
      ...headers, // merge with request headers
    },
    body: body ? JSON.stringify(body) : null, // stringify request body
    ...otherOptions, // merge with other options
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}: ${await response.text()}`
      );
    }
    return await response.json(); // parse response body as JSON
  } catch (error) {
    throw error; // re-throw error
  }
}
