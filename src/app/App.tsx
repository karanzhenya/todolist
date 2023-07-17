import React, {useCallback, useState} from 'react';
import s from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {AppInitialStateType, setAppErrorAC} from "../state/app-reducer";
import {Preloader} from "../Components/Preloader/Preloader";
import ErrorSnackbar from "../Components/ErrorSnackbar/ErrorSnackbar";
import Navbar from "../features/Navbar/Navbar";
import {Routes, Route, Navigate} from 'react-router-dom';
import TodolistsList from "../features/TodolistsList/TodolistsList";
import Login from "../features/Login/Login";
import Page404 from "../features/Page404/Page404";
import logo from '../files/Logo.svg'
import Header from "../features/Header/Header";
import Modal from "../Components/Modal/Modal";
import AddItemForm from "../Components/AddItemForm/AddItemForm";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const dispatch: AppDispatch = useDispatch()
    const app = useSelector<RootState, AppInitialStateType>(state => state.app)
    const removeErrorMessage = useCallback(() => {
        dispatch(setAppErrorAC(''))
    }, [dispatch])

    return (
        <div className={s.app}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
            {
                app.status === 'loading' && <Preloader/>
            }
            <ErrorSnackbar error={app.error} removeErrorMessage={removeErrorMessage}/>
        </div>
    );
}

export default App;

