import {Module} from '@nestjs/common';
import {JsonApiModule} from 'nest-json-api'
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './modules/user/user.module';
import {User} from './modules/user/entities/user.entity';
import {Post} from './modules/user/entities/post.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		host: 'localhost',
		type: 'mariadb',
		username: 'dev',
		password: 'dev',
		database: 'example',
		synchronize: true,
		logging: true,
		entities: [Post, User],
	}), JsonApiModule.forRoot(), UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
