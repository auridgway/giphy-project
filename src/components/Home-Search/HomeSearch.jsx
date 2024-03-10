import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import GifCard from './GifCard';
import Stack from '@mui/material/Stack';
import { TextField, FormControl, Button, Typography, Box } from '@mui/material';


function HomeSearch() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const gifs = useSelector(store => store.gifList);

    const searchGifs = () => {

        dispatch({
            type: 'FETCH_GIFS',
            payload: search
        })
        setSearch('');
    }

    const addToFaves = (gifURL, gifName) => {
        dispatch({
            type: 'ADD_TO_FAVORITES',
            payload: {gifURL, gifName}
        })
    }

    if(gifs.length === 0) {
        return(
            <div>
                <Box>
                    <Typography variant='h4'>Search Gifs</Typography>
                    <FormControl fullWidth>
                        <TextField value={search} onChange={(e) => setSearch(e.target.value)} label="Set Search" color="primary" focused />
                        <Button onClick={searchGifs} variant="contained" color="success">Search</Button>
                    </FormControl>
                </Box>
            <h1 align='center'>Search a Gif!</h1>
            </div>
        )
    }

    return(
        <div>
                <Box>
                    <Typography variant='h4'>Search Gifs</Typography>
                    <FormControl fullWidth>
                        <TextField value={search} onChange={(e) => setSearch(e.target.value)} label="Set Search" color="primary" focused />
                        <Button onClick={searchGifs} variant="contained" color="success">Search</Button>
                    </FormControl>
                </Box>
        <Stack direction="row" spacing={7} useFlexGap flexWrap="wrap">
            {gifs.map((gif) => (
                <GifCard key={gif.id} gif={gif} addToFaves={addToFaves} />
            ))}
        </Stack>
        </div>
    )
}

export default HomeSearch;