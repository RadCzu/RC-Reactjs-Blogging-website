const Home = () => {

  let name = "mario";

  const handleClick = (e) => {
    //property: event, jest automatyczne
    console.log("twoja stara", e);
    name = "luigi";
  }

  const handleClickAgain = (name, e) => {
    console.log(`${name}, umarł na ligmę`, e);
  }

  return ( 
    <div className = "Home">
      <h2>Homepage</h2>
      <button onClick = {handleClick}>Click me</button>
      <p>{name}</p>
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