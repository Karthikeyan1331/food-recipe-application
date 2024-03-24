import './css/add.css'
import './css/home.css'
import './css/Trending.css'
import Trending from "./FrontPage/trend"
import Foot from "./FrontPage/foot"
import Home from "./FrontPage/home"

function App() {
  return (
    <div className="App">
      <Home/>
      <Trending/>
    </div>
  );
}

export default App;
