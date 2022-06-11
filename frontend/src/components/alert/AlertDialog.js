import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//TODO спрашивать у юзера разрешение на удаление
export default function AlertDialog(props) {

    const {
        open,
        text,
        title,
        setOpen = (data) => {
        },
        confirmAlert = () =>{
        }
    } = props

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        confirmAlert()
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Нет</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
