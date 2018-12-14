<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoHeader from "./components/Header.vue";
import TodoInput from "./components/Input.vue";
import TodoList from "./components/List.vue";
import TodoFooter from "./components/Footer.vue";

export default {
  components: {
    "todo-header": TodoHeader,
    "todo-input": TodoInput,
    "todo-list": TodoList,
    "todo-footer": TodoFooter
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
