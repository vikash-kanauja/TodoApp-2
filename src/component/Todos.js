import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { FiPlusCircle } from "react-icons/fi";
import Navbar from "./Navbar";
import TodoItem from "./TodoItem";
import AddTodoModal from "./AddTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
const Todos = () => {
  const [todoList, setTodoList] = useState([]);
  const [showOrHideTodoModal, setShowOrHideTodoModal] = useState(false);
  const [showOrHideDeleteModal, setShowOrHideDeleteModal] = useState(false); // State for showing/hiding delete todo modal
  const [todoInputText, setTodoInputText] = useState("");
  const [error, setError] = useState({
    inputError: false,
    dateError: false,
  });
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [currentDateAndTime, setCurrentDateAndTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [time, setTime] = useState(moment().format("YYYY-MM-DDTHH:mm"));

  // Function to show and hide add todo modal

  const openOrCloseAddPopupModal = () => {
    setShowOrHideTodoModal((prevState) => !prevState);
    setTime(moment().format("YYYY-MM-DDTHH:mm"));
    setTodoInputText(""); // Clear input text when toggling
  };

  // Function to toggle delete todo modal (show/hide)
  const openOrCloseDeletePopupModal = (id = null) => { 
    setDeleteTodoId(id);
    setShowOrHideDeleteModal((prevState) => !prevState);
  };

  // Function to handle input change time and input text in add todo modal
  const handleInput = (e) => {
    const { name, value } = e.target;
    let newError = { ...error };

    if (name === "todoTitle") {
      setTodoInputText(value);
      newError.inputError = value.trim() === "";
    } else if (name === "time") {
      setTime(value);
      const currentTime = moment();
      const selectedTime = moment(value);
      newError.dateError = selectedTime.isBefore(currentTime);
    }

    setError(newError);
  };

  // Function to edit a todo item
  const editTodo = (todo) => {
    openOrCloseAddPopupModal();
    setEditTodoId(todo.id);
    setTodoInputText(todo.task);
    setTime(todo.time);
  };
  // Function to add or update a todo item
  const addOrUpdateTodo = () => {
    const currentTime = moment();
    const selectedTime = moment(time);

    if (selectedTime.isBefore(currentTime)) {
      // setDateError(true); // Set date error if selected time is before current time
      setError({
        inputError: false,
        dateError: true,
      });
      return;
    } else {
      setError({
        inputError: false,
        dateError: true,
      });
    }
    if (todoInputText.trim() === "") {
      setError({
        inputError: true,
        dateError: false,
      });
      return;
    } else {
      setError({
        inputError: false,
        dateError: false,
      });
    }

    if (editTodoId) {
      // Add or update todo item
      setTodoList(
        todoList.map((t) => {
          if (t.id === editTodoId) {
            return { ...t, task: todoInputText.trim(), time: time };
          } else {
            return t;
          }
        })
      );
      setEditTodoId(null);
      setTodoInputText("");
      setTime(moment().format("YYYY-MM-DDTHH:mm"));
      openOrCloseAddPopupModal();
    } else {
      setTodoList((prevlist) => [
        // Add new todo item
        {
          id: Date.now(),
          task: todoInputText.trim(),
          time: time,
          color: "green",
          completed: false,
        },
        ...prevlist,
      ]);
      setTodoInputText("");
      openOrCloseAddPopupModal();
      setTime(moment().format("YYYY-MM-DDTHH:mm"));
    }
  };
  // Function to delete a todo item
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
    setDeleteTodoId(null);
    setTodoInputText("");
    openOrCloseDeletePopupModal();
  };
  // Function to toggle todo completion status
  const TodoCompleteTask = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };
  // Update current date and time every second
  useEffect(() => {
    setInterval(() => {
      setCurrentDateAndTime(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, []);

  return (
    <div className="w-full mx-auto relative pb-10 px-3 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6 mt-12 2xl:mt-15">
      <Navbar currentDateAndTime={currentDateAndTime} />
      <div className="flex justify-between items-center mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={openOrCloseAddPopupModal}
        >
          <FiPlusCircle />
        </div>
      </div>
      {todoList.length === 0 && <h1>Add Todo</h1>}
      {todoList.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            TodoCompleteTask={TodoCompleteTask}
            deletePopup={openOrCloseDeletePopupModal}
            editTodo={editTodo}
            key={index}
          />
        );
      })}
      <AddTodoModal
        showOrHideTodoModal={showOrHideTodoModal}
        todoInputText={todoInputText}
        addOrUpdateTodo={addOrUpdateTodo}
        openOrCloseAddPopupModal={openOrCloseAddPopupModal}
        time={time}
        error={error}
        handleInput={handleInput}
      />
      <DeleteTodoModal
        showOrHideDeleteModal={showOrHideDeleteModal}
        openOrCloseDeletePopupModal={openOrCloseDeletePopupModal}
        deleteTodo={deleteTodo}
        id={deleteTodoId}
      />
    </div>
  );
};

export default Todos;
