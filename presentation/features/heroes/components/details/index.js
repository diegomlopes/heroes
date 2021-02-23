import React, { PureComponent } from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getDetails, setFavoriteHero } from '../../redux/store';
import { Text } from 'react-native';

// Page that show the hero details.
class DetailsHero extends PureComponent {

    componentDidMount() {
        // Dispatch the dispatcher.
        this.props.getDetails(this.props.route.params.id);
    }

    render() {

        // Get the hero detail and the flag loading.
        const { heroDetail, loading } = this.props;

        if (!loading) {
            // If isn't loading. Show card with hero detail.
            return heroDetail.thumbnail != null ?
                <View>
                    <Card>
                        <Card.Title title={heroDetail.name} />
                        <Card.Cover source={{ uri: heroDetail.thumbnail }} />
                        <Card.Content>
                            <Title>{heroDetail.name}</Title>
                            <Paragraph>{heroDetail.description}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => this.props.setFavoriteHero(heroDetail, !heroDetail.isFavorite)}>{heroDetail.isFavorite ? "UNFAVORITE" : "FAVORITE"}</Button>
                        </Card.Actions>
                    </Card>
                </View > :
                <View></View>
        } else {
            // If is loading.
            return (
                <View>
                    <Text>Loading Details...</Text>
                </View>
            )
        }

    }
}


// Map the redux state to the props.
const mapStateToProps = state => ({
    heroDetail: state.heroDetail,
    loading: state.loading,
})

// Map the action creators to the props.
const mapDispatchToProps = {
    getDetails,
    setFavoriteHero,
}

// Export the list as a default export. 
export default connect(mapStateToProps, mapDispatchToProps)(DetailsHero);

