import React from "react";

function PostAuthor({ author, date }) {
  return (
    <div className="post-author">
      <div className="post-author-avatar">
        <img className="avatar" src={author.avatar} />
      </div>
      <div className="post-author-datails">
        <strong>{author.name}</strong>
        <span>{date}</span>
      </div>
    </div>
  );
}

function PostComments({ comments }) {
  return (
    <div className="post-comments">
      <div className="comment-content">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <img className="avatar" src={comment.author.avatar} />
            <p>
              <span>{comment.author.name}</span>
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostContent({ author, date, content, comments }) {
  return (
    <div className="post-content">
      <PostAuthor author={author} date={date} />
      <p>{content}</p>
      <PostComments comments={comments} />
    </div>
  );
}

export default PostContent;
