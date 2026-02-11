import { 
    Box, 
    Typography, 
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Stack,
 } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../firebase/postService";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Fetch posts error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box maxWidth="400px" mx="auto" mt={4}>
            {posts.map((post) => (
                <Card 
                    key={post.id} 
                    sx={{ mb: 4 }}
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {/* Image */}
                    {post.imageURL && (
                        <CardMedia
                            component="img"
                            height="240"
                            image={post.imageURL}
                            alt={post.title}
                        />
                    )}

                    <CardContent>
                        {/* Author Info */}
                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Avatar src={post.authorPhotoURL} alt={post.authorName}>
                                {post.authorName?.[0]}
                            </Avatar>
                            <Box>
                                <Typography fontWeight="bold">
                                    {post.authorName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.createdAt?.toDate().toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Stack>
                        {/* Title */}
                        <Typography variant="h6"  gutterBottom>
                            {post.title}
                        </Typography>

                        {/* Content Preview */}
                        <Typography variant="body2" color="text.secondary">
                            {post.content.slice(0, 150)}... 
                        </Typography>

                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Home;