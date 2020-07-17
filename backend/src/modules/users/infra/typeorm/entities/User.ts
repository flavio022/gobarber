import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
  /*
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
  */
}

export default User;
