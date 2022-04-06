
<script>
export default {
  name: "Navigation",
  data() {
    return {
      contentHamOpenState: Boolean
    }
  },
  methods: {
    toggleHamburgerContent() {
      this._contentHamOpenState = !this._contentHamOpenState;
    },
    async navigateTo(router, isFavorites) {
      await this.$router.push({name: 'landingpage', params: { favorites: isFavorites}})
      await this.$router.push({name: router, params: { favorites: isFavorites}})
    }
  }
}
</script>

<template>
  <div class="container">
    <img class="logo" src="../assets/logo_ghibli.png" v-on:click="navigateTo('landingpage', 'false')" alt="Logo Ghibli">
    <div class="hamburger-container">
      <input class="menu-btn" type="checkbox" id="menu-btn" v-on:click="toggleHamburgerContent()"/>
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    </div>

    <!-- items -->
    <div v-bind:class="{'show-mobile' : contentHamOpenState}" class="items-container">
      <!-- football options  -->
      <a v-on:click="navigateTo('movies', 'false')">Movies</a>
      <a v-on:click="navigateTo('dates', 'false')">Movie Release-dates</a>
      <a v-on:click="navigateTo('movies', 'true')">Favorites</a>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling */
nav {
  padding: 25px 50px;
  min-width: 300px;
  box-sizing: border-box;
}

.logo {
  max-height: 30px;
  cursor: pointer;
  margin: 7px;
}

.container {
  background-color: white;
  flex-wrap: wrap;
  display: flex;
  padding-top: 10px;
  padding-bottom: 15px;
}

.items-container {
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow: hidden;
  max-height: 0;
  transition: max-height .2s ease-out;
}

.items-container a{
  font-family: Cabin, sans-serif;
  font-size: 1.3rem;
  font-weight: 530;
  color: inherit;
  text-decoration: none;
  padding: 15px 10px;
  text-align: center;
}

.item.button.secondary a {
  padding: 13px 50px;
}

.profile > a {
  padding-left: 8px;
}

/* Hamburger content */
.hamburger-container {
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
  flex-basis: 53%;
}

.show-mobile {
  margin-top: 25px;
  max-height: 360px;
}

.menu-icon {
  cursor: pointer;
}

.menu-icon .navicon {
  display: block;
  height: 2px;
  position: relative;
  transition: background .2s ease-out;
  width: 28px;
  border-radius: 25px;
}

.menu-icon .navicon,
.menu-icon .navicon:before,
.menu-icon .navicon:after{
  background: black;
}


.menu-icon .navicon:before,
.menu-icon .navicon:after {
  opacity: 1;
  border-radius: 25px;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all .2s ease-out;
  width: 100%;
}

.menu-icon .navicon:before {
  top: 11px;
}

.menu-icon .navicon:after {
  top: -11px;
}

.menu-btn {
  display: none;
}

.menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

.items-container a:hover {
  color: #828282;
}

/* All style for desktop resolution */
@media all and (min-width: 701px) {
  .container {
    display: flex;
    flex-wrap: nowrap;
  }

  .hamburger-container {
    display: none;
  }

  .items-container {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 0;
    max-height: none;
    overflow: visible;
  }

  .items-container a {
    align-self: center;
    transition: 0.3s;
    padding: 15px 35px;
  }

  .logo {
    margin-right: auto;
  }

  .dropdown-content a {
    float: none;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    background-color: transparent;
  }
}

@media all and (max-width: 500px) {
  .hamburger-container {
    flex-basis: 30%;
  }
}

/* All style for desktop resolution */
@media all and (max-width: 350px) {
  .hamburger-container {
    flex-basis: 15%;
  }
}

</style>
