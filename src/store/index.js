import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todolist: []
  },
  getters: {
    getPosition: state => title => {
      return state.todolist
        .map(function(e) {
          return e.title;
        })
        .indexOf(title);
      // return state.todolist.find(todo => todo);
    }
  },
  mutations: {
    fetchData(state) {
      state.todolist = JSON.parse(localStorage.getItem("todo-list"));
      // if (state.todolist == null) {
      //   state.todolist = [];
      // }
    },
    AddTodoList: function(state, input_text) {
      const data = {
        title: input_text,
        updateStatus: true,
        completed: false
      };

      state.todolist.push(data);

      store.commit("todolistSaved");
    },
    updateTodo: function(state, title) {
      const currPosition = store.getters.getPosition(title);
      state.todolist[currPosition].updateStatus = !state.todolist[currPosition]
        .updateStatus;

        console.log('asd : ',state.todolist)
      store.commit("todolistSaved");
    },
    updateTodoComplete(state, obj) {
      const currPosition = store.getters.getPosition(obj.prevTitle);

      state.todolist[currPosition].title = obj.updateTitle;
      state.todolist[currPosition].updateStatus = !state.todolist[currPosition]
        .updateStatus;

      store.commit("todolistSaved");
    },
    todoComplete(state, title) {
      const currPosition = store.getters.getPosition(title);
      state.todolist[currPosition].completed = !state.todolist[currPosition].completed;

      store.commit("todolistSaved");
    },
    deleteTodo: function(state, title) {
      const currPosition = store.getters.getPosition(title);
      state.todolist.splice(currPosition, 1);

      store.commit("todolistSaved");
    },
    clearTodoList(state) {
      localStorage.clear();
      state.todolist = [];
    },
    todolistSaved(state) {
      localStorage.setItem("todo-list", JSON.stringify(state.todolist));
    }
  }
});
