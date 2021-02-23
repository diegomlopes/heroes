import Hero from "../entities/Hero";
import HeroesRepository from "../repositories/HeroesRepository";
import UseCase from "./UseCase";
import FavoriteHeroParam from "./params/FavoriteHeroParam";
import { Either } from "purify-ts/Either";
import Exception from "./errors/Exception";

// Use case to favorite the hero.
export default class FavoriteHero implements UseCase<Hero, FavoriteHeroParam> {

    // Repository of heroes.
    heroesRepo: HeroesRepository;

    constructor(heroesRepo: HeroesRepository) {
        this.heroesRepo = heroesRepo;
    }

    async call(params: FavoriteHeroParam): Promise<Either<Exception, Hero>> {

        // Favorite if the hero wasn't favorited.
        if (params.isFavorite) {
            // Favorite
            return this.heroesRepo.SetAsFavorite(params.hero);
        } else {
            // Unfavorite
            return this.heroesRepo.UnFavorite(params.hero);
        }
        
    }

}