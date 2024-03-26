import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tasks as taskEnpoint } from '@/js/endpoints.js';
import instance from '@/js/configAxios.js';
import { useLayoutContext } from '@context/LayoutContext.jsx';
export default function Item({ className, item, onFinish }) {
    const { setTitle, showAlertFrom } = useLayoutContext();
    const [isEditable, setEditable] = useState(false);
    const [value, setValue] = useState(item.task);
    let user = JSON.parse(localStorage.getItem('user'));


    async function save() {
        const axios = await instance();
        axios({
            method: 'PUT',
            url: taskEnpoint.update,
            data: {
                id: item.id,
                user_id: user.id,
                task: value,
            },
        }).then((result) => {
            showAlertFrom(result.data);
            setEditable(false);
            onFinish();
        });
    }
    async function exclude() {
        const axios = await instance();
        axios({
            method: 'DELETE',
            url: taskEnpoint.delete,
            params: {
                id: item.id,
            },
        }).then((result) => {
            showAlertFrom(result.data);
            onFinish();
        });
    }

    return (
        <div className={className}>
            <div style={{ width: '80%' }}>
                {isEditable ? (
                    <FormControl sx={{ width: '100%', margin: '5px 0' }} >
                        <OutlinedInput id="outlined-new-item"
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ width: '100%' }} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={save}
                                        edge="end"
                                        color='success'
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>
                                </InputAdornment>
                            } value={value} />
                    </FormControl>
                ) : (
                    <h3>{item.task}</h3>
                )}

            </div>
            <div className='icons'>
                {
                    !isEditable ? (
                        <>
                            <IconButton aria-label="delete" color="warning" onClick={() => setEditable(true)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" color="error" onClick={exclude}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton aria-label="delete" color='error' onClick={() => setEditable(false)} style={{ position: 'relative', top: '13px' }}>
                            <CancelIcon />
                        </IconButton>
                    )
                }
            </div>
        </div>
    );
}