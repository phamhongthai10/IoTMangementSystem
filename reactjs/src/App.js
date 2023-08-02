import React from 'react';
import Navbar from './Components/Navbar';
import AddButtonDevice from './Components/AddButtonDevice';
import Table_list from './Components/table_list';
function App() {
  const cpuUsage = 70;
  const ramUsage = 45;
  
  return (
    <React.Fragment>

      <Navbar />
      <AddButtonDevice />
      <Table_list />
      
    </React.Fragment>
  );
}

export default App;
