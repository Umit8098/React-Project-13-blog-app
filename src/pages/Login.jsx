import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
    
    const dispatch = useDispatch();

    return (
        <Button 
            variant="contained"
            onClick={()=>{
                dispatch(loginSuccess({email: "test@test.com"}))
            }}
        >
            Mock Login
        </Button>
    )
};

export default Login;