import Header from "./components/Header";
import TextInput from "./components/TextInput";
import GridDoubleLabel from "./components/GridDoubleLabel";
import GridTripleLabel from "./components/GridTripleLabel";
import GridNotesLabel from "./components/GridNotesLabel";
import Button from "./components/Button";

function App() {
  return (
    <div className="container">
      <Header />

      {/* User Inputs */}
      <div className="user-inputs">
        <TextInput text="First Name" />
        <TextInput text="Last Name" />
        <TextInput text="Employee Number" />
        <TextInput text="Extension" />
      </div>

      {/* Vacation Inputs */}
      <div className="vacation-inputs">
        <div className="vacation-row">
          <GridDoubleLabel topText="N-NEW" botText="C-CANCEL" />
          <GridTripleLabel
            topText="LEAVE DATES"
            leftText="FROM"
            rightText="TO (INCLUSIVE)"
          />
          <GridTripleLabel
            topText="TOTAL"
            leftText="DAY(S)"
            rightText="HOUR(S)"
          />
          <GridDoubleLabel topText="VA-VACATION" botText="BT-BANKED TIME" />
          <GridNotesLabel text="NOTES" />
        </div>
      </div>

      <Button />
    </div>
  );
}

export default App;
