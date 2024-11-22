export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    ftp: {
      host: process.env.FTP_HOST || '127.0.0.1',
      user: process.env.FTP_USER || 'root',
      pass: process.env.FTP_PASS || 'root',
    },
  }
}
