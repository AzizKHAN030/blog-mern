import {
 Link, Navigate, useNavigate, useParams,
} from 'react-router-dom';
import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';

export function AddPost() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const imgInputRef = React.useRef(null);
  const isAuthenticated = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  async function fetchPost() {
    try {
     const {
      data: {
      tags: postTags,
      title: postTitle,
      text,
      imageUrl: postImageUrl,
      },
      } = await axios.get(`/posts/${id}`);

      setTags(postTags.join(','));
      setTitle(postTitle);
      setImageUrl(postImageUrl);
      setValue(text);
  } catch (error) {
    console.log('>>>', error);
  }
  }

  React.useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, []);

  const uploadImg = async (file) => {
    const formData = new FormData();

    formData.append('image', file);

    try {
      const { data: { imageUrl: url } } = await axios.post('/upload', formData);
      setImageUrl(url);
    } catch (error) {
      console.log('>>>', error);
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    uploadImg(file);
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((_value) => {
    setValue(_value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
          title,
          text: value,
          tags: tags.split(','),
          imageUrl,
        };

      const { data: { _id } } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

      navigate(`/posts/${id || _id}`);
    } catch (error) {
      console.log('>>>', error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuthenticated) {
     return <Navigate to="/login" />;
  }

  return (
      <Paper style={{ padding: 30 }}>
          {!imageUrl && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => { imgInputRef.current.click(); }}
          >
              Upload an image
          </Button>
      )}
          <input
            type="file"
            onChange={handleChangeFile}
            hidden
            ref={imgInputRef}
          />
          {imageUrl && (
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Delete
          </Button>
      )}
          {imageUrl && (
          <img className={styles.image} src={`http://localhost:4444/${imageUrl}`} alt="Uploaded" />
      )}
          <br />
          <br />
          <TextField
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Title..."
            fullWidth
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
          />

          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Tags"
            fullWidth
            value={tags}
            onChange={(e) => { setTags(e.target.value); }}
          />
          <SimpleMDE
            className={styles.editor}
            value={value}
            onChange={onChange}
            options={options}
          />
          <div className={styles.buttons}>
              <Button
                size="large"
                variant="contained"
                onClick={onSubmit}
              >
                  {isEditing ? 'Update' : 'Add'}
              </Button>
              <Link to="/">
                  <Button size="large">Cancel</Button>
              </Link>
          </div>
      </Paper>
  );
}
