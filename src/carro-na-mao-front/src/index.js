import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Vistoria from './pages/vistoria';
import Manutencao from './pages/manutencao';
import Arruma from './pages/manut';
import Entrei from './pages/entrei';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"cadastro",
      element:<Cadastro/>
    },
    {
      path:'entrei',
      element:<Entrei/>
    },
    {
      path:'vistoria',
      element:<Vistoria/>
    },
    {
      path:'manutencao',
      element:<Manutencao/>
    },
    {
      path:'arruma',
      element:<Arruma/>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
