import React, { Component } from "react";

import Post from "./Post";

import "./PostList.css";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Vinicius Leonardo",
          avatar:
            "https://cdn.discordapp.com/attachments/395388607034163213/617771514053394442/profile.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars0.githubusercontent.com/u/2254731?s=460&v=4"
            },
            content: "mas é claro"
          }
        ]
      }
    ]
  };

  render() {
    return (
      <div className="post">
        <div className="postlist">
          {this.state.posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostList;
