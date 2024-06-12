import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorComponentProps {
  error: any; // You can specify more specific type based on error structure
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  // Corrected handleClose function
  const handleClose = (
    event: React.SyntheticEvent<any, Event> | Event, // Updated this line to handle both SyntheticEvent and Event
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return; // Do not close if the click is away from the Snackbar
    }
    setOpen(false);
  };

  let message = 'An unexpected error occurred';
  if (error?.data?.message) {
    message = error.data.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error?.message) {
    message = error.message;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="error"
        sx={{ width: '100%' }}
        onClose={() => setOpen(false)} // Simpler onClose handler for the Alert
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)} // Simpler close function directly setting state
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorComponent;
