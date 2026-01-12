import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "./authService";

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await registerUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await logoutUser();
    }
);


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // loginStart: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // loginSuccess: (state, action) => {
        //     state.loading = false;
        //     state.user = action.payload;
        //     state.isAuthenticated = true;
        // },
        // loginFail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        // logout: (state) => {
        //     state.user = null;
        //     state.isAuthenticated = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true; 
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

// export const { 
//     loginStart,
//     loginSuccess,
//     loginFail,
//     logout,
// } = authSlice.actions;

export default authSlice.reducer;