import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import Cocktail from './cocktail';
import Ingredient from './ingredient';

const nullable = {
  nullable: true,
};

@Entity()
@ObjectType()
export default class Measure {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.measures)
  public cocktail?: Cocktail;

  @Field(nullable)
  @Column(nullable)
  public measure?: string;

  @Field()
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cocktails)
  public ingredient!: Ingredient;

  constructor(props?: Measure) {
    Object.assign(this, props);
  }
}
