import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import axios from "axios";

const AddRemoveProfessors = () => {
  const [actionType, setActionType] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rolle: '',
    wochenarbeitsstunden: ''
  });

  const professors = [
    { id: 1, name: 'Professor A' },
    { id: 2, name: 'Professor B' },
    { id: 3, name: 'Professor C' }
    // Hier können Sie weitere Lehrpersonen hinzufügen
  ];

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    try {
      console.log(formData);
      const response = axios.post('/api/professors/add', formData);
      setFormData({
        name: '',
        email: '',
        rolle: '',
        wochenarbeitsstunden: ''
      });
      console.error('Succesfully added professor');
    } catch (error){
      console.error('Error adding professor:', error);
    }
  };

  const handleActionSubmit = () => {
    if (actionType === 'remove' && selectedProfessor !== '') {
      try {
          const response = axios.post(`http://localhost:8080/terminplan/delete/${selectedProfessor.id}`, formData);
          console.log(`Removed Professor: ${selectedProfessor.name}`);
          setSelectedProfessor('');
          setActionType('');
      } catch (error) {
        console.error('Error deleting professor:', error);
      }
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Professor Management
          </Typography>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper style={{ padding: '16px' }}>
              <FormControl fullWidth>
                <InputLabel id="action-type-label">Action Type</InputLabel>
                <Select
                  labelId="action-type-label"
                  value={actionType}
                  onChange={handleActionChange}
                >
                  <MenuItem value="">Select Action</MenuItem>
                  <MenuItem value="add">Add Professor</MenuItem>
                  <MenuItem value="remove">Remove Professor</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          {(actionType === 'add' || actionType === 'remove') && (
            <Grid item xs={12}>
              <Paper style={{ padding: '16px' }}>
                {actionType === 'add' && (
                  <>
                    <Typography variant="h6">Add Professor</Typography>
                    <form onSubmit={handleFormSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleFormChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleFormChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name="rolle"
                            label="Rolle"
                            value={formData.rolle}
                            onChange={handleFormChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name="wochenarbeitsstunden"
                            label="Wochenarbeitsstunden"
                            type="number"
                            value={formData.wochenarbeitsstunden}
                            onChange={handleFormChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button type="submit" variant="contained" color="primary">
                            Add Professor
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </>
                )}
                {actionType === 'remove' && (
                  <>
                    <Typography variant="h6">Remove Professor</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="professor-select-label">Select Professor</InputLabel>
                      <Select
                        labelId="professor-select-label"
                        value={selectedProfessor}
                        onChange={handleProfessorChange}
                      >
                        <MenuItem value="">Select Professor</MenuItem>
                        {professors.map((professor) => (
                          <MenuItem key={professor.id} value={professor.id}>
                            {professor.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '10px' }}
                      disabled={selectedProfessor === ''}
                      onClick={handleActionSubmit}
                    >
                      Confirm Remove
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default AddRemoveProfessors;