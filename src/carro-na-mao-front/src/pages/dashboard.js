import axios from 'axios';
import ApexCharts from 'apexcharts'
import { useEffect, useState } from 'react';
import{Menu} from './menu';

function Dashboard(){

    return(
        <>
        <Menu/>
        <h1>Dashboard</h1>
       
        <iframe title="dashboard-carro-na-mao" width="1900" height="760" src="https://app.powerbi.com/view?r=eyJrIjoiNDVmMjQ3ZDMtODM3Ny00NDI0LTkwMzktODhhN2YwYjc4NjUyIiwidCI6IjE0Y2JkNWE3LWVjOTQtNDZiYS1iMzE0LWNjMGZjOTcyYTE2MSIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>
        </>
    );
}

export default Dashboard;