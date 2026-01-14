import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "../routes/PublicRoute";

// import ProtectedRoute from "./routes/ProtectedRoute";
// import CreatePost from "./pages/CreatePost";


const AppRouter = () => {
    return (
        <BrowserRouter>
        <Layout>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home />}
                />
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                {/* <Route
                    path="/create"
                    element={
                      <ProtectedRoute>
                        <CreatePost />
                      </ProtectedRoute>
                    }
                /> */}
            </Routes>
        </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;