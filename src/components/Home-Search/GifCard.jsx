import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GifCard({ gif, addToFaves }) {
    const [isFave, setIsFave] = useState(false);
    

    return (
        <Card sx={{ width: 345 }} className="card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={gif.images.original.url}
                    alt={gif.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {gif.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => {
                    setIsFave(true);
                    addToFaves(gif.images.original.url, gif.title);
                    }}>
                {isFave ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Button>
            </CardActions>
        </Card>
    );
}

export default GifCard;
