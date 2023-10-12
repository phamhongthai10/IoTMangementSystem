import axios from "axios";
// Hàm này sẽ giả lập việc gọi API xuống server và trả về một Promise với dữ liệu CPU và RAM
export function fetchDataFromServer(globalValue) {
    return new Promise((resolve, reject) => {
      // Giả lập việc lấy dữ liệu từ server, ví dụ:
      // Assume đã có hàm gọi API thật sự, ở đây sẽ sử dụng setTimeout để giả lập thời gian lấy dữ liệu từ server.
    //   setTimeout(() => {
    //     // Giả sử nhận được dữ liệu từ server
    //     const data = {
    //       cpu: Math.random() * 100, // Giá trị CPU ngẫu nhiên từ 0 đến 100
    //       ram: Math.random() * 100, // Giá trị RAM ngẫu nhiên từ 0 đến 100
    //     };
  
    //     // Trả về dữ liệu dưới dạng Promise
    //     resolve(data);
    //   }, 1000); // Giả lập việc lấy dữ liệu mất 1 giây (1000ms)

    axios.post('http://localhost:3001/api/getCPU',{globalValue})
    .then((response) => {
      // Xử lý kết quả trả về từ server nếu cần thiết
      resolve(response)
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error('Error sending data to server:', error);
      // throw error;
    });
    });
  }
  


  export function fetchDataFromServer2(globalValue) {
    return new Promise((resolve, reject) => {
      // Giả lập việc lấy dữ liệu từ server, ví dụ:
      // Assume đã có hàm gọi API thật sự, ở đây sẽ sử dụng setTimeout để giả lập thời gian lấy dữ liệu từ server.
    //   setTimeout(() => {
    //     // Giả sử nhận được dữ liệu từ server
    //     const data = {
    //       cpu: Math.random() * 100, // Giá trị CPU ngẫu nhiên từ 0 đến 100
    //       ram: Math.random() * 100, // Giá trị RAM ngẫu nhiên từ 0 đến 100
    //     };
  
    //     // Trả về dữ liệu dưới dạng Promise
    //     resolve(data);
    //   }, 1000); // Giả lập việc lấy dữ liệu mất 1 giây (1000ms)

    axios.post('http://localhost:3001/api/getDataArray',{globalValue})
    .then((response) => {
      // Xử lý kết quả trả về từ server nếu cần thiết
      resolve(response)
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error('Error sending data to server:', error);
      // throw error;
    });
    });
  }