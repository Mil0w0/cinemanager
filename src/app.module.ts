import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './movies/movie.entity';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.HOST_DB_PORT),
      username: process.env.DATABASE_ROOT,
      password: process.env.DATABASE_ROOT_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Movie],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule {}
