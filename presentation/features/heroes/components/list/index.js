import React, { PureComponent } from 'react';
import { Button, Card } from 'react-native-paper';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { getheroes } from '../../redux/store';

// Current page called from the API that get the heroes list.
var currentPage = 1;

// Page of list of heroes.
class ListHero extends PureComponent {

    componentDidMount() {

        //Dispatch the dispatcher
        this.props.getheroes();
    }

    render() {

        // Get the heroes list and the flag loading.
        const { heroes, loading } = this.props;
        
        if (!loading) {
            // If isn't loading. Show the list.
            return <View>
                {/* List of heroes. Show each 20 next element. */}
                <FlatList
                    data={heroes}
                    renderItem={({ item: hero }) => CardHero({ hero: hero, props: this.props })}
                    keyExtractor={(hero, index) => (hero.id).toString()}
                    initialNumToRender={20}
                    onEndReached={info => {
                        currentPage += 1;
                        this.props.getheroes(currentPage);
                    }}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={
                        <View>
                            {loading && <Text >Loading More...</Text>}
                        </View>
                    }
                />
            </View>
        } else {
            // If is loading.
            return (
                <View>
                    <Text >Loading More...</Text>
                </View>
            )
        }
    }
}


// Map the redux state to the props.
const mapStateToProps = state => ({
    heroes: state.heroes,
    loading: state.loading,
    favoriteList: state.favoriteList
})

// Map the action creators to the props.
const mapDispatchToProps = {
    getheroes,
}

// Card the have the hero data.
const CardHero = ({ hero, props }) => {
    return <Card>

        <Card.Title title={hero.name} subtitle={hero.name} />
        <Card.Cover source={{ uri: hero.thumbnail }} />

        <Card.Actions>
            {/* Go to the hero details. */}
            <Button onPress={() => props.navigation.push('Details', { id: hero.id })}>View More...</Button>
        </Card.Actions>
    </Card>
};

//export the list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ListHero);