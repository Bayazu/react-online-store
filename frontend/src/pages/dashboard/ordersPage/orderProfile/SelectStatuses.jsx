import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectStatuses(props) {

    const {
        currentStatus,
        setCurrentStatus
    } = props


    const handleChange = (event) => {
        setCurrentStatus(event.target.value);
    };

    return (
        <Box sx={{ m: 1, width: 330 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Статус заказа</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentStatus}
                    label="Статус заказа"
                    onChange={handleChange}
                >
                    <MenuItem value={'Создан'}>Создан</MenuItem>
                    <MenuItem value={'Доставляется'}>Доставляется</MenuItem>
                    <MenuItem value={'Завершён'}>Завершён</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
