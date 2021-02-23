import { Either } from "purify-ts/Either";
import Hero from "../../domain/entities/Hero";
import Exception from "../../domain/usecases/errors/Exception";

export default interface HeroesDatasource {

    // Get the heroes from the Marvel API.
    GetHeroes(page: number): Promise<Either<Exception, Hero[]>>;

    // Get the hero details from the Marvel API.
    GetHeroDetail(id: number): Promise<Either<Exception, Hero>>;

    // Verify if the hero was favorited by user.
    IsFavorite(hero: Hero): Promise<Either<Exception, Hero>>;

    // Set the hero isFavorited option as true.
    SetAsFavorite(hero: Hero): Promise<Either<Exception, Hero>>;

    // Set the hero isFavorited option as false.
    UnFavorite(hero: Hero): Promise<Either<Exception, Hero>>;

    // Get a list of favorited heroes by user.
    ShareFavorites(): Promise<Either<Exception, string>>;
}