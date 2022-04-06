<script>
export default {
  name: "Landingpage",
  methods: {
    /**
     * This method navigate to the route of the router.
     * @param router The name of the route in the router index.
     * @param isFavorites Whether the user clicked on favorites or not.
     */
    async navigateTo(router, isFavorites) {
      await this.$router.push({name: router, params: { favorites: isFavorites}})
    }
  }
}
</script>

<template>
  <h1 class="select-text">Select a category!</h1>
  <div class="item-container">
    <!-- Movie square -->
    <div v-on:click="navigateTo('movies', 'false')" class="item">
      <h1>Movies</h1>
    </div>
    <!-- Date square -->
    <div v-on:click="navigateTo('dates', 'false')" class="item">
      <h1>Movie Dates</h1>
    </div>
    <!-- Favorites square -->
    <div v-on:click="navigateTo('movies', 'true')" class="item">
      <h1>Favorites</h1>
    </div>
  </div>
</template>

<style scoped>
.select-text {
  text-align: center;
  font-family: Poppins-Medium, sans-serif;
  margin-top: 150px;
}

.item-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 50px 0;
  max-width: 1300px;
  margin: 0 auto;
  gap: 4vw;
}

.item {
  display: flex;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
  width: 295px;
  height: 295px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.item h1 {
  font-family: Poppins-Medium, sans-serif;
  font-size: 1.5rem;
}

.item:hover {
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .item {
    transition: 0.2s ease;
  }

  .item:hover {
    transform: scale(1.05);
  }
}

</style>
