import store from 'store'

export default class StoreUser {
    static save(user) {
        StoreUser.USER_ID = user.id;
        store.set(StoreUser.USER_ID, user)
    }

    static getMe() {
        return store.get(StoreUser.USER_ID);
    }

    static getMyId() {
        return store.get(StoreUser.USER_ID).id;
    }

    static getMyRole() {
        return store.get(StoreUser.USER_ID).role;
    }
    static getMyToken() {
        return store.get(StoreUser.USER_ID).token;
    }

    static remove(id) {
        store.remove(id);
    }

    static removeMe() {
        store.remove(StoreUser._USER_ID);
        store.remove("current_hoster_id");
    }

    static set USER_ID(i) {
        store.set("current_hoster_id", i);
        return i;
    }

    static get USER_ID() {
        return store.get("current_hoster_id");
    }
}
