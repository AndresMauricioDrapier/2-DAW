import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  app.use(
    session({
      secret: '1234',
      resave: true,
      saveUninitialized: false,
      expires: new Date(Date.now() + 30 * 60 * 1000), //  La sesión expirará en
    }),
  );

  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  app.useStaticAssets(__dirname + '/../views', { prefix: 'public' });
  app.useStaticAssets(__dirname + '/../node_modules/bootstrap/dist');
  app.setViewEngine('njk');
  await app.listen(3000);
}
bootstrap();
