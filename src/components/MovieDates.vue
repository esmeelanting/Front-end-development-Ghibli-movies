<script>
export default {
  name: "MovieDates",
  data() {
    return {
      dates: [],
    }
  },
  /**
   * This method is called when the web page is loaded.
   */
  async created() {
    // Fetch / call the API and store the data
    const response = await fetch("https://ghibliapi.herokuapp.com/films");
    const data = await response.json();

    // Loop through all the films and push all the release dates of those films
    for (let i = 0; i < data.length; i++) {
      this.dates.push(data[i].release_date);
    }
  },
  methods: {
    /**
     * This method selects a date and changes the route with the date as data.
     * @param date The date the user clicked on.
     */
    async selectDate(date) {
      await this.$router.push({name: 'movies', params: { date: date}})
    }
  }
}
</script>

<template>
  <div class="main-container">
    <div class="container">
      <!-- Movie item container -->
      <div class=item-container v-for="date in dates" :key="date" v-on:click="selectDate(date)">
        <h1>{{ date }}</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  margin-top: 10px;
  display: flex;
  gap: 50px;
}
.container {
  overflow: scroll;
  min-width: 100%;
  max-height: 98%;
  overflow-x: hidden;
}
.item-container {
  width: 100%;
  height: 65px;
  background: #FFFFFF;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.item-container h1 {
  font-size: 1rem;
  font-family: Cabin, sans-serif;
  padding: 12px;
  font-weight: 100;
  align-content: center;
  text-align: center;
}

.item-container:hover {
  cursor: pointer;
  background-color: #5ae0cc;
}
</style>
