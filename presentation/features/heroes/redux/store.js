import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { fetchData, fetchDataFulfilled, fetchDataRejected, fetchHeroDetailSuccess, fetchHeroDetailError, fetchFavoriteHeroSuccess, fetchFavoriteHeroError } from './reducer';
import HeroesDatasourceRemote from '../../../../data/datasources/remote/HeroesDatasourceRemote';
import HeroesRepositoryImpl from '../../../../data/repositories/HeroesRepositoryImpl';
import ShowHeroes from '../../../../domain/usecases/ShowHeroes';
import ShowHeroDetail from '../../../../domain/usecases/ShowHeroDetail';
import FavoriteHero from '../../../../domain/usecases/FavoriteHero';
import ShareFavorites from '../../../../domain/usecases/ShareFavorites';
import HeroesParam from '../../../../domain/usecases/params/HeroesParam';
import HeroDetailParam from '../../../../domain/usecases/params/HeroDetailParam';
import HeroesDatasourceLocal from '../../../../data/datasources/local/HeroesDatasourceLocal';
import FavoriteHeroParam from '../../../../domain/usecases/params/FavoriteHeroParam';
import NoParam from '../../../../domain/usecases/params/NoParam';

// Create the  heroes datasource remote.
const dsRemote = new HeroesDatasourceRemote();
// Create the  heroes datasource local.
const dsLocal = new HeroesDatasourceLocal();
// Create the  heroes repository.
const repository = new HeroesRepositoryImpl(dsRemote, dsLocal);
// Create the  use case ShowHeroes.
const showHeroes = new ShowHeroes(repository);
// Create the  use case ShowHeroDetail.
const showHeroDetail = new ShowHeroDetail(repository);
// Create the  use case FavoriteHero.
const favoriteHero = new FavoriteHero(repository);
// Create the  use case ShareFavorites.
const shareFavorites = new ShareFavorites(repository);

// Define the action creators that will be responsible for get heroes.
export const getheroes = (page = 0) => {
  return async dispatch => {
    // Create a dispatcher to loading data.
    dispatch(fetchData(true));

    // Result from the repository.
    const result = await showHeroes.call(new HeroesParam(page));
    
    // List of heroes
    const heroes = result
      .ifLeft((error) => dispatch(fetchDataRejected(error)))
      .orDefault([])

    // Create a dispatcher to fill the list of heroes.
    dispatch(fetchDataFulfilled(heroes))
  }
}

// Define the action creators that will be responsible for get the hero details.
export const getDetails = (id) => {
  return async dispatch => {
    // Create a dispatcher to loading data.
    dispatch(fetchData(true));

    // Result from the repository.
    const result = await showHeroDetail.call(new HeroDetailParam(id));

    // Hero with details.
    const hero = result
      .ifLeft((error) => dispatch(fetchHeroDetailError(error)))
      .orDefault([])

    // Create a dispatcher to fill the hero detail.
    dispatch(fetchHeroDetailSuccess(hero))
  }
}

// Define the action creators that will be responsible for favorite a hero.
export const setFavoriteHero = (heroDetail, isFavorite) => {
  return async dispatch => {

    // Create a dispatcher to loading data.
    dispatch(fetchData(true));

    // Result from the repository.
    const result = await favoriteHero.call(new FavoriteHeroParam(heroDetail, isFavorite));

    // The hero updated.
    const hero = result
      .ifLeft((error) => dispatch(fetchFavoriteHeroError(error)))
      .orDefault([])

    // Create a dispatcher to update status of hero.
    dispatch(fetchFavoriteHeroSuccess(hero))
  }
}

// Define the action creators that will be responsible for get the list of favorites.
export const shareList = async () => {

  // Result from the repository.
  const result = await shareFavorites.call(new NoParam());
  
  // The founded list of favorites.
  const favorites = result
    .ifLeft((error) => console.log(error))
    .orDefault("");

  return favorites;
}

//Export the store as a default export 
const store = createStore(reducer, applyMiddleware(thunk))

// Export the store created.
export default store;