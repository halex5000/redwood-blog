import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article key={post.id}>
      <header>
        <h2>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <div>Posted at: {post.createdAt}</div>
      <p>{post.body}</p>
    </article>
  )
}

export default BlogPost
