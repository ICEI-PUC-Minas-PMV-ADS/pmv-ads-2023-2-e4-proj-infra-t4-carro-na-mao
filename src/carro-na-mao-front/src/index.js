import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Vistoria from './pages/vistoria';
import Manutencao from './pages/manutencao';
<<<<<<< Updated upstream
import Arruma from './pages/manut';
=======
import Estoque from './pages/estoque';
import Historico from './pages/historico';
import Multa from './pages/multa';
import Avaliacoes from './pages/avaliacoes';
import Notificacoes from './pages/notificacoes';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      path:'arruma',
      element:<Arruma/>
    }
=======
      path:'estoque',
      element:<Estoque/>
    },
    {
      path:'categoria',
      element:<Categoria/>
    },   
    {
      path:'multa',
      element:<Multa/>
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
    {
      path:'localizacao',
      element:<Localizacao/>
    },
    
>>>>>>> Stashed changes
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
