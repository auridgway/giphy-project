import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { TextField, InputLabel, MenuItem, Select, FormControl, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
export default function Admin() {

    const categories = useSelector(store => store.categoriesList);
    const [selectedCategoryToRemove, setSelectedCategoryToRemove] = useState('');
    const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState('');
    const [createdCategoryName, setCreatedCategoryName] = useState('');
    const [nameToEdit, setNameToEdit] = useState('');

    const dispatch = useDispatch();

    function removeCategory(id) {
        dispatch({ type: 'REMOVE_CATEGORY', payload: id });
        console.log(id);
        setSelectedCategoryToRemove('');
    }

    const handleEdit = () => {
        console.log([nameToEdit, selectedCategoryToEdit]);
        dispatch({ type: 'EDIT_CATEGORY', payload: [nameToEdit, selectedCategoryToEdit] })
        setNameToEdit('');
    }

    function handleCreate() {
        dispatch({ type: 'CREATE_CATEGORY', payload: createdCategoryName })
        setCreatedCategoryName('');
    }

    const handleChangeRemove = (event) => {
        setSelectedCategoryToRemove(event.target.value);
    }

    const handleChangeEdit = (event) => {
        setSelectedCategoryToEdit(event.target.value);
    }


    return (
        <Container>
            <Stack direction="column" spacing={1.5} useFlexGap >
                <Box>
                    <Typography variant='h4'>Create Categories</Typography>
                    <FormControl fullWidth>
                        <TextField sx={{mb: 2, mt:.5}} value={createdCategoryName} onChange={(e) => setCreatedCategoryName(e.target.value)} label="Set Name" color="primary" focused />
                        <Button onClick={handleCreate} variant="contained" color="success">Create Category</Button>
                    </FormControl>
                </Box>
                <hr />
                <Box>
                    <Typography variant='h4'>Edit Category</Typography>
                    <FormControl fullWidth>
                        <InputLabel >Select a Category</InputLabel>
                        <Select
                            label="Category"
                            value={selectedCategoryToEdit}
                            onChange={handleChangeEdit}
                        >
                            {categories.length === undefined ? '' : categories.map((item, i) => <MenuItem key={i} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                        <TextField sx={{mt: 2}} value={nameToEdit} onChange={(e) => setNameToEdit(e.target.value)} label="Change Name" color="primary" focused />
                        <Button sx={{my: 2}} variant="contained" onClick={handleEdit}>Submit</Button>
                    </FormControl>
                </Box>
                <hr />
                <Box>
                    <Typography variant='h4'>Remove Categories</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Category to Remove</InputLabel>
                        <Select
                            label="Category"
                            value={selectedCategoryToRemove}
                            onChange={handleChangeRemove}
                        >
                            {categories.length === undefined ? '' : categories.map((item, i) => <MenuItem key={i} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                        <Button sx={{my: 2}} variant="contained" color="error" onClick={() => removeCategory(selectedCategoryToRemove)}>Remove 🗑️</Button>
                    </FormControl>
                </Box>
            </Stack>
        </Container>
    );
}