import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import Measure from './measure';

@ObjectType()
@Entity()
export default class Ingredient {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Field()
  @Column({ unique: true })
  public name!: string;

  @OneToMany(() => Measure, (measure) => measure.ingredient)
  public cocktails?: Measure[];

  constructor(props?: Ingredient) {
    Object.assign(this, props);
  }
}
