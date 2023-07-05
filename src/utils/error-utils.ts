import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../api/todolist-api'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error!'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}