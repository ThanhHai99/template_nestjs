import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Index({ fulltext: true })
  username: string

  @Column()
  @Index({ fulltext: true })
  email: string

  @Column({ type: 'enum', enum: ['male', 'female'] })
  sex: string

  @Column()
  password: string

  @Column()
  status: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
