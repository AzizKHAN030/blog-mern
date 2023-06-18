/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';

export function FullPost() {
  // eslint-disable-next-line no-unused-vars
  const [postData, setPostData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setIsLoading(true);

    axios
    .get(`/posts/${id}`)
    .then(({ data }) => {
      setPostData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.warn(error);
      alert('Error while loading post');
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

    const {
      title,
      // user,
      text,
      views,
      createdAt,
      tags,
      imageUrl,
  } = postData;

    return (
        <>
            <Post
              id={id}
              title={title}
              imageUrl={imageUrl}
              user={{
                    avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: 'Keff',
                }}
              createdAt={createdAt}
              viewsCount={views}
              commentsCount={3}
              tags={tags}
              isFullPost
            >
                <p>
                    {text}
                </p>
            </Post>
            <CommentsBlock
              items={[
                    {
                        user: {
                            fullName: 'Вася Пупкин',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий 555555',
                    },
                    {
                        user: {
                            fullName: 'Иван Иванов',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                ]}
              isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
}
