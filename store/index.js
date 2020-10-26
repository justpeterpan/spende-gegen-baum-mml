import baumTable from "../assets/baum.json";
import matchDaysJson from "../assets/matchDays.json";

export const state = () => ({
  baumTable: baumTable,
  playedMatchDays: [],
  selectedMatchDay: "",
  selectedMatchDayTable: [],
  hasToPay: [],
  hasToPayTotal: 0
});

export const getters = {};

export const mutations = {
  getPlayedMatchDays(state) {
    Object.keys(matchDaysJson).forEach(matchDay =>
      state.playedMatchDays.push(matchDay)
    );
  },
  setSelectedMatchDay(state, matchDay) {
    state.selectedMatchDay = matchDay;
  },
  getSelectedMatchDayTable(state, matchDay) {
    state.selectedMatchDayTable = matchDaysJson[matchDay];
  },
  setHasToPay(state, matchDay) {
    state.hasToPay = [];
    state.selectedMatchDayTable.forEach(position =>
      state.hasToPay.push(position.hasToPay)
    );
  },
  setHasToPayTotal(state) {
    // TODO beautify
    // !concatinating three times because of nested array structure in matchDayJson...
    Object.entries(matchDaysJson).forEach(entry => {
      const tmp = [];
      tmp.push(entry.filter(day => Array.isArray(day)));
      const firstMerged = [].concat.apply([], tmp);
      const secondMerged = [].concat.apply([], firstMerged);
      const thirdMerged = [].concat.apply([], secondMerged);
      thirdMerged.filter(entry =>
        entry.hasToPay ? state.hasToPayTotal++ : null
      );
    });
  }
};

export const actions = {
  async getPlayedMatchDays({ commit }) {
    await commit("getPlayedMatchDays");
  },
  async setSelectedMatchDay({ commit }, matchDay) {
    await commit("setSelectedMatchDay", matchDay);
  },
  async getSelectedMatchDayTable({ commit }, matchDay) {
    await commit("getSelectedMatchDayTable", matchDay);
  },
  async setHasToPay({ commit }, matchDay) {
    await commit("setHasToPay", matchDay);
  },
  setHasToPayTotal({ commit }) {
    commit("setHasToPayTotal");
  }
};
