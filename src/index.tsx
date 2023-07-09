import React from 'react';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./state/store";
import App from "./app/App";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
