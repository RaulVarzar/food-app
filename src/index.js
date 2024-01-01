import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartContextProvider} from './store/CartContext.jsx';
import { UserProgressProvider } from './store/UserProgress.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProgressProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgressProvider>
  </React.StrictMode>
);
