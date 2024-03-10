import React from 'react';

// MUI imports to make the card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function FavoritesItem({fav, removeFavorite }){
   
    return(
        <Card  sx={{ width: 345 }} className="card">
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={fav.url}
                alt={fav.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {fav.title}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button data-favid={fav.id} onClick={removeFavorite} size="small" color="primary">
            🗑️❌🚫
            </Button>
        </CardActions>
    </Card>
    )
}