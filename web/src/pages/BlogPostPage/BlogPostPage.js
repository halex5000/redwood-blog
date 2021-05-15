import BlogPostCell from 'src/components/BlogPostCell'

const BlogPostPage = ({ id }) => {
  return <BlogPostCell id={id} rand={Math.random()} />
}

export default BlogPostPage
