<template>
  <div class="todo_input">
    <input
      type="text"
      id="todo_input"
      class="input_Box"
      placeholder="Input Todo"
      v-on:keyup.enter="addTodo"
      v-model="input_text"
    >
    <span class="addlist" v-on:click="addTodo">
      <i class="fas fa-plus"></i>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      input_text: ""
    };
  },
  methods: {
    addTodo() {
      if (!this.input_text) {
        alert("내용을 입력하세요!");
        return;
      }
      if (this.$store.getters.getPosition(this.input_text) > -1) {
        alert("중복되는 내용이 있어요!!");
        return;
      }
      this.$store.commit("AddTodoList", this.input_text);
      this.input_text = "";
    }
  }
};
</script>

<style scoped>
.todo_input {
  width: 100%;
  height: 40px;
  margin-bottom: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 1px #999;
}
.input_Box {
  width: 95%;
  border: none;
  padding: 10px;
  margin: 0;
}
.addlist {
  width: 3rem;
  height: 40px;
  float: left;
  line-height: 2.4rem;
  color: #f6f6f6;
  background-image: linear-gradient(-90deg, #bdbdbd, #5d5d5d);
  border-radius: 0 7px 7px 0;
}
</style>
