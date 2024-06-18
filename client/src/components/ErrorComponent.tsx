import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorComponentProps {
  error: any; // Adjust according to the actual error format you expect
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const renderErrorMessages = () => {
    if (error?.data?.message) return error.data.message;
    // Check if the errors array is available and has entries
    if (error?.data?.errors && error.data.errors.length) {
      return (
        <List>
          {error.data.errors.map((err: any, index: number) => (
            <ListItem key={index}>{err.msg}</ListItem>
          ))}
        </List>
      );
    }
    // Fallback message if there is no specific errors array or it's empty
    return 'An unexpected error occurred';
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="error"
        sx={{ width: '100%' }}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {renderErrorMessages()}
      </Alert>
    </Snackbar>
  );
};

export default ErrorComponent;
