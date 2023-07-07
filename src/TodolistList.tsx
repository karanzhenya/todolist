import {TodolistDomainType} from "./api/todolist-api";
import s from "./App.module.css";
import Todolist from "./Components/Todolist";
import React from "react";

export function TodolistList(props: TodolistDomainType) {
    return <div className={s.content}>
        {/*{props.todolists.map((todo: TodolistDomainType) => {
            let taskForTodolist = tasks[todo.id]
            return <Todolist key={todo.id}
                             title={todo.title}
                             todolistId={todo.id}
                             entityStatus={todo.entityStatus}
                             filter={todo.filter}
                             tasks={taskForTodolist}
                             changeTaskStatus={changeTaskStatus}
                             addTask={addTask}
                             removeTask={removeTask}
                             changeFilter={changeTodolistFilter}
                             removeTodolist={removeTodolist}
                             changeTodolistTitle={changeTodolistTitle}
                             changeTaskTitle={changeTaskTitle}/>
        })}*/}
    </div>
}