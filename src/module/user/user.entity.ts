import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updated_at: Date
}
