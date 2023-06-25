/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { formatDate } from '../utils/Date';
import { formatComments } from '../utils/Comment';

export function FullPost() {
  // eslint-disable-next-line no-unused-vars
  const [postData, setPostData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    setIsLoading(true);

    axios
    .get(`/posts/${id}`)
    .then(({ data }) => {
      setPostData(data);
      setComments(formatComments(data.comments));
      setIsLoading(false);
    })
    .catch((error) => {
      console.warn(error);
      alert('Error while loading post');
      setIsLoading(false);
    });
  }, [id]);

  const addComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

    const {
      title,
      user,
      text,
      views,
      createdAt,
      tags,
      imageUrl,
      commentsCount,
  } = postData;

    return (
        <>
            <Post
              id={id}
              title={title}
              imageUrl={imageUrl || ''}
              user={{
                    profilePic: user?.profilePic,
                    fullName: user?.fullName,
                }}
              createdAt={formatDate(createdAt)}
              viewsCount={views}
              commentsCount={commentsCount}
              tags={tags}
              isFullPost
            >
                <ReactMarkdown>
                    {text}
                </ReactMarkdown>
            </Post>
            <CommentsBlock
              items={comments}
              isLoading={isLoading}
            >
                <Index addComment={addComment} />
            </CommentsBlock>
        </>
    );
}
