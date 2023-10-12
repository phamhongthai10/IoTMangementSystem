import React from 'react';
import Navbar from './Components/Navbar';
import AddButtonDevice from './Components/AddButtonDevice';
import Table_list from './Components/table_list';
import Notification from './Components/Notification'
import TerminalController from './Components/terminal';
import { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
function App() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>
  ]);
  return (
    <React.Fragment>
    
      <Navbar />
      <AddButtonDevice />
      <Table_list /> 
      {/* <TerminalController/> */}
     
    </React.Fragment>
  );
}

export default App;
