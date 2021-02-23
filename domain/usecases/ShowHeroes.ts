import Hero from "../entities/Hero";
import HeroesRepository from "../repositories/HeroesRepository";
import UseCase from "./UseCase";
import { Either } from "purify-ts/Either";
import HeroesParam from './params/HeroesParam';
import Exception from "./errors/Exception";

// Use case to show heroes list from Marvel API.
export default class ShowHeroes implements UseCase<Hero[], HeroesParam> {
  
  // Repository of heroes.
  heroesRepo: HeroesRepository;

  constructor(heroesRepo: HeroesRepository) {
    this.heroesRepo = heroesRepo;
  }

  async call(params: HeroesParam): Promise<Either<Exception, Hero[]>> {
    // Call to repository to get heroes.
    return this.heroesRepo.GetHeroes(params.page);
  }

}
