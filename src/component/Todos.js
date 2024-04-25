import React from 'react'
import { useState, useEffect } from 'react'
import moment from "moment";
import { FiPlusCircle } from "react-icons/fi";
import Navbar from './Navbar'
import TodoItem from './TodoItem';
import AddTodoModal from './AddTodoModal'
import DeleteTodoModal from './DeleteTodoModal';
const Todos = () => {

  const [todoList, setTodoList] = useState([]);
  const [isShowTodoPopup, setIsShowTodoPopup] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [todoInputText, setTodoInputText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [currentDateAndTime, setCurrentDateAndTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
  const [time, setTime] = useState(moment().format('YYYY-MM-DDTHH:mm'))

  const showTodoPopup = () => {
    setIsShowTodoPopup(true);
  }
  const hideTodoPopup = () => {
    setIsShowTodoPopup(false);
  }
  const showDeletePopupModal = (id) => {
    setDeleteTodoId(id)
    setIsShowDeleteModal(true)
  }
  const hideDeletePopModal = () => {
    setIsShowDeleteModal(false)
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTodoInputText(value);
    setInputError(!(value.trim() !== ""));
  };
  const handleChangeTime = (e) => {
    console.log(e.target.value, "target");
    setTime(e.target.value)
  }

  const editTodo = (todo) => {
    setEditTodoId(todo.id);
    setTodoInputText(todo.task)
    setTime(todo.time)
    console.log("update", time);
    showTodoPopup();
  }

  const addOrUpdateTodo = () => {
    if (editTodoId) {
      setTodoList(
        todoList.map((t) => {
          if (t.id === editTodoId) {
            return { ...t, task: todoInputText, time: time }
          } else {
            return t;
          }
        })
      )
      setEditTodoId(null)
      setTodoInputText("");
      setTime(moment().format('YYYY-MM-DDTHH:mm'))
      hideTodoPopup();
      // console.log(time);
    } else {
      setTodoList((prevlist) => [
        {
          id: Date.now(),
          task: todoInputText,
          time: time,
          color: "green",
          completed: false,
        },
        ...prevlist
      ])
      setTodoInputText("");
      hideTodoPopup();
      setTime(moment().format('YYYY-MM-DDTHH:mm'))
    }
  }
  const deleteFun = (id) => {

    setTodoList(todoList.filter((todo) => todo.id !== id));
    setDeleteTodoId(null)
    setTodoInputText("");
    hideDeletePopModal();
  }
  useEffect(() => {
    setInterval(() => {
      setCurrentDateAndTime(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, []);

  return (

    <div className="w-full mx-auto relative pb-10 px-3 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <Navbar currentDateAndTime={currentDateAndTime} />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div className="text-3xl text-blue-500 cursor-pointer" onClick={showTodoPopup}>
          <FiPlusCircle />
        </div>
      </div>
      {
        todoList.length === 0 && (
          <h1>Add Todo</h1>
        )
      }
      {
        todoList.map((todo, index) => {
          return <TodoItem
            todo={todo}
            deletePopup={showDeletePopupModal}
            updatePopup={showTodoPopup}
            editTodo={editTodo}
            key={index}
          />
        })
      }
      <AddTodoModal
        show={isShowTodoPopup}
        handleInputChange={handleInputChange}
        todoInputText={todoInputText}
        addOrUpdateTodo={addOrUpdateTodo}
        showTodoPopup={showTodoPopup}
        hideTodoPopup={hideTodoPopup}
        currentDateAndTime={currentDateAndTime}
        time={time}
        inputError={inputError}
        handleChangeTime={handleChangeTime}
      />
      <DeleteTodoModal show={isShowDeleteModal} showDeletePopupModal={showDeletePopupModal} hideDeletePopModal={hideDeletePopModal} deleteFun={deleteFun} id={deleteTodoId} />

    </div>

  )
}

export default Todos
