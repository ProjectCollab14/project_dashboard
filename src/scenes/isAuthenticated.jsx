import {Outlet, Navigate} from 'react-router-dom'

const IsAuthenticated=({authenticated})=>{
    if(authenticated) return <Outlet />
    else return <Navigate to="/signin" />
}

export default IsAuthenticated