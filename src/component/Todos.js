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
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false); // State for showing/hiding delete todo modal
  const [todoInputText, setTodoInputText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [dateError,setDateError] = useState(false)
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [currentDateAndTime, setCurrentDateAndTime] = useState(moment().format('YYYY-MM-DDTHH:mm'))   // State for current date and time
  const [time, setTime] = useState(moment().format('YYYY-MM-DDTHH:mm'))

 // Function to show add todo modal
  const showTodoPopup = () => {
    setIsShowTodoPopup(true);
    setTime(moment().format('YYYY-MM-DDTHH:mm'))  // Reset time when showing popup
  }
   // Function to hide add todo modal
  const hideTodoPopup = () => {
    setIsShowTodoPopup(false);
    setTime(moment().format('YYYY-MM-DDTHH:mm'))
    setTodoInputText("")
  }

    // Function to show delete todo modal
  const showDeletePopupModal = (id) => {
    setDeleteTodoId(id)
    setIsShowDeleteModal(true)
  }
  // Function to hide delete todo modal
  const hideDeletePopModal = () => {
    setIsShowDeleteModal(false)
  }
  // Function to handle input change in add todo modal
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTodoInputText(value);
    setInputError((value.trim() === ""));    // Set input error
  };

   // Function to handle time change in add todo modal
  const handleChangeTime = (e) => {
    setTime(e.target.value)
  }

  // Function to edit a todo item
  const editTodo = (todo) => {
    showTodoPopup();
    setEditTodoId(todo.id);
    setTodoInputText(todo.task)
    setTime(todo.time)
    
  }
// Function to add or update a todo item
  const addOrUpdateTodo = () => {
    const currentTime = moment();
    const selectedTime = moment(time);
  
    if (selectedTime.isBefore(currentTime)  ) {
      setDateError(true);   // Set date error if selected time is before current time
      
      return;
    } else {
      setDateError(false); 
     
    }
    if(todoInputText.trim() === ""){
      setInputError(true);   // Set input error if input text is empty
      return;
    }
    else{
      setInputError(false);
    }

    if (editTodoId) {                 
      // Add or update todo item
      setTodoList(
        todoList.map((t) => {
          if (t.id === editTodoId) {
            return { ...t, task: todoInputText.trim(), time: time }
          } else {
            return t;
          }
        })
      )
      setEditTodoId(null)
      setTodoInputText("");
      setTime(moment().format('YYYY-MM-DDTHH:mm'))
      hideTodoPopup();
    } else {
      setTodoList((prevlist) => [       // Add new todo item
        {
          id: Date.now(),
          task: todoInputText.trim(),
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
   // Function to delete a todo item
  const deleteFun = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
    setDeleteTodoId(null)
    setTodoInputText("");
    hideDeletePopModal();
  }
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

    <div className="w-full mx-auto relative pb-10 px-3 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <Navbar currentDateAndTime={currentDateAndTime} />
      <div className="flex justify-between items-center mt-2 mb-6">
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
            TodoCompleteTask={TodoCompleteTask}
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
        hideTodoPopup={hideTodoPopup}
        time={time}
        inputError={inputError}
        dateError={dateError}
        handleChangeTime={handleChangeTime}
      />
      <DeleteTodoModal
        show={isShowDeleteModal}
        showDeletePopupModal={showDeletePopupModal}
        hideDeletePopModal={hideDeletePopModal}
        deleteFun={deleteFun} id={deleteTodoId}
      />

    </div>

  )
}

export default Todos
