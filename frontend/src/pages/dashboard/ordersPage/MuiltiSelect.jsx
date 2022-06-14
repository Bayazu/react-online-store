import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {makeStyles} from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Создан',
    'Доставляется',
    'Завершён',
];

function getStyles(name, statuses, theme) {
    return {
        fontWeight:
            statuses.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles(theme => ({
    select: {
        minHeight: '0px',
        height: '56px',
    },
}));

export default function MultipleSelectChip(props) {

    const {
        statuses,
        setStatuses,
    } = props

    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStatuses(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const classes = useStyles();

    return (
        <div>
            <FormControl sx={{ m: 1, width: 330, }}>
                <InputLabel id="demo-multiple-chip-label">Сортировка по статусу заказа</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={statuses}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Сортировка по статусу заказа" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, statuses, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
