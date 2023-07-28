import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  //data: blogs is important
  const serverUrl = useSelector((state => state.serverUrl));
  const {data: blogs, isPending, error} = useFetch(`${serverUrl}/blogs`);
  return ( 
    <div className = "Home">
      {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>}
      {blogs && <BlogList blogs = {blogs} title = {"Blogs:"}/>}
    </div>
   );
}
 
export default Home;

//npx json-server --watch  data/db.json --port 8000