import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Box from "@mui/material/Box"

const Layout = ({ children, mode, toggleTheme }) => {
    return (
        <>
            <Navbar mode={mode} toggleTheme={toggleTheme} />
            <Container maxWidth="lg">
                <Box mt={4}>{ children }</Box>
                {/* { children } */}
            </Container>
        </>
    );
};

export default Layout;
