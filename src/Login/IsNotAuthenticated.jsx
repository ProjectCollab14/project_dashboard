import {Outlet, Navigate} from 'react-router-dom'
const IsNotAuthenticated = ({authenticated})=>{
        if(!authenticated) return <Outlet />
        else return <Navigate to="/dashboard" />
}
export default IsNotAuthenticated