import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import App from './App';
import './Login.css';

import {
    HashRouter,
    Route
  } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div className="Login">
        <HashRouter>
            <div >
                <Route path="/" exact     component={ Login } />
                <Route path="/app/:username/:server"  component={ App } />
            </div>
        </HashRouter>
    </div>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
