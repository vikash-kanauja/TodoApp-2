import React from 'react'
import moment from "moment";

const AddTodoModal = ({show ,todoInputText ,showTodoPopup,dateError,inputError,hideTodoPopup,handleInputChange,handleChangeTime,addOrUpdateTodo,time}) => {
  const dateTimePickerMinValue = moment().format("YYYY-MM-DDTHH:mm");
  console.log(time,"Popup time");
  return (
    <>
{show && (<div className="absolute mx-auto w-11/12 top-[15%] left-[4%] bg-white border-2 p-2 rounded ">
                <p className="text-lg font-semibold mb-2 2xl:text-xl 2xl:mb-4">
                </p>
                <textarea
                    name="todoTitle"
                    id="todoTitle"
                    value={todoInputText}
                    onChange={handleInputChange}
                    className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${inputError ? "border-red-500"  : "border-gray-200"}
                        `}
                ></textarea>
                {console.log("op",time)}
                <input
                    type="datetime-local"
                    name="time"
                    id="time"
                    value={time}
                    min={dateTimePickerMinValue}
                    onChange={handleChangeTime}
                    className={`w-full rounded p-2 border-2  ${dateError ? "border-red-500" : "border-gray-200"
                        } 2xl:mt-2 focus:outline-none`}
                />
                <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
                    <button onClick={hideTodoPopup} >Cancel</button> 
                    <button onClick={addOrUpdateTodo} disabled={inputError } >Done</button>
                    
                </div>
            </div>
)
}
    
    </>
  )
}

export default AddTodoModal
