import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';

@Entity()
export class Post {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column()
	userId: string;

	@ManyToOne(() => User, (user) => user.posts)
	@JoinColumn({
		name: 'userId',
		referencedColumnName: 'id',
	})
	user?: User;
}
