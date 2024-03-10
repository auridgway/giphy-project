import { useDispatch, useSelector } from "react-redux";
import FavoritesItem from '../FavoritesItem/FavoritesItem';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export default function Favorites() {
    const dispatch = useDispatch();

    const favoriteList = useSelector(store => store.favoritesList);

    const removeFavorite = (e) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: e.target.dataset.favid });
    }

    console.log("favorites list", favoriteList);


    if (favoriteList.length === 0) {
        return (
            <Box sx={{
                display: 'flex', alignItems: "center", justifyContent: "center", minHeight: '50vh'
            }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <>
            <div>
                <h1>FAVORITES</h1>
            </div>
            <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {favoriteList.map((fav, i) => < FavoritesItem key={i} fav={fav} removeFavorite={removeFavorite} />)}
            </Stack>

        </>
    )
}