/* eslint-disable react/jsx-key */
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../utils/Date';
import { formatComments } from '../utils/Comment';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchComments } from '../redux/slices/posts';

export function Home() {
    const dispatch = useDispatch();
    const { posts, tags, comments } = useSelector((state) => state.posts);
    const { data: userData } = useSelector((state) => state.auth);

    React.useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchTags());
      dispatch(fetchComments());
    }, []);

    const { isLoading: postsIsLoading, items: postItems } = posts;
    const { isLoading: tagsIsLoading, items: tagItems } = tags;
    const { isLoading: commentsIsLoading, items: commentItems } = comments;

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="New" />
                <Tab label="Popular" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(postsIsLoading ? [...Array(5)] : postItems).map((obj, _idx) => (
                        <Post
                          id={obj?._id}
                          title={obj?.title}
                          imageUrl={obj?.imageUrl}
                          user={{
                            profilePic: obj?.user?.profilePic,
                            fullName: obj?.user?.fullName,
                        }}
                          createdAt={formatDate(obj?.createdAt)}
                          viewsCount={obj?.views}
                          commentsCount={obj?.commentsCount}
                          tags={obj?.tags}
                          isEditable={userData && userData?._id === obj?.user?._id}
                          isLoading={postsIsLoading}
                        />
                      ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tagItems} isLoading={tagsIsLoading} />
                    <CommentsBlock
                      items={formatComments(commentItems)}
                      isLoading={commentsIsLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
}
