<template>
  <div>
    <nav>
      <select
        :class="{ isDarkTheme: $colorMode.value === 'dark' }"
        v-model="selected"
        @change="changeSelectedMatchDay($event)"
      >
        <option
          v-for="matchDay in playedMatchDays"
          :value="matchDay"
          :key="matchDay.index"
          >{{ matchDay }}. Spieltag
        </option>
      </select>

      <button class="btn" @click="toggleTheme">
        <span
          class="icon"
          :class="{ isDarkTheme: $colorMode.value === 'dark' }"
        ></span>
      </button>
    </nav>

    <div class="table_header">
      <div class="table_title">🌳 Tabelle</div>
      <div class="table_title">Realität</div>
    </div>

    <div class="tables">
      <!-- 🌳 TABLE -->
      <table>
        <tbody>
          <tr
            v-for="(position, index) in baumTable"
            :key="position.rank"
            :class="{ highlighted: hasToPay[index] }"
          >
            <th scope="row">{{ position.rank }}</th>
            <td>
              <span
                ><img
                  class="logo"
                  :src="require(`../assets/logos/${position.logo}.svg`)"
                  alt=""
              /></span>
              <div v-if="isMobile" class="team_short">{{ position.logo }}</div>
              <div v-else class="team">{{ position.team }}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- CURRENT MATCHDAY TABLE -->
      <table>
        <tbody>
          <tr
            v-for="(position, index) in selectedMatchDayTable"
            :key="position.rank"
            :class="{
              highlighted: selectedMatchDayTable[index].hasToPay
            }"
          >
            <th scope="row">{{ position.rank }}</th>
            <td>
              <span
                ><img
                  class="logo"
                  :src="require(`../assets/logos/${position.logo}.svg`)"
                  alt=""
              /></span>
              <div v-if="isMobile" class="team_short">{{ position.logo }}</div>
              <div v-else class="team">{{ position.team }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TODO update structure -->
    <div class="donations">
      <div class="donations_item">
        SKY TAGESTICKET:
        <div>{{ totalPay }} €</div>
      </div>
      <div class="donations_item">
        DAUERKARTE:
        <div>{{ hasToPayTotal * 10 }} €</div>
      </div>
    </div>
    <footer>no ads • no tracking • no bullshit</footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import baum from "../assets/baum.json";
import matchDays from "../assets/matchDays.json";

export default {
  data() {
    return {
      selected: "3"
    };
  },
  computed: {
    ...mapState([
      "baumTable",
      "playedMatchDays",
      "selectedMatchDay",
      "selectedMatchDayTable",
      "hasToPay",
      "hasToPayTotal"
    ]),
    setSelected() {
      this.selected = this.selectedMatchDay;
    },
    totalPay() {
      const timesToPay = this.hasToPay.filter(entry => entry);
      return timesToPay.length * 10;
    },
    isDarkTheme() {
      return this.$colorMode.value === "dark" ? true : false;
    },
    isMobile() {
      if (process.client) {
        return window.innerWidth < 813 ? true : false;
      }
    }
  },
  methods: {
    ...mapActions([
      "getPlayedMatchDays",
      "setSelectedMatchDay",
      "getSelectedMatchDayTable",
      "setHasToPay",
      "setHasToPayTotal"
    ]),
    init() {
      this.getPlayedMatchDays();
      this.setSelectedMatchDay(this.playedMatchDays.length);
      this.getSelectedMatchDayTable(`${this.selectedMatchDay}`);
      this.setHasToPay(`${this.selectedMatchDay}`);
      this.setHasToPayTotal();
    },
    changeSelectedMatchDay(e) {
      this.setSelectedMatchDay(e.target.value);
      this.getSelectedMatchDayTable(e.target.value);
      this.setHasToPay(`${this.selectedMatchDay}`);
    },
    // $colorMode comes from @nuxtjs/color-mode
    toggleTheme() {
      this.$colorMode.value =
        this.$colorMode.value === "dark" ? "light" : "dark";
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
nav {
  display: flex;
  background-color: var(--bg-secondary);
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
}

.tables {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

table {
  width: 100%;
  padding: 0 0 10px 0;
  border-spacing: 0;
  border-collapse: separate;
}

td {
  display: flex;
  align-items: center;
  padding: 8px 4px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: var(--bg-alt);
}

tr.highlighted {
  background-color: var(--color-secondary);
  color: var(--bg-secondary);
}

.team_short {
  text-transform: uppercase;
}

.donations {
  margin: 10px;
  font-family: Roboto Slab, sans-serif;
  border-bottom: 4px double var(--color);
  padding: 20px 0;
  justify-content: space-between;
  border-top: 1px dotted var(--color);
  font-size: 21px;
}

.donations_item {
  display: flex;
  justify-content: space-between;
}

.btn {
  background: none;
  border: none;
}

.btn span.icon {
  background: url("../assets/moon.svg") no-repeat;
  float: left;
  height: 25px;
  width: 25px;
  fill: aliceblue;
}

.btn span.isDarkTheme {
  background: url("../assets/sun.svg") no-repeat;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: Roboto Slab, sans-serif;
  background: transparent;
  outline: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='212225' line='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-y: 2px;
  color: var(--color);
  font-size: 21px;
  line-height: normal;
  font-weight: 700;
  border: none;
  width: 100%;
  appearance: none;
  display: block;
  padding-left: 20px;
  margin: 0;
}

.table_header {
  margin: 0 10px 10px 10px;
  border-bottom: 1px dotted var(--color);
  font-size: 21px;
  justify-items: stretch;
  align-items: center;
  font-weight: 700;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0;
}

.table_title {
  font-family: Roboto Slab, sans-serif;
}

.logo {
  height: 32px;
  width: 32px;
  padding-right: 10px;
  margin-top: 4px;
}

select.isDarkTheme {
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' line='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
}

footer {
  display: flex;
  background-color: var(--bg-secondary);
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20;
  width: 100%;
  height: 100px; /* Height of the footer */
}
</style>
