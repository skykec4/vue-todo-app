<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import todoheader from "./components/Header.vue";
import todoinput from "./components/Input.vue";
import todolist from "./components/List.vue";
import todofooter from "./components/Footer.vue";

export default {
  components: {
    todoheader,
    todoinput,
    todolist,
    todofooter
  },
  created: function() {
    this.$store.commit("fetchData");
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: floralwhite;
}
#app {
  text-align: center;
  margin: 0 auto;
  width: 90%;
  font-size: 100%;
}
</style>
