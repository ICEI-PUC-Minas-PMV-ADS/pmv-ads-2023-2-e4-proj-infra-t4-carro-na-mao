import axios from 'axios';
import { useEffect, useState } from 'react';
import{Menu} from './menu';
/*import '../estilos/dashboard.css'*/



function Dashboard(){

    return(
        <div id="fundoDashboard">
        <Menu/>
        <iframe title="dashboard-carro-na-mao" width="1360" height="548" src="https://app.powerbi.com/view?r=eyJrIjoiNDVmMjQ3ZDMtODM3Ny00NDI0LTkwMzktODhhN2YwYjc4NjUyIiwidCI6IjE0Y2JkNWE3LWVjOTQtNDZiYS1iMzE0LWNjMGZjOTcyYTE2MSIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    );
}

export default Dashboard;