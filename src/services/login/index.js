import request from "util/request";

export const doLogin = credentials => {
  return request.post("/login", credentials);
};
