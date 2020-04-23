import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import createStore from './redux/store';

import './style.scss';
import App from './components/App/App';

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

