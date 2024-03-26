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
import { tasks as taskEnpoint } from '@/js/endpoints.js';
import instance from '@/js/configAxios.js';
//my components
import TaskItem from '@/components/Task/Item.jsx';
//icons
import AddIcon from '@mui/icons-material/Add';
function Task() {
    const { setTitle, showAlertFrom } = useLayoutContext();
    const [list, setList] = useState([]);
    const [totalPage, setTotal] = useState(0);
    const [actualPage, setPage] = useState(1);
    let user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        setTitle('ToDoList: '+ user.name);
        read(actualPage);
    }, []);
    useEffect(() => {
        if(totalPage == 1 && actualPage > 1){
            read(1);
        }
    }, [totalPage]);

    function paginate(event, page) {
        read(page);
        
    }

    async function create(event) {
        event.preventDefault();
        const axios = await instance();
        axios({
            method: 'POST',
            url: taskEnpoint.create,
            data: {
                id: user.id,
                task: event.target.task.value,
            },
        }).then((result) => {
            // showAlertFrom(result.data);
            read(actualPage);
            if (result.data.status == 'success') {
                event.target.task.value = '';
            }
        });
    }
    async function read(page = 1) {
        const axios = await instance();
        axios({
            method: 'GET',
            url: taskEnpoint.list,
            params: {
                id: user.id,
                page: page,
                limit: 10
            },
        }).then((result) => {
            setList(result.data.list);
            setTotal(result.data.total);
            setPage(page);
        });
    }
    return (
        <div>
            <form onSubmit={create}>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    <div className={style.pagination}>
                        <Stack spacing={2}>
                            {
                                totalPage > 1 ? (
                                    <Pagination count={totalPage} defaultPage={actualPage} color="primary" onChange={paginate} />
                                ) : null
                            }
                        </Stack>
                    </div>
                </Grid>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    {list && list.length > 0 ? list.map((item, index) => (
                        <TaskItem className={style.list_task} item={item} key={index} onFinish={read} page={actualPage}></TaskItem>
                    )) : null}
                </Grid>
                <Grid item sm={12} sx={{ marginTop: '15px' }}>
                    <FormControl sx={{ width: '100%' }} >
                        <InputLabel htmlFor="outlined-new-item">Novo Item</InputLabel>
                        <OutlinedInput id="outlined-new-item" name='task'
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