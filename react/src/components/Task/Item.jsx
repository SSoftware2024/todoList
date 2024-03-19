import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function Item({ className, title }) {
    const [isEditable, setEditable] = useState(false);
    const oldTitle = title;
    function save(id = 0) {
        setEditable(false);
    }

    return (
        <div className={className}>
            <div style={{ width: '80%' }}>
                {isEditable ? (
                    <FormControl sx={{ width: '100%', margin:'5px 0' }} >
                        <OutlinedInput id="outlined-new-item"
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
                            } value={title} />
                    </FormControl>
                ) : (
                    <h3>{title}</h3>
                )}

            </div>
            <div className='icons'>
                {
                    !isEditable ? (
                        <>
                            <IconButton aria-label="delete" color="warning" onClick={() => setEditable(true)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton aria-label="delete" color='error' onClick={() => setEditable(false)} style={{ position:'relative', top: '13px' }}>
                            <CancelIcon />
                        </IconButton>
                    )
                }
            </div>
        </div>
    );
}