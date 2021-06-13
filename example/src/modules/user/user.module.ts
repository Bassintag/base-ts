import {Module} from '@nestjs/common';
import {JsonApiModule} from 'nest-json-api'
import {User} from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Post} from './entities/post.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Post, User]),
		JsonApiModule.forFeature([Post, User])
	],
	controllers: [],
	providers: [],
})
export class UserModule {
}
