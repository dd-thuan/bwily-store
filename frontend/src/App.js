import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home/Home';

function App() {
  return (
  <Router>
    <Home />
    <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Home} />

    </Routes>
  </Router>
    
  );
}

export default App;
  