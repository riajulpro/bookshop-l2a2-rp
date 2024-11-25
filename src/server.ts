import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

async function startTheServer() {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(
        `Yahoo 😀! bookshop server is running on port ${config.port} \n\nCheckout the localhost: http://localhost:${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

startTheServer();
