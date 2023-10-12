// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';





// Hàm thực thi lệnh Linux và trả về kết quả
function executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout.trim()); // Xóa các khoảng trắng và ký tự xuống dòng thừa
      });
    });
  }
  
  // Hàm để lấy thông tin của thiết bị và trả về một đối tượng
  async function getDeviceInfo() {
    try {
      const deviceInfo = {};
  
      // Lấy tên thiết bị
      deviceInfo.deviceName = await executeCommand('hostname');
      // Lấy hệ điều hành
     deviceInfo.kernel = await executeCommand("inxi -Fx | grep -m 1 'Kernel' | grep -o '5\\.[0-9.]*'");
      // Lấy hệ điều hành
      deviceInfo.os = await executeCommand('cat /etc/os-release | grep PRETTY_NAME | cut -d "=" -f2');
  
      // Lấy địa chỉ IP
      deviceInfo.ipAddress = await executeCommand('hostname -I');
  
      // Lấy dung lượng bộ nhớ
      deviceInfo.memory = await executeCommand('free -h | awk \'/Mem:/ { print $2 }\'');
  
      // Lấy kiến trúc hệ điều hành
      deviceInfo.architecture = await executeCommand('uname -m');
      // Lay thong tin ve cpu
      deviceInfo.cpu = await executeCommand('lscpu | grep "Model name" | cut -d ":" -f2');
      return deviceInfo;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thiết bị:', error);
      return null;
    }
  }
  const { exec } = require('child_process');
  
  // Hàm thực thi lệnh Linux và trả về kết quả
  function executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout.trim()); // Xóa các khoảng trắng và ký tự xuống dòng thừa
      });
    });
  }
  
  // Hàm để lấy thông tin của thiết bị và trả về một đối tượng
  async function getDeviceInfo() {
    try {
      const deviceInfo = {};
  
      // Lấy tên thiết bị
      deviceInfo.deviceName = await executeCommand('hostname');
  
      // Lấy hệ điều hành
      deviceInfo.os = await executeCommand('cat /etc/os-release | grep PRETTY_NAME | cut -d "=" -f2');
  
      // Lấy địa chỉ IP
      deviceInfo.ipAddress = await executeCommand('hostname -I');
  
      // Lấy dung lượng bộ nhớ
      deviceInfo.memory = await executeCommand('free -h | awk \'/Mem:/ { print $2 }\'');
  
      // Lấy kiến trúc hệ điều hành
      deviceInfo.architecture = await executeCommand('uname -m');
  
      return deviceInfo;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thiết bị:', error);
      return null;
    }
  }
  
  // Sử dụng hàm để lấy thông tin và in ra màn hình
  getDeviceInfo()
    .then((deviceInfo) => {
      if (deviceInfo) {
        console.log('Thông tin thiết bị:', deviceInfo);
      }
    })
    .catch((error) => {
      console.error('Lỗi:', error);
    });
  