import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";


const TodoItem = ({ todo, deletePopup ,updatePopup,editTodo}) => {
  return (
    <div>
      <div className='flex justify-between py-4 border-b'>
        <div className='flex items-center gap-5'>
          <input type='checkbox' className='rounded-full ' />
          <p>{todo.task}</p>
          <p>{todo.time}</p>
        </div>

        <div className='flex justify-center items-center gap-2 '>
          <div className='rounded-full bg-green-500 w-3 h-3'></div>
          <div onClick={()=>deletePopup(todo.id)}><MdDelete className='text-red-500' /></div>
          <div onClick={()=>editTodo(todo)}><MdModeEditOutline /></div>
          
        </div>
      </div>

    </div>
  )
}

export default TodoItem
