export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    file: {
      dest: process.env.FILE_DEST || 'public/file',
    },
  }
}
