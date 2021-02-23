import Hero from "../../entities/Hero";

// Define the params for favoriteHero use case.
export default class FavoriteHeroParam {
    
    // The hero instance.
    hero: Hero;
    
    // Option of the user.
    isFavorite: boolean;

    constructor(hero: Hero, isFavorite: boolean) {
        this.hero = hero;
        this.isFavorite = isFavorite;
    }
}