export const BASE_URL = "http://localhost:8000";

const API_URL = "/api/v1";

export const URLS = {
  LOGIN: API_URL + "/users/login",
  REGISTER: API_URL + "/users/register",
  GENERATE_FP: API_URL + "/users/generate-fp-token",
  VERIFY_FP: API_URL + "/users/verify-fp-token",
  GET_PUBLISHED_BLOGS: API_URL + "/blogs/published-only",
  GET_ONE_BLOG: API_URL + "/blogs",
};
