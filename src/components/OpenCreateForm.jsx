import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Form from './Form';

function OpenCreateForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Добавления ассортимента</DialogTitle>
        <DialogContent>
          <Form onCloseForm={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OpenCreateForm;
