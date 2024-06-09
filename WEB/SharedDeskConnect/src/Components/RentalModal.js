import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
} from "@mui/material";

const RentalModal = ({ open, onClose, onSubmit, space }) => {

  const [newRental, setNewRental] = useState({
    spaceID: space.spaceID,
    rentalStartPeriod: null,
    rentalEndPeriod: null,
    contactNumber: "",
    numberOfPersons: 1,
    rentalApproval: "pending",
  });

  const [existingRentals, setExistingRentals] = useState([]);
  const [excludeDates, setExcludeDates] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const updateExcludedDates = useCallback(
    (rentals, personsNumber) => {
      const dates = [];
      const capacity = space.availableCapacity;

      // Create a map to keep track of the total persons for each date
      const dateCapacityMap = new Map();

      rentals.forEach((rental) => {
        const start = new Date(rental.rentalStartPeriod);
        const end = new Date(rental.rentalEndPeriod);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const rentalDate = new Date(d);
          const currentTotal = dateCapacityMap.get(rentalDate.toDateString()) || 0;
          dateCapacityMap.set(rentalDate.toDateString(), currentTotal + rental.numberOfPersons);
        }
      });

      for (let [date, totalPersons] of dateCapacityMap.entries()) {
        if (totalPersons + personsNumber > capacity) {
          dates.push(new Date(date));
        }
      }

      setExcludeDates(dates);

      // Find the first available date
      let firstAvailableDate = new Date();
      while (dates.some((d) => d.getTime() === firstAvailableDate.getTime())) {
        firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);
      }

      setNewRental((prevRental) => ({
        ...prevRental,
        rentalStartPeriod: firstAvailableDate,
        rentalEndPeriod: firstAvailableDate,
      }));
    },
    [space]
  );

  useEffect(() => {
    const fetchExistingRentals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/Rental/GetRentals`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch existing rentals");
        }
        const data = await response.json();
        setExistingRentals(data.filter((rental) => rental.spaceID === Number(space.spaceID)));
        updateExcludedDates(data.filter((rental) => rental.spaceID === Number(space.spaceID)), newRental.numberOfPersons);
      } catch (error) {
        console.error("Error fetching existing rentals:", error.message);
      }
    };

    if (open) {
      fetchExistingRentals();
    }
  }, [open, space.spaceID, newRental.numberOfPersons, updateExcludedDates]);

  const handleNewRentalChange = (name, value) => {
    setNewRental((prevRental) => ({
      ...prevRental,
      [name]: value,
    }));

    if (name === "numberOfPersons") {
      updateExcludedDates(existingRentals, value);
    }

    if (name === "rentalStartPeriod" && value > newRental.rentalEndPeriod) {
      setNewRental((prevRental) => ({
        ...prevRental,
        rentalEndPeriod: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newRental.contactNumber)
        errors.contactNumber = "Contact Number is required";
    if (!newRental.numberOfPersons || newRental.numberOfPersons <= 0)
        errors.numberOfPersons = "Number of Persons must be greater than zero";
    if (newRental.numberOfPersons > space.availableCapacity)
        errors.numberOfPersons = "Number of Persons exceeds available capacity";
    if (newRental.rentalStartPeriod > newRental.rentalEndPeriod)
        errors.rentalPeriod = "End Date must be after Start Date";

    // Validate against existing rentals and space availability
    const start = new Date(newRental.rentalStartPeriod);
    const end = new Date(newRental.rentalEndPeriod);
    const dateCapacityMap = new Map();

    existingRentals.forEach((rental) => {
        const rentalStart = new Date(rental.rentalStartPeriod);
        const rentalEnd = new Date(rental.rentalEndPeriod);

        for (let d = new Date(rentalStart); d <= rentalEnd; d.setDate(d.getDate() + 1)) {
            const formattedDate = d.toDateString();
            const currentTotal = dateCapacityMap.get(formattedDate) || 0;
            dateCapacityMap.set(formattedDate, currentTotal + rental.numberOfPersons);
        }
    });

    let unavailableDays = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toDateString();
        const totalPersonsOnDate = dateCapacityMap.get(formattedDate) || 0;

        if (totalPersonsOnDate + newRental.numberOfPersons > space.availableCapacity) {
            unavailableDays.push(formattedDate);
        }
    }

    if (unavailableDays.length > 0) {
        errors.rentalPeriod = `Selected period has unavailable days due to capacity limits on: ${unavailableDays.join(", ")}`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
};


  const handleSubmit = () => {
    if (!validateForm()) return;

    const start = new Date(newRental.rentalStartPeriod);
    const end = new Date(newRental.rentalEndPeriod);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1; // Ensure at least one day
    const pricePerDay = space.price / 30;
    const calculatedPrice = Math.round(
      pricePerDay * days * newRental.numberOfPersons
    );
    onSubmit(newRental, calculatedPrice);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "65vh",
          height: "75vh",
        },
      }}
    >
      <DialogTitle>Add New Rental</DialogTitle>
      <DialogContent style={{ overflowY: "auto" }}>
        <div style={{ display: "flex", flexFlow: "column", gap: "20px" }}>
          <TextField
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            variant="outlined"
            fullWidth
            type="number"
            value={newRental.contactNumber}
            onChange={(e) =>
              handleNewRentalChange(e.target.name, e.target.value)
            }
            style={{ marginBottom: "10px", marginTop: "50px" }}
            error={!!formErrors.contactNumber}
            helperText={formErrors.contactNumber}
          />
          <TextField
            id="numberOfPersons"
            name="numberOfPersons"
            label="Number of Desks"
            variant="outlined"
            type="number"
            fullWidth
            value={newRental.numberOfPersons}
            onChange={(e) =>
              handleNewRentalChange(e.target.name, parseInt(e.target.value, 10))
            }
            style={{ marginBottom: "10px" }}
            error={!!formErrors.numberOfPersons}
            helperText={formErrors.numberOfPersons}
          />
          <DatePicker
            selected={newRental.rentalStartPeriod}
            onChange={(date) =>
              handleNewRentalChange("rentalStartPeriod", date)
            }
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom"
            customInput={
              <TextField
                label="Rental Start Period"
                variant="outlined"
                fullWidth
              />
            }
            excludeDates={excludeDates}
            wrapperClassName="date-picker-wrapper"
            popperProps={{
              style: { zIndex: 1300 },
            }}
            style={{ marginBottom: "10px" }}
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 12, 0)} 
          />
          <DatePicker
            selected={newRental.rentalEndPeriod}
            onChange={(date) => handleNewRentalChange("rentalEndPeriod", date)}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom"
            customInput={
              <TextField
                label="Rental End Period"
                variant="outlined"
                fullWidth
              />
            }
            excludeDates={excludeDates}
            wrapperClassName="date-picker-wrapper"
            popperProps={{
              style: { zIndex: 1300 }, 
            }}
            style={{ marginBottom: "10px" }}
            minDate={newRental.rentalStartPeriod}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 12, 0)}
            error={!!formErrors.rentalPeriod}
            helperText={formErrors.rentalPeriod}
          />
         {formErrors.rentalPeriod && <FormHelperText sx={{color: "red"}}>{formErrors.rentalPeriod }</FormHelperText>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Get Offer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentalModal;
