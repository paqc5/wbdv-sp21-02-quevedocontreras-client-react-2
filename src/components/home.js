import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Home = () => {

  const { layout } = useParams()

  return(
  <div className="text-center">
    <Link to="/courses/table">Courses Table</Link><br />
    <Link to="/courses/grid">Courses Grid</Link><br />
    <Link to={`/courses/${layout}/edit`}>Courses Editor</Link>
  </div>
  )}
export default Home