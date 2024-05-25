import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';

const PriceConfirmationModal = ({ open, onClose, onConfirm, price }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Rental Price</DialogTitle>
      <DialogContent>
        <Typography>
          The calculated price for your rental period is: {price.toFixed(2)} €
        </Typography>
        <Typography>
          Click on Confirm if you want to submit your request.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceConfirmationModal;
