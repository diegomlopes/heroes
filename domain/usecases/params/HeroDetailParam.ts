// Define the params for favoriteHero use case.
export default class HeroDetailParam {
    
    // The id of the hero, provided by Marvel API.
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}