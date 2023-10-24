import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Home2 from './pages/home2';
import Vistoria from './pages/vistoria';
import Manutencao from './pages/manutencao';
import Arruma from './pages/manut';
import Entrei from './pages/home2';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Arruma from './pages/manut';
const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>

    },   
    {
      path:"home2",
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
