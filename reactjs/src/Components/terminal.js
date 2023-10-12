import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import axios from 'axios';

const TerminalController = (props) => {
  const { deviceName } = props;
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Input Command</TerminalOutput>
  ]);

  const handleTerminalInput = (terminalInput) => {
    // Log the received terminal input
   // console.log(`New terminal input received: '${terminalInput}'`);
   if (terminalInput.trim().toLowerCase() === "clear") {
    // Nếu là "clear", setTerminalLineData([]) để xóa dữ liệu
    setTerminalLineData([]);
  }else {
    axios
      .post('http://localhost:3001/api/terminal', { terminalInput, deviceName })
      .then((response) => {
        // Display the server response in the terminal
        console.log(response)
        const newOutput = <TerminalOutput>{response.data}</TerminalOutput>;

        // Update the terminal line data with the new output
        setTerminalLineData([...terminalLineData, terminalInput, newOutput]);
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
    }
  };

  return (
    <div className="container">
      <Terminal
        name='Terminal Controll'
        colorMode={ColorMode.Dark}
        onInput={handleTerminalInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
