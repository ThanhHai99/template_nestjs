export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    redis: {
      power: process.env.REDIS_POWER || 'on',
      host: process.env.REDIS_HOST || 'redis://localhost:6379',
      pass: process.env.REDIS_PASS || '',
    },
  }
}
