// src/Components/SearchInput.js
import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ onSearchChange }) => {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginBottom: '20px' ,marginLeft:"10px" }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Find a Desk by name"
        inputProps={{ 'aria-label': 'find a desk' }}
        onChange={handleChange}
      />
        <SearchIcon />
    </Paper>
  );
};

export default SearchInput;
