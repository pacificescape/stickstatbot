module.exports = {
  apps: [{
    name: 'API',
    script: 'server.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '88.198.130.100',
      ref: 'origin/master',
      repo: 'git@github.com:stickstatsbot.git',
      path: '/app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
