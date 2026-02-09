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


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!post) {
        return <Typography>Post not found.</Typography>;
    }

    return (
        <Box maxWidth="800px" mx="auto" mt={4}>
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

            <Divider sx={{ my: 3 }} />
            {/* Content */}
            <Typography variant="body1" lineHeight={1.8}>
                {post.content}
            </Typography>
            
        </Box>
    );
};

export default PostDetail;