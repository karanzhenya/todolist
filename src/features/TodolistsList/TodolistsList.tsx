import React, {useCallback, useEffect} from 'react';
import s from "./TodolistsList.module.css";
import AddItemForm from "../../Components/AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskStatusTC} from "../../state/tasks-reducer";
import {TodolistDomainType} from "../../api/todolist-api";
import {TaskStatuses} from "../../api/task-api";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "../../state/todolists-reducer";
import {FilterValueType} from "../../app/App";

function TodolistsList() {

    const tasks = useSelector<RootState, TaskStateType>(state => state.tasks)
    const todolists = useSelector<RootState, TodolistDomainType[]>(state => state.todolists)
    const dispatch: AppDispatch = useDispatch()

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskStatusTC(todolistId, taskId, {title}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistId, taskId, {status}))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])
    return (
        <div className={s.todolists}>
            {/*<div className={s.add_form}>
                <AddItemForm addItem={addTodolist}/>
            </div>*/}
            <div className={s.content}>
                {todolists.map((todo) => {
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
                                     addTodolist={addTodolist}
                                     changeTodolistTitle={changeTodolistTitle}
                                     changeTaskTitle={changeTaskTitle}/>
                })}
            </div>
        </div>
    );
}

export default TodolistsList;