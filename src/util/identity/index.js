import { addFavorite, removeFavorite } from "services/user";
import config from "config";
import Storage from "util/storage";

export default class UserIDentity {
  session = {};

  constructor(user) {
    this.session = user;
  }

  static loadFromLocal() {
    const _session = Storage.get(config.userSessionKey);
    return new UserIDentity(_session);
  }

  setSession(session) {
    this.session = session;
    Storage.set(config.userSessionKey, this.session);
    return this;
  }

  getSession() {
    return this.session;
  }

  async addFavorite(id) {
    const result = await addFavorite(id);
    this.session.saved = result;
    Storage.set(config.userSessionKey, this.session);
    return Promise.resolve(result);
  }

  async removeFavorite(id) {
    const result = await removeFavorite(id);
    this.session.saved = result;
    Storage.set(config.userSessionKey, this.session);
    return result;
  }

  getFavorites() {
    return this.session.saved || [];
  }

  getFavoritesIDs() {
    return this.getFavorites().map(item => item.reference);
  }

  deleteSession() {
    this.session = {};
    Storage.remove(config.userSessionKey);
  }
}
