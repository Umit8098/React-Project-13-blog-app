import { 
    Box, 
    Typography, 
    Avatar,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts, toggleLikePost } from "../firebase/postService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/system";

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

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

    const handleLike = async (e, post) => {
        e.stopPropagation(); // card click’i engelle

        if (!user) return;

        const isOwner = user.uid === post.authorId;
        if (isOwner) return;

        const isLiked = post.likes?.includes(user.uid);

        await toggleLikePost(post.id, user.uid, isLiked);

        // optimistic UI update
        setPosts(prev =>
            prev.map(p =>
                p.id === post.id
                    ? {
                        ...p,
                        likes: isLiked
                            ? p.likes.filter(id => id !== user.uid)
                            : [...p.likes, user.uid],
                    }
                    : p
            )
        );
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box maxWidth="600px" mx="auto" sx={{ borderLeft: "1px solid #eee", borderRight: "1px solid #eee" }}>

            {posts.map((post) => {
                const isLiked = user && post.likes?.includes(user.uid);
                const isOwner = user && user.uid === post.authorId;

                return (
                    <Box
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)}
                        sx={{
                            display: "flex",
                            gap: 2,
                            px: 2,
                            py: 2,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "action.hover",
                            },
                        }}
                    >
                        {/* Avatar */}
                        <Avatar src={post.authorPhotoURL}>
                            {post.authorName?.[0]}
                        </Avatar>

                        {/* Content Area */}
                        <Box flex={1}>

                            {/* Header */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography fontWeight="bold" fontSize={14}>
                                    {post.authorName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontSize={13}
                                >
                                    · {post.createdAt?.toDate().toLocaleDateString()}
                                </Typography>
                            </Stack>

                            {/* Text */}
                            <Typography
                                mt={0.5}
                                fontSize={14}
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {post.content}
                            </Typography>

                            {/* Image */}
                            {post.imageURL && (
                                <Box mt={1}>
                                    <img
                                        src={post.imageURL}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            borderRadius: 16,
                                            maxHeight: 400,
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Actions */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                mt={1}
                            >
                                <IconButton
                                    size="small"
                                    disabled={!user || isOwner}
                                    onClick={(e) => handleLike(e, post)}
                                    sx={{
                                        transition: "transform 0.15s ease, color 0.15s ease", 
                                        "&:active": {
                                            transform: "scale(1.3)",
                                        },
                                        "&:hover": {
                                            color: "error.main",
                                        },
                                    }}
                                >
                                    {isLiked ? (
                                        <FavoriteIcon
                                            fontSize="small"
                                            color="error"
                                            sx={{
                                                animation: `${pop} 0.2s ease`,
                                            }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            fontSize="small"
                                        />
                                    )}
                                </IconButton>

                                <Typography
                                    variant="body2"
                                    // color="text.secondary"
                                    fontSize={13}
                                    sx={{
                                        transition: "transform 0.15s ease",
                                        transform: isLiked ? "scale(1.2)" : "scale(1)",
                                    }}
                                >
                                    {post.likes?.length || 0}
                                </Typography>
                            </Stack>

                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Home;