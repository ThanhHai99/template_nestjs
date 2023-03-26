export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    nats: {
      host: process.env.NATS_HOST || 'nats://localhost:4222',
      provider: 'NATS_PROVIDER',
    },
    message: {
      'ms-example': {
        ms_name: 'ms-example', // route group of node service
        test: 'test',
      },
    },
  }
}
