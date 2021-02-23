import axios from "axios";
import { Either, Left, Right } from "purify-ts/Either";
import Hero from "../../../domain/entities/Hero";
import Exception from "../../../domain/usecases/errors/Exception";
import HeroesDatasource from "../HeroesDatasource";

export default class HeroesDatasourceRemote implements HeroesDatasource {

    // The url of the Marvel API.
    API_URL: string = "https://gateway.marvel.com:443/v1/public/characters";

    // Size of the search in the API by interaction.
    PAGE_SIZE = 20;

    // Get the heroes from the Marvel API.
    async GetHeroes(page: number): Promise<Either<Exception, Hero[]>> {

        try {

            // Request to get the list of heroes from Marvel API.
            const result = await axios.get(this.API_URL + '?limit=20&offset=' + page * this.PAGE_SIZE + '&ts=1&apikey=249214f19d4dd23dcab7165d06e07524&hash=60897e90e97fe5110c98b860e9e6010f');

            // Verify if the response is OK.
            if (result.status == 200) {
                // Map the json to heroes list.
                const heroes = result.data.data.results.map(heroJSON => Hero.fromJson(heroJSON));

                // Return the list of heroes.
                return Right(heroes);
            } else {
                // Return some error.
                return Left(new Exception("Error: status " + result.status));
            }
        } catch (error) {
            // Return some error.
            return Left(new Exception(error));
        }

    }

    // Get the hero details from the Marvel API.
    async GetHeroDetail(id: number): Promise<Either<Exception, Hero>> {

        try {

            // Request to get the hero details from Marvel API.
            const result = await axios.get(this.API_URL + '/' + id + '?&ts=1&apikey=249214f19d4dd23dcab7165d06e07524&hash=60897e90e97fe5110c98b860e9e6010f');

            // Verify if the response is OK.
            if (result.status == 200) {
                // Map the json to hero instance.
                const heroes = result.data.data.results.map(heroJSON => Hero.fromJson(heroJSON));

                // Return a new instance of hero.
                return Right(heroes[0]);
            } else {
                // Return some error.
                return Left(new Exception("Error: status " + result.status));
            }
        } catch (error) {
            // Return some error.
            return Left(new Exception(error));
        }

    }

    // Verify if the hero was favorited by user. Don't have implementation for this class.
    IsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        throw new Error("Method not implemented.");
    }

    // Set the hero isFavorited option as true. Don't have implementation for this class.
    SetAsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        throw new Error("Method not implemented.");
    }

    // Set the hero isFavorited option as false. Don't have implementation for this class.
    UnFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        throw new Error("Method not implemented.");
    }

    // Get a list of favorited heroes by user. Don't have implementation for this class.
    ShareFavorites(): Promise<Either<Exception, string>> {
        throw new Error("Method not implemented.");
    }

}