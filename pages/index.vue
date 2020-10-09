<template>
  <div>
    <nav>
      <h2>
        <select v-model="selected" @change="changeSelectedMatchDay($event)">
          <option
            v-for="matchDay in playedMatchDays"
            :value="matchDay"
            :key="matchDay.index"
            >{{ matchDay }}
          </option>
        </select>
        Spieltag
      </h2>
      <button class="btn" @click="toggleTheme">
        <span
          class="icon"
          :class="{ isDarkTheme: $colorMode.value === 'dark' }"
        ></span>
      </button>
    </nav>

    <div class="tables">
      <div>
        <table>
          <tbody v-for="(position, index) in baumTable" :key="position.rank">
            <tr :class="{ highlighted: hasToPay[index] }">
              <th scope="row">{{ position.rank }}</th>
              <td>
                {{ position.team }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <tbody
            v-for="(position, index) in selectedMatchDayTable"
            :key="position.rank"
          >
            <tr
              :class="{
                highlighted: selectedMatchDayTable[index].hasToPay
              }"
            >
              <th scope="row">{{ position.rank }}</th>
              <td>{{ position.team }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="total_donation">
      <div>
        SPIELTAGSPENDE: <strong>{{ totalPay }} EUR</strong>
      </div>
      <div>
        GESAMTSPENDE: <strong>{{ hasToPayTotal * 10 }} EUR</strong>
      </div>
    </div>
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
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dotted var(--color);
  padding: 10px 0;
}

.tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
table {
  width: 100%;
  padding: 10px 0;
  border-spacing: 0;
  border-collapse: separate;
}

h2 {
  margin: 0px;
  height: 30px;
}

td {
  padding: 8px 4px;
  text-align: left;
}

.highlighted {
  background-color: var(--color-secondary);
  color: var(--bg-secondary);
}

.total_donation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px dotted var(--color);
  font-size: 30px;
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

/* .btn span.icon {
  background: url("../assets/sun.svg") no-repeat;
  float: left;
  height: 25px;
  width: 25px;
} */

.btn span.isDarkTheme {
  background: url("../assets/sun.svg") no-repeat;
}
</style>
