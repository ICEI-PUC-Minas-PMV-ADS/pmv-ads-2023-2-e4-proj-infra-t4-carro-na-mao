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
import Vistoria2 from './pages/vistoria2';
import Manutencao from './pages/manutencao';
import Estoque from './pages/estoque';
import Historico from './pages/historico';
import Infracoes from './pages/infracoes';
import Avaliacoes from './pages/avaliacoes';
import Notificacoes from './pages/notificacoes';
import reportWebVitals from './reportWebVitals';
import Categoria from './pages/categoria';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';



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
      path:'vistoria2',
      element:<Vistoria2/>
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
      path:'infracoes',
      element:<Infracoes/>
    },
    {
      path:'historico',
      element:<Historico/>
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
