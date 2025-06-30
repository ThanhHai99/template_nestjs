import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user', engine: 'InnoDB', comment: 'Table of trackable user' })
@Index('IDX_user_username_email', ['username', 'email'], { fulltext: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'User ID', name: 'usr_id' })
  id: string

  @Column({ comment: 'Username', name: 'usr_username', length: 100 })
  username: string

  @Column({ comment: 'Email', name: 'usr_email' })
  email: string

  @Column({ type: 'enum', enum: ['male', 'female'], comment: 'sex of user', name: 'usr_sex' })
  sex: string

  @Column({ comment: 'password of user', name: 'usr_password', select: false })
  password: string

  @Column({ comment: '0=Inactive, 1=Active', name: 'usr_status' })
  status: boolean

  @CreateDateColumn({ comment: 'Creation time', name: 'usr_created_at' })
  @Index()
  created_at: Date

  @UpdateDateColumn({ comment: 'Last update time', name: 'usr_updated_at' })
  @Index()
  updated_at: Date
}
