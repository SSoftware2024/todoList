import React, { useState, useEffect } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import style from '@/css/pages/task.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//my components
import TaskItem from '@/components/Task/Item.jsx';
//icons
import AddIcon from '@mui/icons-material/Add';
function Task() {
    const { setTitle } = useLayoutContext();
    const [isEditable, setEditable] = useState(false);
    useEffect(() => {
        setTitle('ToDoList: Demo');
    }, []);
    const list = ['one', 'two', 'three', 'four', 'five', 'six'];

    function paginate(event, page){
        console.log(page);
    }

    function create(event){
        event.preventDefault();
        console.log('create');
    }
    return (
        <div>
            <form onSubmit={create}>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    <div className={style.pagination}>
                        <Stack spacing={2}>
                            <Pagination count={10} color="primary" defaultPage={1} onChange={paginate}/>
                        </Stack>
                    </div>
                </Grid>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    {list.map((item, index) => (
                        <TaskItem className={style.list_task} title={item} key={index}></TaskItem>
                    ))}
                </Grid>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    <FormControl sx={{ width: '100%' }} >
                        <InputLabel htmlFor="outlined-new-item">Novo Item</InputLabel>
                        <OutlinedInput id="outlined-new-item" 
                            sx={{ width: '100%' }} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        type='submit'
                                        edge="end"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            } />
                    </FormControl>
                </Grid>
            </form>
        </div>
    );
}
export default Task;