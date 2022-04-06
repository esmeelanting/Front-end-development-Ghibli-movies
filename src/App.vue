<template>
  <div class="main-container">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<style>
.main-container {
  background-color: #F7F7F9;
  height:90vh;
}
/* When view width is smaller than 850 pixels change height */
@media all and (max-width: 850px) {
  .main-container {
    height:100%;
  }
}
</style>
<script>
import Navigation from "@/components/Navigation";
export default {
  components: {Navigation}
}
</script>
