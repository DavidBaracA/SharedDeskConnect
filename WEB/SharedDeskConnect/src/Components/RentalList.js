import React from "react";
import {
  Button,
  Typography,
  Divider,
} from "@mui/material";

const RentalList = ({ rentals, onApprove, onReject, onDelete }) => {
  return (
    <div style={{ display: "flex", flexDirection:"column"}}>
      <Typography variant="h6">Rentals</Typography>
      <Divider style={{ margin: "10px 0" }} />
      {rentals.map((rental) => (
        <div key={rental.rentalID} className="rental-item">
          <p>Rental Start Period: {new Date(rental.rentalStartPeriod).toLocaleDateString()}</p>
          <p>Rental End Period: {new Date(rental.rentalEndPeriod).toLocaleDateString()}</p>
          <p>Contact Number: {rental.contactNumber}</p>
          <p>Number of Persons: {rental.numberOfPersons}</p>
          <p>Price: {rental.customPrice}€</p>
          <p>Status: {rental.rentalApproval}</p>
          {rental.rentalApproval === "pending" && (
            <>
              <Button
                onClick={() => onApprove(rental.rentalID)}
                color="primary"
                variant="contained"
                style={{ marginRight: "10px" }}
              >
                Approve
              </Button>
              <Button
                onClick={() => onReject(rental.rentalID)}
                color="secondary"
                variant="contained"
              >
                Reject
              </Button>
            </>
          )}
          <Button
            onClick={() => onDelete(rental.rentalID)}
            color="secondary"
            variant="outlined"
            style={{ marginLeft:"10px" }}
          >
            Delete Rental
          </Button>
          <Divider style={{ margin: "10px 0" }} />
        </div>
      ))}
    </div>
  );
};

export default RentalList;
