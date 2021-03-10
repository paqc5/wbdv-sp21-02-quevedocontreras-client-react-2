import CourseManager from "./components/course-manager";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" exact={true}>
          <Home/>
        </Route>
        <CourseManager></CourseManager>
      </div>
    </BrowserRouter>
  );
}

export default App;
