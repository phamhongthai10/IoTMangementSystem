const getInfoData = () => {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource("http://localhost:3001/api/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      resolve(data);
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred in SSE connection:", error);
      eventSource.close();
      reject(error);
    };
  });
};

export default getInfoData;
