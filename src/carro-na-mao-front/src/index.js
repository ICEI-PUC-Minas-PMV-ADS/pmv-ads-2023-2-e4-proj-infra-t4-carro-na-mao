import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Vistoria from './pages/vistoria';
import Manutencao from './pages/manutencao';
import Arruma from './pages/manut';
import Estoque from './pages/estoque';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Categoria from './pages/categoria';
import Localizacao from './pages/localizacao';

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
      path:'dashboard',
      element:<Dashboard/>
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
    },
    {
      path:'estoque',
      element:<Estoque/>
    },
    {
      path:'categoria',
      element:<Categoria/>
    },
    {
      path:'localizacao',
      element:<Localizacao/>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
