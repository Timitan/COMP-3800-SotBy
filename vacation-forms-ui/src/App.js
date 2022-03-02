import Header from "./components/Header";
import TextInput from "./components/TextInput";
import Button from "./components/Button";

function App() {
  return (
    <div className="container">
      <Header />

      <div className='user-inputs'>
        <TextInput text="First Name" />
        <TextInput text="Last Name" />
        <TextInput text="Employee Number" />
        <TextInput text="Extension" />
      </div>

      <div className='vacation-inputs'>
        
      </div>

      <Button />
    </div>
  );
}

export default App;
