import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Home2 from './pages/home2';
import Dashboard from './pages/dashboard';
import Locacao from './pages/locacao';
import Vistoria from './pages/vistoria';
import Manutencao from './pages/manutencao';
import Estoque from './pages/estoque';
import Historico from './pages/historico';
import Infracoes from './pages/infracoes';
import Reservas from './pages/reservas';
import Avaliacoes from './pages/avaliacoes';
import Notificacoes from './pages/notificacoes';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Categoria from './pages/categoria';
import Localizacao from './pages/localizacao';

const router = createBrowserRouter([
    
  {
    path:"/",
    element:<Home/>
  },{
      path:"/home2",
      element:<Home2/>
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
      path:'locacao',
      element:<Locacao/>
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
    },
    {
      path:'infracoes',
      element:<Infracoes/>
    },
    {
      path:'reservas',
      element:<Reservas/>
    },
    {
      path:'avaliacoes',
      element:<Avaliacoes/>
    },
    {
      path:'notificacoes',
      element:<Notificacoes/>
    },
    
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
