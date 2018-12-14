<template>
  <div class="todoList">
    <transition tag="ul" name="list">
      <li class="list" v-bind:key="list.title" v-for="list in this.$store.state.todolist">
        <i
          v-bind:class="list.completed ? 'fas fa-smile-beam fa-lg' : 'fas fa-meh fa-lg'"
          v-on:click="todoComplete(list.title)"
        ></i>
        
        <input
          ref="input_box"
          v-bind:class="list.completed ? 'list-title completed' : 'list-title'"
          v-bind:value="list.title"
          v-bind:disabled="list.updateStatus"
          v-on:keyup.enter="updateTodoComplete(list.title)"
        >
        <i
          v-if="list.updateStatus ? '' : disabled='none'"
          class="fas fa-check"
          v-on:click="updateTodoComplete(list.title)"
        ></i>
        <i
          v-if="list.updateStatus ? disabled='none':''"
          class="fas fa-pen-fancy"
          v-on:click="updateTodo(list.title)"
        ></i>
        <i
          v-if="list.updateStatus ? disabled='none':''"
          class="fas fa-trash-alt"
          v-on:click="deleteTodo(list.title)"
        ></i>
      </li>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    deleteTodo(title) {
      this.$store.commit("deleteTodo", title);
    },
    updateTodo(title) {
      console.log("daasdasdsd");
      this.$store.commit("updateTodo", title);
    },
    updateTodoComplete(prevTitle) {
      const updateTitle = this.$refs["input_box"][
        this.$store.getters.getPosition(prevTitle)
      ].value;

      if (
        prevTitle != updateTitle &&
        this.$store.getters.getPosition(updateTitle) > -1
      ) {
        alert("중복되는 내용이 있어요!!");
      } else {
        this.$store.commit("updateTodoComplete", { prevTitle, updateTitle });
      }
    },
    todoComplete(title) {
      this.$store.commit("todoComplete", title);
    }
  }
};
</script>

<style scoped>
.todoList {
  display: flex;
  width: 100%;
  display: inline-block;
  line-height: 1em;
  text-align: left;
}

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  line-height: 3rem;
  border-radius: 5px;
  padding-left: 1rem;
  margin-bottom: 10px;
  background-color: white;
  height: 4rem;
  box-shadow: 3px 3px 3px 1px #999;
}
i {
  padding: 5px;
}
.list-title {
  width: 90%;
  border: none;
  background-color: white;
  padding-left: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: unset;
}
.completed {
  text-decoration: line-through;
  color: #eaeaea;
}
.fa-check {
  color: green;
}
.fa-pen-fancy {
  color: #747474;
}
.fa-trash-alt {
  color: red;
}
.fa-meh {
  color: #ff0000;
}
.fa-smile-beam {
  color: #22741c;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
