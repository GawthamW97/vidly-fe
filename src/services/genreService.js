import config from "../config.json";
import http from "./httpServices";

const api = "/genres";

export function getGenres() {
  return http.get(api);
}
