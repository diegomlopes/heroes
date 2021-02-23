// The entity of hero with necessary data from the app.
class Hero {

    // Id provided by Marvel API.
    id: string;

    // Name provided by Marvel API.
    name: string;

    // Description provided by Marvel API.
    description: string;

    // Thumbnail url provided by Marvel API.
    thumbnail: string;

    // Define if the hero was favorited by user or not.
    isFavorite: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        thumbnail: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.isFavorite = false;
    }

    // Get the json and convert to a Hero instance.
    static fromJson(json: any): Hero {
        return new Hero(json.id,
            json.name,
            json.description,
            json.thumbnail.path + '.' + json.thumbnail.extension)
    }

}

// Export Hero class.
export default Hero;