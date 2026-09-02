const http = require('http');

http.get('http://localhost:3000/product/anavar-2-5mg', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response excerpt:', data.substring(0, 1500));
  });
});
