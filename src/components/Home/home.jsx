import React from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      {/* <Barchart /> */}
      {/* <Piechart /> */}
      <Linegraph />
    </div>
  )
}

export default Home;