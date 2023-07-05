export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: string
}

export type SetAppStatusActionType = {
    type: 'SET-APP-STATUS'
    status: RequestStatusType
}
export type SetAppErrorActionType = {
    type: 'SET-APP-ERROR'
    error: string
}

export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType

const initialState: AppInitialStateType = {
    status: "idle",
    error: ''
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case "SET-APP-STATUS": {
            return {...state, status: action.status}
        }
        case "SET-APP-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType): SetAppStatusActionType => {
    return {type: 'SET-APP-STATUS', status}
}
export const setAppErrorAC = (error: string): SetAppErrorActionType => {
    return {type: 'SET-APP-ERROR', error}
}