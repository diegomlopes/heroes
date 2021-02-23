import Hero from "../entities/Hero";
import HeroesRepository from "../repositories/HeroesRepository";
import UseCase from "./UseCase";
import { Either } from "purify-ts/Either";
import Exception from "./errors/Exception";
import NoParam from "./params/NoParam";

// Use case to share favorited list by user.
export default class ShareFavorites implements UseCase<string, NoParam> {

    // Repository of heroes.
    heroesRepo: HeroesRepository;

    constructor(heroesRepo: HeroesRepository) {
        this.heroesRepo = heroesRepo;
    }

    async call(params: NoParam): Promise<Either<Exception, string>> {
        // Call to repository to get the list of favorited heroes by user.
        return this.heroesRepo.ShareFavorites();
    }

}