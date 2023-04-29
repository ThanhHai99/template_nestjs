import axios from 'axios'

const decode = (data: string) => {
  let dataBuff = Buffer.from(data, 'base64').toString('ascii')
  dataBuff = dataBuff.slice(5, -7)
  dataBuff = Buffer.from(dataBuff, 'base64').toString('ascii')
  return dataBuff
}

;(async () => {
  const response = await axios.get('http://localhost/app/hello')
  let responseData = response.data
  responseData.data = decode(responseData.data)
  console.log(responseData)
})()
