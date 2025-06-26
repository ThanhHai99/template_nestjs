import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user', engine: 'InnoDB', comment: 'Table of trackable user' })
@Index('IDX_user_username_email', ['username', 'email'], { fulltext: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'User ID', name: 'acc_id' })
  id: string

  @Column({ comment: 'Username', name: 'acc_username', length: 100 })
  username: string

  @Column({ comment: 'Email', name: 'acc_email' })
  email: string

  @Column({ type: 'enum', enum: ['male', 'female'], comment: 'sex of user', name: 'acc_sex' })
  sex: string

  @Column({ comment: 'password of user', name: 'acc_password', select: false })
  password: string

  @Column({ comment: '0=Inactive, 1=Active', name: 'acc_status' })
  status: boolean

  @CreateDateColumn({ comment: 'Creation time', name: 'acc_created_at' })
  @Index()
  created_at: Date

  @UpdateDateColumn({ comment: 'Last update time', name: 'acc_updated_at' })
  @Index()
  updated_at: Date
}
