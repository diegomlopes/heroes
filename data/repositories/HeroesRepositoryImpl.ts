import Hero from "../../domain/entities/Hero";
import HeroesRepository from "../../domain/repositories/HeroesRepository";
import { Either, Left, Right } from 'purify-ts/Either';
import Exception from "../../domain/usecases/errors/Exception";
import HeroesDatasourceRemote from "../datasources/remote/HeroesDatasourceRemote";
import HeroesDatasourceLocal from "../datasources/local/HeroesDatasourceLocal";


// An implementation of HeroesRepository.
export default class HeroesRepositoryImpl implements HeroesRepository {

    // The heroes datasource remote.
    dsRemote: HeroesDatasourceRemote;

    // The heroes datasource local.
    dsLocal: HeroesDatasourceLocal;

    constructor(dsRemote: HeroesDatasourceRemote, dsLocal: HeroesDatasourceLocal) {
        this.dsRemote = dsRemote;
        this.dsLocal = dsLocal;
    }

    // Get the heroes from the Marvel API.
    GetHeroes(page: number): Promise<Either<Exception, Hero[]>> {
        return this.dsRemote.GetHeroes(page);
    }

    // Get the hero details from the Marvel API.
    GetHeroDetail(id: number): Promise<Either<Exception, Hero>> {
        return this.dsRemote.GetHeroDetail(id);
    }

    // Verify if the hero was favorited by user.
    IsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        return this.dsLocal.IsFavorite(hero);
    }

    // Set the hero isFavorited option as true.
    SetAsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        return this.dsLocal.SetAsFavorite(hero);
    }

    // Set the hero isFavorited option as false.
    UnFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        return this.dsLocal.UnFavorite(hero);
    }

    // Get a list of favorited heroes by user.
    ShareFavorites(): Promise<Either<Exception, string>> {
        return this.dsLocal.ShareFavorites();
    }

}