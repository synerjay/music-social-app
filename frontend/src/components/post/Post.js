import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ post: { post, loading }, getPost, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <Fragment>
      {' '}
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/posts' className='btn'>
            Back to Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <div className='flex flex-col justify-center items-center gap-y-3 w-full'>
            <h2 className='text-lg text-center'>Comments:</h2>
            {post.messages.map((message) => (
              <CommentItem
                key={message.id}
                message={message}
                postId={post.id}
              />
            ))}
          </div>
          <CommentForm postId={post.id} />
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
