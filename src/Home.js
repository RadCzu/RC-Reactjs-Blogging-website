import { useState } from "react";

const Home = () => {

  //tzw "hook"
  const[name, setName] = useState("Mario");
  const[age, setAge] = useState(50);

  const handleClick = (e) => {
    //property: event, jest automatyczne
    console.log("twoja stara", e);
    setName("Luigi");
    setAge(age + 1);
  }

  const handleClickAgain = (name, e) => {
    console.log(`${name}, umarł na ligmę`, e);
    setName("Mario");
    setAge(age + 1);
  }

  return ( 
    <div className = "Home">
      <h2>Homepage</h2>
      <button onClick = {handleClick}>Click me</button>
      <p>{`${name} is ${age} years old`}</p>
      <button onClick = {
        (e) => {
          // ta funkcja z parametrami musi byc anonimowa, inaczej jest wywolana raz na starcie
          handleClickAgain("yoshi", e);
        }
        }>Click me again</button>
    </div>
   );
}
 
export default Home;