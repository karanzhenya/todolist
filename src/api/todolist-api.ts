import axios from 'axios'
import {FilterValueType} from "../App";
import {RequestStatusType} from "../state/app-reducer";

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TodolistDomainType = TodolistResponseType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export type ResponseType<D> = {
    resultCode: number
    messages: [string],
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'e99964a2-8337-4f81-ba58-71d55aafe3d3'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>('')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>('/', {title})
    },
    updateTodolist(title: string, todolistId: string) {
        return instance.put<ResponseType<{}>>(`/${todolistId}`, {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/${todolistId}`)
    }
}