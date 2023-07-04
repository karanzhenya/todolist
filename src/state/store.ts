import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch, ThunkAction} from 'redux-thunk'
import {appReducer, CommonActionsType} from "./app-reducer";

const rootReducers = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

type AppActionsType = TodolistsActionsType | TasksActionsType | CommonActionsType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store