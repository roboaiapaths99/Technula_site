module.exports = {
  apps: [
    {
      name: 'technula-backend',
      script: 'server.js',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
        PORT: 5005
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5005
      }
    }
  ]
};
