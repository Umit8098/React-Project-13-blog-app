import { Box, Typography, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { createPost } from "../firebase/postService";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreatePost = async () => {
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        try {
            setLoading(true);
            const newPost = await createPost({ title, content, user });
            console.log("Post created:", newPost);
            // Redirect to home or post detail page after creation
            navigate("/");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        };
    };
    
    return (
        <Box sx={{
            maxWidth: 600, 
            mx: "auto",
            mt: 6
        }}>
            <Typography variant="h5" gutterBottom>
                Create Post
            </Typography>
            <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
            <TextField
                fullWidth
                label="Content"
                margin="normal"
                multiline
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)} 
            />
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleCreatePost}
                disabled={loading}
            >
                {/* {loading ? "Creating..." : "Create Post"} */}
                Publish
            </Button>
        </Box>
    );
};

export default CreatePost;
