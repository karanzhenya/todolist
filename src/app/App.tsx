import React, {useCallback} from 'react';
import s from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {AppInitialStateType, setAppErrorAC} from "../state/app-reducer";
import {Preloader} from "../Components/Preloader/Preloader";
import ErrorSnackbar from "../Components/ErrorSnackbar/ErrorSnackbar";
import Navbar from "../Components/Navbar/Navbar";
import {Routes} from 'react-router-dom';
import TodolistsList from "../features/TodolistsList/TodolistsList";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const dispatch: AppDispatch = useDispatch()
    const app = useSelector<RootState, AppInitialStateType>(state => state.app)
    const removeErrorMessage = useCallback(() => {
        dispatch(setAppErrorAC(''))
    }, [dispatch])

    return (
        <div className={s.app}>
            <Routes>

            </Routes>
            {
                app.status === 'loading' && <Preloader/>
            }
            <Navbar/>
            <TodolistsList/>
            <ErrorSnackbar error={app.error} removeErrorMessage={removeErrorMessage}/>
        </div>
    );
}

export default App;
