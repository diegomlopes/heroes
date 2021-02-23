import Hero from "../entities/Hero";
import HeroesRepository from "../repositories/HeroesRepository";
import UseCase from "./UseCase";
import HeroDetailParam from "./params/HeroDetailParam";
import { Either } from "purify-ts/Either";
import Exception from "./errors/Exception";

// Use case to show hero detail from Marvel API.
export default class ShowHeroDetail implements UseCase<Hero, HeroDetailParam> {

    // Repository of heroes.
    heroesRepo: HeroesRepository;

    constructor(heroesRepo: HeroesRepository) {
        this.heroesRepo = heroesRepo;
    }

    async call(params: HeroDetailParam): Promise<Either<Exception, Hero>> {
        // Call to repository to get hero details.
        const result = await this.heroesRepo.GetHeroDetail(params.id);

        // Get hero instance.
        const hero = result.orDefault(null);

        // Call to repository to verify if the hero was favorited by user.
        return this.heroesRepo.IsFavorite(hero);
    }

}