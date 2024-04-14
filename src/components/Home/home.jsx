import React from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';

const Home = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard">
        <div className="chart-container">
          <Barchart />
          <Linegraph />
        </div>
        <div className="chart-container">
          <Piechart />
        </div>
      </div>
    </div>
  )
}

export default Home;