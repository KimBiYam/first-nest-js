import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import CreateCatDto from 'src/cats/dto/create-cat.dto';
import UpdateCatDto from 'src/cats/dto/update-cat.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/cats', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/cats').expect(200).expect([]);
    });

    it('POST 201', () => {
      const createCatDto: CreateCatDto = {
        breed: 'test',
        favoriteThings: ['test'],
        age: 15,
        name: 'test',
      };
      return request(app.getHttpServer())
        .post('/cats')
        .send(createCatDto)
        .expect(201);
    });
    it('POST 400', () => {
      const createCatDto = {
        breed: 'test',
        favoriteThings: ['test'],
        age: 15,
        name: 'test',
        other: 'thing',
      };
      return request(app.getHttpServer())
        .post('/cats')
        .send(createCatDto)
        .expect(400);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/cats').expect(404);
    });
  });

  describe('/cats/:id', () => {
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/cats/999').expect(404);
    });
    it('PATCH 200', () => {
      const updateCatDto: UpdateCatDto = { name: 'hello' };
      return request(app.getHttpServer())
        .patch('/cats/1')
        .send(updateCatDto)
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/cats/1').expect(200);
    });
  });
});
