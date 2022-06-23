import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './js/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default class Main {
  static Render() {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

Main.Render();
