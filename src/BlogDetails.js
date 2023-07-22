import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";

const BlogDetails = (params) => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();
  const isLoggedIn = useSelector((state => state.loggedIn));
  const userName = useSelector((state => state.username));

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE"
    }).then(() => {
      history.push("/");
    })
  }
  return ( 
    <div className = "blog-details">
      { isPending && <div> Loading... </div>}
      { error && <div>{error}</div>}
      { blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          {isLoggedIn && (userName === blog.author) && <button onClick = {handleClick}>Delete Blog</button>}
        </article>

      )}
    </div>
  )
}
 
export default BlogDetails;