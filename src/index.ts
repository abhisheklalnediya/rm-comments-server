import { RmCommentsServerApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { RmCommentsServerApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new RmCommentsServerApplication(options);
  await app.boot();
  await app.start();

  console.log(`Api Server is running at http://127.0.0.1:3000`);
  console.log(`Client is running at http://127.0.0.1:3001`);

  return app;
}
