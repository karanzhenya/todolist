import {FilterValueType} from "../App";
import {todolistApi, TodolistDomainType, TodolistResponseType} from "../api/todolist-api";
import {AppDispatch, AppThunk} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    data: TodolistResponseType[]
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTodolist: TodolistResponseType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    id: string
    entityStatus: RequestStatusType
}

export type TodolistsActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType) => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.data.map(d => ({
                ...d,
                filter: sessionStorage.getItem(d.id) === null ? 'all' : sessionStorage.getItem(d.id)
            }))
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.id)
        }
        case 'ADD-TODOLIST':
            sessionStorage.setItem(action.newTodolist.id, 'all')
            return [{
                id: action.newTodolist.id,
                title: action.newTodolist.title,
                order: action.newTodolist.order,
                addedDate: action.newTodolist.addedDate,
                filter: sessionStorage.getItem(action.newTodolist.id)
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let stateCopy = [...state]
            let todo = stateCopy.find(s => s.id === action.id)
            if (todo) {
                todo.filter = action.filter
                sessionStorage.setItem(todo.id, action.filter)
            }
            return stateCopy
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(s => s.id === action.id ? {...s, entityStatus: action.entityStatus} : s)
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const setTodolistsAC = (data: TodolistResponseType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', data}
}
export const addTodolistAC = (newTodolist: TodolistResponseType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newTodolist}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId}
}
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType): ChangeTodolistEntityStatusActionType => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, id: todolistId}
}

export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistApi.removeTodolist(todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).finally(() => dispatch(changeTodolistEntityStatusAC(todolistId, 'idle')))
    }
}

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodolist(title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.updateTodolist(title, todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}