// Define the params to showHeroes use case.
export default class HeroesParam {
    
    // Current page in the Marvel API request.
    page: number;

    constructor(page: number) {
        this.page = page;
    }
}