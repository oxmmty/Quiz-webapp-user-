import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return ( 
        <div className='flex-grow'>
            <nav>
                <ul className='flex gap-3 justify-between p-3 bg-slate-400 rounded-lg shadow-2xl'>
                    <li>
                        <NavLink to="/">All</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ppl">PPL</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pof">POF</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ir">IR</NavLink>
                    </li>
                    <li>
                        <NavLink to="/fr">FR</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default TaskIndicator;