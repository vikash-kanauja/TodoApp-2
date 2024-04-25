import React from 'react'

const DeleteTodoModal = ({show,deleteFun ,hideDeletePopModal,id}) => {
  return (
<>
    { 
    show  && (
      <div className="absolute text-center mx-auto w-[80%] top-[30%] left-[10%] bg-white border-2 px-2 py-4 rounded ">
        <p className="text-2xl text-left w-[80%] mx-auto mb-6">Delete</p>
        <p className="text-base text-left w-[80%] mx-auto mb-6">
          Are you sure you want to delete this item ?
        </p>
        <div className="flex justify-between w-[80%] mx-auto text-lg">
          <button
            className="px-4 py-1 border rounde"
          onClick={()=>hideDeletePopModal()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 border rounded bg-red-500 text-white"
          onClick={() => deleteFun(id)}
          >
            Delete
          </button>
        </div>
      </div>)
    }
    </>
  )
        

};


export default DeleteTodoModal
