import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = (params) => {
  const serverUrl = useSelector((state => state.serverUrl));
  const { id } = useParams();
  console.log(serverUrl);
  const { data: blog, error, isPending } = useFetch(`${serverUrl}/auth/login/blogs?id=${id}`);
  const [authorID, setAuthorID] = useState();
  const [foundAuthor, setFoundAuthor] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector((state => state.isLoggedIn));
  const userName = useSelector((state => state.userName));

  useEffect(() => {
    if(!isPending) {
      console.log(id)
      console.log(blog)
      const author = blog[0].author;
      console.log(`author: ${author}`)
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${serverUrl}/auth/get-id`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: author }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.id);
            setAuthorID(data.id);
            setFoundAuthor(true);
          } else {
            console.log("Failed to load author");
          }
        } catch (error) {
          console.error("Error loading author:", error);
        }
      };

      fetchUserData();

      if ((userName === blog.author)) {
        setIsAuthor(true);
      } 
    }
  }, [isPending])

  const handleClick = () => {
    fetch(`${serverUrl}/blogs/${blog.id}`, {
      method: "DELETE"
    }).then(() => {
      history.push("/");
    })

  }
  return ( 
    <div className = "blog-details">
      { (isPending || !foundAuthor) && <div> Loading... </div>}
      { error && <div>{error}</div>}
      { blog && foundAuthor &&  (
        <article>
          <h2>{blog[0].title}</h2>
          <p>Written by: <Link to = {`/users/${authorID}`}>{blog[0].author}</Link></p>
          <div>{blog[0].body}</div>
          {isLoggedIn && isAuthor && <button onClick = {handleClick}>Delete Blog</button>}
        </article>

      )}
    </div>
  )
}
 
export default BlogDetails;