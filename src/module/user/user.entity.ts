import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
@Index('IDX_user_username_email', ['username', 'email'], { fulltext: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column({ type: 'enum', enum: ['male', 'female'] })
  sex: string

  @Column()
  password: string

  @Column()
  status: boolean

  @CreateDateColumn()
  @Index()
  created_at: Date

  @UpdateDateColumn()
  @Index()
  updated_at: Date
}
