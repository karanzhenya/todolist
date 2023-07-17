import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {FilterValueType} from "../../../app/App";
import AddItemForm from "../../../Components/AddItemForm/AddItemForm";
import EditableSpan from "../../../Components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/task-api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store";
import {fetchTaskTC} from "../../../state/tasks-reducer";
import {RequestStatusType} from "../../../state/app-reducer";
import s from './Todolist.module.css'
import trash from '../../../files/trash.svg'

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    entityStatus: RequestStatusType
    todolistId: string
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    addTodolist: (title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    setActive: (isActive: boolean) => void
}


const Todolist = React.memo(function ({
                                          title,
                                          tasks,
                                          filter,
                                          entityStatus,
                                          todolistId,
                                          removeTask,
                                          addTask,
                                          changeTaskStatus,
                                          changeTaskTitle,
                                          changeFilter,
                                          removeTodolist,
                                          setActive,
                                          changeTodolistTitle
                                      }: TodolistPropsType) {
    const dispatch: AppDispatch = useDispatch()

    const addNewTask = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [todolistId, addTask])
    const changeTodoTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId])

    let taskForTodolist = tasks

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    useEffect(() => {
        dispatch(fetchTaskTC(todolistId))
    }, [dispatch, todolistId])
    return (
        <div className={s.todolist}>
            <AddItemForm placeholder={'Task name'} addItem={addNewTask} disabled={!!entityStatus}/>
            <div className={s.todolist_block}>
                <div className={s.todolist_main_info}>
                    <div className={s.todolist_title}>
                        <EditableSpan title={title} onChange={changeTodoTitleHandler} disabled={!!entityStatus}/>
                        <img className={s.remove_button} src={trash} onClick={() => removeTodolist(todolistId)}
                             aria-disabled={!!entityStatus}/>
                    </div>
                    <div className={s.todolist_create_new} onClick={() => setActive(true)}>+ Create new todolist</div>
                </div>
                <ul className={s.tasks}>
                    {taskForTodolist.map(t => {
                        return <Task key={t.id} todolistId={todolistId} task={t}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTaskStatus={changeTaskStatus} removeTask={removeTask}/>
                    })}
                </ul>
                <div className={s.filters}>
                    <button className={filter === 'all' ? s.active_filter : ''}
                            onClick={() => changeFilter(todolistId, 'all')}>All
                    </button>
                    <button className={filter === 'active' ? s.active_filter : ''}
                            onClick={() => changeFilter(todolistId, 'active')}>Active
                    </button>
                    <button className={filter === 'completed' ? s.active_filter : ''}
                            onClick={() => changeFilter(todolistId, 'completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    )

})

export default Todolist

