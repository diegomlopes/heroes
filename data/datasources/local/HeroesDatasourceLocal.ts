import { Either, Left, Right } from "purify-ts/Either";
import Hero from "../../../domain/entities/Hero";
import Exception from "../../../domain/usecases/errors/Exception";
import HeroesDatasource from "../HeroesDatasource";
import AsyncStorage from '@react-native-community/async-storage';


// An implementation of HeroesDatasource.
export default class HeroesDatasourceLocal implements HeroesDatasource {

    // Get the heroes from the Marvel API. Don't have implementation for this class.
    GetHeroes(page: number): Promise<Either<Exception, Hero[]>> {
        throw new Error("Method not implemented.");
    }

    // Get the hero details from the Marvel API. Don't have implementation for this class.
    GetHeroDetail(id: number): Promise<Either<Exception, Hero>> {
        throw new Error("Method not implemented.");
    }

    // Verify if the hero was favorited by user.
    async IsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        try {
            // Get the item with the key that represent this hero. key => 'hero:' + heroId. 
            const value = await AsyncStorage.getItem('hero:' + hero.id.toString());

            // If the value isn't null the user has favoriteds berofe.
            if (value !== null) {
                // Verify if it is still favorited.
                if (value.split(':')[0] == "1")
                    hero.isFavorite = true;
                else hero.isFavorite = false;
            } else {
                // Never favorited by user.
                hero.isFavorite = false;
            }

            // Return the hero.
            return Right(hero);
        } catch (error) {
            // Return some error.
            return Left(error)
        }
    }

    // Set the hero isFavorited option as true.
    async SetAsFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        try {
            // Set the item with the key that represent this hero. key => 'hero:' + heroId. Set 
            // to '1' + heroName.
            await AsyncStorage.setItem(
                'hero:' + hero.id.toString(),
                "1:" + hero.name
            );

            // Update status of this current instance.
            hero.isFavorite = true;

            // Return the instance of hero.
            return Right(hero);
        } catch (error) {
            // Return some error.
            return Left(error);
        }
    }

    // Set the hero isFavorited option as false.
    async UnFavorite(hero: Hero): Promise<Either<Exception, Hero>> {
        try {

            // Set the item with the key that represent this hero. key => 'hero:' + heroId. Set 
            // to '0' + heroName.
            await AsyncStorage.setItem(
                'hero:' + hero.id.toString(),
                "0:" + hero.name
            );

            // Update status of this current instance.
            hero.isFavorite = false;

            // Return the instance of hero.
            return Right(hero);
        } catch (error) {
            // Return some error.
            return Left(error);
        }
    }

    // Get a list of favorited heroes by user.
    async ShareFavorites(): Promise<Either<Exception, string>> {
        try {
            
            // Get all the keys storeds on device.
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);

            // The text that represent the list of heroes.
            var text = "";

            // Update the text with the favorited heroes.
            result.map(req => {
                req.forEach(e => {
                    if (e.split(':')[0] == "1") {
                        text += e.split(':')[1];
                        text += "\n";
                    }
                })
                
            });

            // Return the text that represent the list of heroes.
            return Right(text);
          } catch (error) {
              // Return some error.
            console.error(error)
          }
    }

}