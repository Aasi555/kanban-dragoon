
import React from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '16px 24px',
    '@media (min-width: 600px)': {
      padding: '24px'
    }
  }
}));

const Index = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.pageContainer}>
      <KanbanBoard />
    </div>
  );
};

export default Index;
