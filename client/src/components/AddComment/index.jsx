/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './AddComment.module.scss';
import axios from '../../axios';

export function Index(props) {
  const [value, setValue] = React.useState('');
  const isAuthenticated = window.localStorage.getItem('token');
  const { id } = useParams();
  const { data: userData } = useSelector((state) => state.auth);

  if (!isAuthenticated) return null;

  const onSend = async () => {
    try {
     const { addComment } = props;
     await axios.post(`/posts/comment/${id}`, { comment: value });
     const comment = {
       user: {
         fullName: userData.fullName,
         profilePic: userData?.profilePic,
       },
       text: value,
     };
     addComment(comment);
      setValue('');
    } catch (error) {
       console.warn(error);
    }
   };

  return (
      <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            src={userData?.profilePic}
          />
          <div className={styles.form}>
              <TextField
                label="Write a comment"
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button variant="contained" onClick={onSend} disabled={!value}>Send</Button>
          </div>
      </div>
  );
}
