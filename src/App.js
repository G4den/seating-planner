import {Route, Routes} from "react-router-dom";
import Landing from "./views/Landing";
import Create from "./views/Create";
import UpdatePreferences from "./views/UpdatePreferences";
import Success from "./views/Success";
import Generate from './views/Generate';

function App() {
  return (
    <div className="App w-screen h-screen font-poppins ">
        <Routes>
            <Route  path="/create" element={<Create/>}/>
            <Route path="/updateStudent/*" element={<UpdatePreferences/>}/>
            <Route  path="/success" element={<Success/>}/>
            <Route  path="/generate" element={<Generate/>}/>
            <Route  path="/" element={<Landing/>}/>
        </Routes>
    </div>
  );
}

export default App;
