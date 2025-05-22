import { parse } from 'pg-connection-string';
// import { StrapiConfig } from '@strapi/types';

export default ({ env }: { env: (key: string, defaultValue?: string) => string }) => {
  const dbUrl = env('DATABASE_URL');
  const config = parse(dbUrl);

  const sslEnabled = env('DATABASE_SSL', 'true') === 'true';

  const connection = {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port ? parseInt(config.port, 10) : 5432,
      database: config.database || '',
      user: config.user || '',
      password: config.password || '',
      ssl: sslEnabled
        ? {
            rejectUnauthorized: env('DATABASE_SSL_REJECT_UNAUTHORIZED', 'false') === 'true',
          }
        : false,
    },
    pool: {
      min: parseInt(env('DATABASE_POOL_MIN', '2'), 10),
      max: parseInt(env('DATABASE_POOL_MAX', '10'), 10),
    },
    acquireConnectionTimeout: parseInt(env('DATABASE_CONNECTION_TIMEOUT', '60000'), 10),
  };

  return { connection };
};
