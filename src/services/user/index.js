import request from "util/request";

export const addFavorite = id => request.post("/user/favorite", { id });
export const removeFavorite = id =>
  request.delete(`/user/favorite/${id}/remove`);

export const loadFavorites = filters =>
  request.get("/user/list-favorites", filters);
