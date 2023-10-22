import axios from 'axios';

import { useEffect, useState } from 'react';
import{Menu} from './menu';

function Dashboard(){

    return(
        <>
        <Menu/>
        <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;