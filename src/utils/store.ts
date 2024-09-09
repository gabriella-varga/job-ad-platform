import { createStore } from 'vuex';

export interface State {
  isLoggedIn: boolean;
}

export default createStore<State>({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, status: boolean) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    logIn({ commit }) {
      commit('setLoggedIn', true);
    },
    logOut({ commit }) {
      commit('setLoggedIn', false);
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
});
