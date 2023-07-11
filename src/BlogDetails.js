import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = (params) => {
  const { id } = useParams();
  return ( <h2>Blog details {id}</h2> );
}
 
export default BlogDetails;