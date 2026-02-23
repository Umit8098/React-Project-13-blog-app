import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { keyframes } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { getPostById, deletePost, toggleLikePost } from "../firebase/postService";
import { useSelector } from "react-redux";

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isOwner = user && post && user.uid === post.authorId;
  const isLiked = Boolean(user && post && post.likes?.includes(user.uid));

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

  const handleLike = async () => {
    if (!user || isOwner) return;

    await toggleLikePost(post.id, user.uid, isLiked);

    setPost((prev) => ({
      ...prev,
      likes: isLiked
        ? prev.likes.filter((uid) => uid !== user.uid)
        : [...prev.likes, user.uid],
    }));
  };

  const handleDelete = async () => {
    if (!post?.id || !user) return;

    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await deletePost(post.id, post.imagePath);
      navigate("/");
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!post) return <Typography>Post not found.</Typography>;

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      sx={{
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
        px: 2,
        py: 3,
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar src={post.authorPhotoURL}>
          {post.authorName?.[0]}
        </Avatar>

        <Box>
          <Typography fontWeight="bold" fontSize={15}>
            {post.authorName}
          </Typography>

          <Typography fontSize={13} color="text.secondary">
            {post.createdAt?.toDate?.().toLocaleDateString()}
          </Typography>
        </Box>
      </Stack>

      {/* Content */}
      <Typography fontSize={15} lineHeight={1.8} mb={2}>
        {post.content}
      </Typography>

      {/* Image */}
      {post.imageURL && (
        <Box mb={2}>
          <img
            src={post.imageURL}
            alt=""
            style={{
              width: "100%",
              borderRadius: 16,
              maxHeight: 500,
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      {/* Like Section */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <IconButton
          size="small"
          disabled={!user || isOwner}
          onClick={handleLike}
          sx={{
            transition: "transform 0.15s ease, color 0.15s ease",
            "&:active": { transform: "scale(1.3)" },
            "&:hover": { color: "error.main" },
          }}
        >
          {isLiked ? (
            <FavoriteIcon
              fontSize="small"
              color="error"
              sx={{ animation: `${pop} 0.2s ease` }}
            />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>

        <Typography
          fontSize={13}
          sx={{
            transition: "transform 0.15s ease",
            transform: isLiked ? "scale(1.2)" : "scale(1)",
          }}
        >
          {post.likes?.length || 0}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Owner Actions */}
      {isOwner && (
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/edit-post/${post.id}`)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default PostDetail;