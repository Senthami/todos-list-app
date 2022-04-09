import React from "react";
import "./TodoList.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ todos, handleOnDragEnd }) => {
  return (
    <div className="todos-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todosValue">
          {(provided) => (
            <ul
              className="todos-value"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map(({ id, title, completed }, index) => {
                return (
                  <Draggable key={id} draggableId={"" + id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{title}</p>
                        <label className="check-label">
                          <input type="checkbox" checked={completed} disabled />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
