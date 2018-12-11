<template>
  <div class="todoFooter">
    <span class="clearBtn" v-on:click="deleteTodoList">Clear All</span>
  </div>
</template>

<script>
export default {
  methods: {
    deleteTodoList() {
      this.$store.commit("clearTodoList");
    }
  }
};
</script>

<style scoped>
.todoFooter {
  width: 8.5rem;
  border: solid 2px #d1d7db;
  background-color: white;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  padding: 1vh;
  box-shadow: 3px 3px 3px 1px #999;
}
</style>
