import { Provider } from 'react-redux';

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

export type RootState = ReturnType<typeof store.getState>;

