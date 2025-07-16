import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h4>{comment.author}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;