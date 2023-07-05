import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {taskApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppDispatch, RootState} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASKS'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: TaskType[]
}

export type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TaskStateType = {}
export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType) => {
    switch (action.type) {
        case "SET-TASKS": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'REMOVE-TASKS':
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(s => s.id !== action.id)
            return stateCopy
        case "ADD-TASK": {
            let stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case "UPDATE-TASK": {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? {
                ...t, ...action.model
            } : t)
            state[action.todolistId] = newTasksArray
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};

            stateCopy[action.newTodolist.id] = [];

            return stateCopy;
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.data.forEach(d => stateCopy[d.id] = [])
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASKS', id: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: "SET-TASKS", todolistId, tasks}
}

export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskApi.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskApi.removeTask(todolistId, taskId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskApi.createTask(todolistId, title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setAppStatusAC('loading'))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            let model: UpdateTaskModelType = {
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                description: task.description,
                startDate: task.startDate,
                title: task.title,
                deadline: task.deadline,
                ...domainModel
            }
            taskApi.updateTask(todolistId, taskId, model).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
        }
    }
}
