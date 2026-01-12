import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../features/auth/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <Box 
            mt={4}
            sx={{
                width: "300px",
                margin: "auto"
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField 
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <Button 
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;





// import { Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../features/auth/authSlice";

// const Login = () => {
    
//     const dispatch = useDispatch();

//     return (
//         <Button 
//             variant="contained"
//             onClick={()=>{
//                 dispatch(loginSuccess({email: "test@test.com"}))
//             }}
//         >
//             Mock Login
//         </Button>
//     )
// };

// export default Login;