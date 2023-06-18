/* eslint-disable react/jsx-key */
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
// import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export function Home() {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts);

    React.useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchTags());
    }, []);

    const { isLoading: postsIsLoading, items: postItems } = posts;
    const { isLoading: tagsIsLoading, items: tagItems } = tags;

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(postsIsLoading ? [...Array(5)] : postItems).map((obj, _idx) => (
                        <Post
                          id={obj?._id}
                          title={obj?.title}
                          imageUrl={obj?.imageUrl}
                          user={{
                            avatarUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                            fullName: 'Keff',
                        }}
                          createdAt="12 июня 2022 г."
                          viewsCount={obj?.views}
                          commentsCount={3}
                          tags={obj?.tags}
                          isEditable
                          isLoading={postsIsLoading}
                        />
                      ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tagItems} isLoading={tagsIsLoading} />
                    <CommentsBlock
                      items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
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
                    />
                </Grid>
            </Grid>
        </>
    );
}
