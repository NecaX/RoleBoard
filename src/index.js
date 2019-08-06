import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import './Util.js';
import App from './App';
import SelectGameMode from './SelectGameMode';
import CreateCharacter from './CreateCharacter';

import {
    HashRouter,
    Route
  } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div className="root">
        <HashRouter>
            <div >
                <Route path="/" exact     component={ Login } />
                <Route path="/sgm/:username/"  component={ SelectGameMode } />
                <Route path="/cch"  component={ CreateCharacter } />
                <Route path="/app/:username/:password"  component={ App } />
            </div>
        </HashRouter>
    </div>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
