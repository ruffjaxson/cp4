<template>
<div>
  <div class='main-container'>
    <h1>Find your character</h1>
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" placeholder="Narrow your search" style="width:400px;"/>
      </form>
    </div>
  </div>
  <InfoList :items="items" />
</div>
</template>

<script>
// @ is an alias to /src
import InfoList from "../components/InfoList.vue"

export default {
  name: 'Home',
  components: {
    InfoList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    items() {
      return this.$root.$data.items.filter(item => item.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
}
</script>

<style scoped>

.search {
  margin-top: 30px;
}

</style>
