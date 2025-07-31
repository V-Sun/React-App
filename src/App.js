import { useState } from "react";

function App() {

  const [name, setName] = useState("Varun");
  const [age, setAge] = useState(20);
  console.log("in APP Component")
  const handleClick = () => {
    setName("Akhil");
    setAge(30);
    console.log(age, name);
  }
  return (
    <div className="App">
      <div className="content">
       <h2>My App</h2>  
       <p>{name} is {age} years old.</p>
      </div>
      <button onClick={handleClick}> Click Me! </button> 
    </div>
  );
}

export default App;
