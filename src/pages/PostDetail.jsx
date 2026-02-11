import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Avatar,
    Stack,
    CardMedia,
    Divider,
} from "@mui/material";
import { getPostById } from "../firebase/postService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { deletePost } from "../firebase/postService";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // const isOwner = user?.uid === post?.authorId;
    const isOwner = user && post && user.uid === post.authorId;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (error) {
                console.error("Fetch post error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this post?");

        if (!confirm) return;
        
        try {
            await deletePost(post.id, user.uid);
            navigate("/"); // Redirect to home page after deletion
        } catch (error) {
            console.error("Delete post error:", error);
            alert("Failed to delete post. Please try again.");
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!post) {
        return <Typography>Post not found.</Typography>;
    }

    return (
        <Box maxWidth="400px" mx="auto" mt={4}>
            {/* Image */}
            {post.imageURL && (
                <CardMedia
                    component="img"
                    height="350"
                    image={post.imageURL}
                    alt="Post Image"
                    sx={{ borderRadius: 2, mb: 3 }}
                />
            )}

            {/* Title */}
            <Typography 
                variant="h4" 
                fontWeight="bold" 
                gutterBottom
            >
                {post.title}
            </Typography>

            {/* Author */}
            <Stack direction="row" alignItems="center" mb={2}>
                <Avatar src={post.authorPhotoURL} />
                <Box>
                    <Typography fontWeight="bold">
                        {post.authorName}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        {post.createdAt?.toDate?.().toLocaleDateString()}
                    </Typography>
                </Box>
            </Stack>

            {/* Owner Actions */}
            {isOwner && (
                <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        onClick={()=> navigate(`/edit-post/${post.id}`)}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            )}

            <Divider sx={{ my: 3 }} />
            {/* Content */}
            <Typography variant="body1" lineHeight={1.8}>
                {post.content}
            </Typography>
            
        </Box>
    );
};

export default PostDetail;