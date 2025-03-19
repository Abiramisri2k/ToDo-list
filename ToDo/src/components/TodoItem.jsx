import React from 'react';

const TodoItem = ({text, isComplete, id, toggleTask, deleteTodo, handleEditClick}) => {
  return (
    <div>
      <div className='flex justify-between items-center gap-4'>
                <label className={ `hover:bg-slate-100 flex-1 p-2 rounded-md select-none ${isComplete ? "line-through text-slate-600" : ""}`} onClick={() => toggleTask(id)} >{text}</label>
                <div className='flex justify-between items-center gap-4'>
                <div onClick={() => handleEditClick({ id, text })}>
                    <svg className='hover:fill-amber-400 cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                     <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
                   </div>
                 <div onClick={() => deleteTodo(id)}>
                   <svg className='hover:fill-red-700 cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> </svg>
                    </div> 
                    
                 
                </div>
            </div>
    </div>
  );
}

export default TodoItem;
