import React, { useState , useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ToDo = () => {
    const[todoList,SetTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const [filter, setFilter] = useState("all");
    const [currentEdit, setCurrentEdit] = useState(null);
    const inputRef = useRef();

   //Update localstorage
   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
   }, [todoList]);

    const addTask = () => {
       const inputText = inputRef.current.value.trim();
       if(inputText===""){
        return null;
       }
       if (currentEdit) {
        SetTodoList((prev) =>
            prev.map((todo) =>
                todo.id === currentEdit.id ? { ...todo, text: inputText } : todo
            )
        );
        setCurrentEdit(null);
    } else {
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        SetTodoList((prev) => [...prev, newTodo]);
    }
    inputRef.current.value = "";
};

const handleEditClick = (todo) => {
    setCurrentEdit(todo);
    inputRef.current.value = todo.text;
    inputRef.current.focus();
};


    const toggleTask = (id) => {
        SetTodoList((prev) => {
            return prev.map((todo) => {
                if (id === todo.id) {
                    return {...todo, isComplete: !todo.isComplete };
                }
                return todo;
            })
        })
    }

    

    const deleteTodo = (id) => {
        SetTodoList((prev) => {
          return prev.filter((todo) => todo.id !== id);  
        })
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        SetTodoList(items);
    };

    const filteredTodos = todoList.filter((todo) =>
        filter === "all" ? true : filter === "completed" ? todo.isComplete : !todo.isComplete
    );

  return (
    <>
      <div className="w-[30-rem]">
        <h1 className="text-lg my-2 font-medium text-amber-500">To-Do-List</h1>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className="py-3 px-4 w-full text-sm border-none focus:outline-none bg-white rounded-sm"
              placeholder="Add your task"
            />
          </div>
          <button
            className="py-3 px-4 bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium rounded-sm"
            onClick={addTask}
          >
            {" "}
            {currentEdit ? "Update Task" : "Add Task"}
          </button>
        </div>

        <div className="flex gap-2 my-4">
           <button
            onClick={() => setFilter("all")}
            className="text-sm bg-white px-2 py-1 font-medium rounded-sm focus:bg-amber-600 focus:text-white"
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="text-sm bg-white px-2 py-1 font-medium rounded-sm focus:bg-amber-600 focus:text-white"
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className="text-sm bg-white px-2 py-1 font-medium rounded-sm focus:bg-amber-600 focus:text-white"
          >
            Incomplete
          </button>
    
        </div>
      </div>
      <div className="w-[30-rem] bg-white shadow py-6 px-4 rounded-sm">
        <fieldset className="space-y-4">
          <legend className="text-black-600 font-medium">List of tasks</legend>
          {todoList.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks found</p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todoList">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={String(todo.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem
                              text={todo.text}
                              isComplete={todo.isComplete}
                              id={todo.id}
                              toggleTask={toggleTask}
                              deleteTodo={deleteTodo}
                              handleEditClick={handleEditClick}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </fieldset>
      </div>
    </>
  );
};

export default ToDo;
