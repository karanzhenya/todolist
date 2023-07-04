import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import AddItemForm from "./Components/AddItemForm";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskStatusTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./state/store";
import {taskApi, TaskStatuses} from "./api/task-api";
import {AppInitialStateType, setAppErrorAC} from "./state/app-reducer";
import {Preloader} from "./Components/Preloader/Preloader";
import ErrorSnackbar from "./Components/ErrorSnackbar/ErrorSnackbar";
import {TodolistDomainType} from "./api/todolist-api";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const tasks = useSelector<RootState, TaskStateType>(state => state.tasks)
    const todolists = useSelector<RootState, TodolistDomainType[]>(state => state.todolists)
    const app = useSelector<RootState, AppInitialStateType>(state => state.app)
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

    const removeErrorMessage = useCallback(() => {
        dispatch(setAppErrorAC(''))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    return (
        <div className="App">
            {
                app.status === 'loading' && <Preloader/>
            }
            <AddItemForm addItem={addTodolist}/>
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
                                 changeTodolistTitle={changeTodolistTitle}
                                 changeTaskTitle={changeTaskTitle}/>
            })}
            <ErrorSnackbar error={app.error} removeErrorMessage={removeErrorMessage}/>
        </div>
    );
}

export default App;