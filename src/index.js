import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux' //, applyMiddleware, compose
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { unregister } from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

unregister();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
    console.group(action.type);
    console.log("dispatching", action);
    let result = next(action)
    //console.log("store after");
    //console.log(store.getState())
    console.groupEnd(action.type);
    return result
}

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
