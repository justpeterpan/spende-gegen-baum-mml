<template>
  <div>
    <!-- <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">{{ $colorMode.preference }}</option>
    </select> -->

    <div class="tables">
      <div>
        <h2>🌳 Tabelle</h2>
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
        <h2>
          <select v-model="selected" @change="changeSelectedMatchDay($event)">
            <option
              v-for="matchDay in playedMatchDays"
              :value="matchDay"
              :key="matchDay"
              >{{ matchDay }}
            </option>
          </select>
          Spieltag
        </h2>
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
              <td v-if="selectedMatchDayTable[index].hasToPay">
                10 EUR
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="total_donation">
      <p>
        SPIELTAGSPENDE: <strong>{{ totalPay }} EUR</strong>
      </p>
      <p>
        GESAMTSPENDE: <strong>{{ hasToPayTotal * 10 }} EUR</strong>
      </p>
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
      console.log(e.target.value);
      this.setSelectedMatchDay(e.target.value);
      this.getSelectedMatchDayTable(e.target.value);
      this.setHasToPay(`${this.selectedMatchDay}`);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
table {
  width: 100%;
  padding: 20px 0;
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
  background-color: green;
  color: white;
}

.total_donation {
  display: flex;
  justify-content: space-between;
  border-top: 1px dotted var(--color);
  font-size: 30px;
}
</style>
