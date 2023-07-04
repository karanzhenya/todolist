import React, {useCallback, useEffect} from "react";
import {FilterValueType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/task-api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../state/store";
import {fetchTaskTC} from "../state/tasks-reducer";
import {RequestStatusType} from "../state/app-reducer";

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
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
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
    }, [])
    return (
        <div>
            <div style={{display: "flex"}}>
                <EditableSpan title={title} onChange={changeTodoTitleHandler}/>
                <button onClick={() => removeTodolist(todolistId)} disabled={!!entityStatus}>X</button>
            </div>
            <AddItemForm addItem={addNewTask}  disabled={true}/>
            <ul>
                {taskForTodolist.map(t => {
                    return <Task key={t.id} todolistId={todolistId} task={t}
                          changeTaskTitle={changeTaskTitle}
                          changeTaskStatus={changeTaskStatus} removeTask={removeTask}/>
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilter(todolistId, 'all')}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilter(todolistId, 'active')}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilter(todolistId, 'completed')}>Completed
                </button>
            </div>
        </div>
    )

})

export default Todolist

