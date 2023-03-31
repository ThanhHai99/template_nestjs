export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    db: {
      host: '127.0.0.1',
      port: 5432,
      user: 'root',
      pass: 'root',
      db: 'template_nestjs',
    },
    jwt: {
      secret_key: 'secretKey',
      expires_in: 30000,
    },
  }
}
