import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const blog = {title, body, author};
    
    //adding object to a json server
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(blog)
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      history.push("/");
    })
  }
  return ( 
  <div className = "create">
    <h2>Add a new Blog</h2>
    <form onSubmit = {handleSubmit}>
      <label>
        Title:
      </label>
      <input
       type = "text" 
       required
       value = {title}
       onChange={(e) => setTitle(e.target.value)}>
      </input>
      <label>
        Body:
      </label>
      <textarea 
      required
      value = {body}
      onChange={(e => setBody(e.target.value))}> 
      </textarea>

      <label>
        Author:
      </label>
      <select value = {author} onChange = {(e) => setAuthor(e.target.value)}>
      <option value = "mario">mario</option>
      <option value = "luigi">luigi</option>
      </select>
      {!isPending && <button>Add Blog</button>}
      {isPending && <button>Adding blog...</button>}
    </form>
  </div> 
  );
}
 
export default Create;