
import React from 'react';
import { Typography, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  titleContainer: {
    '& h4': {
      fontWeight: 600,
      color: '#1a1f36'
    },
    '& p': {
      color: '#6b7280'
    }
  },
  buttonContainer: {
    display: 'flex',
    gap: 8
  },
  filterButton: {
    textTransform: 'none'
  },
  addButton: {
    textTransform: 'none',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
}));

const KanbanHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">
          Action Items
        </Typography>
        <Typography variant="body1">
          Track and manage all maintenance and construction tasks
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          className={classes.filterButton}
        >
          Filter
        </Button>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          className={classes.addButton}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};

export default KanbanHeader;
