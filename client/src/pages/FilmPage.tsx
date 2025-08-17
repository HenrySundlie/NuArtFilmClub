import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    background: '#ddd',
    color: '#111',
    minHeight: '100vh',
    padding: '1rem',
  },
  title: {
    color: '#000',
  },
});

export default function FilmPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Film Page</h1>
      <p>Details for a selected film.</p>
    </div>
  );
}
