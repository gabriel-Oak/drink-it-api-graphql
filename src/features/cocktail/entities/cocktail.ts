import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, OneToMany, PrimaryColumn,
} from 'typeorm';
import Measure from './measure';
import Ingredient from './ingredient';

export interface CocktailFromSourceProps {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: string;
  strTags?: string;
  strVideo?: string;
  strCategory?: string;
  strIBA?: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions?: string;
  strInstructionsES?: string;
  strInstructionsDE?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  'strInstructionsZH-HANS'?: string;
  'strInstructionsZH-HANT'?: string;
  strDrinkThumb: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strImageSource?: string;
  strImageAttribution?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

const nullable = { nullable: true };

@Entity()
@ObjectType()
export default class Cocktail {
  @Field()
  @PrimaryColumn()
  public id!: string;

  @Field()
  @Column()
  public name!: string;

  @Field()
  @Column()
  public thumb!: string;

  @Field()
  @Column()
  public alcoholic!: string;

  @Field()
  @Column()
  public glass!: string;

  @Field(() => [Measure])
  @OneToMany(() => Measure, (ingredient) => ingredient.cocktail)
  public measures!: Measure[];

  @Field(nullable)
  @Column(nullable)
  public category?: string;

  @Field(nullable)
  @Column(nullable)
  public video?: string;

  @Field(nullable)
  @Column(nullable)
  public tags?: string;

  @Field()
  @Column('text')
  public instructions?: string;

  @Field(nullable)
  @Column({
    ...nullable,
    type: 'text',
  })
  public instructionsES?: string;

  @Field(nullable)
  @Column({
    ...nullable,
    type: 'text',
  })
  public instructionsDE?: string;

  @Field(nullable)
  @Column({
    ...nullable,
    type: 'text',
  })
  public instructionsFR?: string;

  @Field(nullable)
  @Column({
    ...nullable,
    type: 'text',
  })
  public instructionsIT?: string;

  @Field(nullable)
  @Column({
    ...nullable,
    type: 'text',
  })
  public instructionsPtBR?: string;

  @Field(nullable)
  @Column(nullable)
  public dateModified?: string;

  @Field(nullable)
  @Column(nullable)
  public iba?: string;

  constructor(props?: Cocktail) {
    Object.assign(this, {
      ...props,
      measures: props?.measures.map((i) => new Measure(i)),
    });
  }

  static fromSource(props: CocktailFromSourceProps) {
    const measures: Measure[] = [];
    (Object.keys(props) as Array<keyof CocktailFromSourceProps>).forEach((key) => {
      if (key.includes('Ingredient') && !!props[key]) {
        measures.push(new Measure({
          measure: props[`strMeasure${key.split('Ingredient')[1]}` as keyof CocktailFromSourceProps],
          ingredient: new Ingredient({
            name: props[key]!,
          }),
        }));
      }
    });

    return new Cocktail({
      id: props.idDrink,
      name: props.strDrink,
      thumb: props.strDrinkThumb,
      tags: props.strTags,
      category: props.strCategory,
      alcoholic: props.strAlcoholic,
      glass: props.strGlass,
      video: props.strVideo,
      instructions: props.strInstructions,
      instructionsES: props.strInstructionsES,
      instructionsDE: props.strInstructionsDE,
      instructionsFR: props.strInstructionsFR,
      instructionsIT: props.strInstructionsIT,
      dateModified: props.dateModified,
      iba: props.strIBA,
      measures,
    });
  }
}
