import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  name: string

  @Field(() => Date, { description: 'Example field (placeholder)' })
  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date

  @Field(() => Date, { description: 'Example field (placeholder)' })
  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updated_at: Date
}
