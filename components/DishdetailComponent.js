import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Image, Icon } from "react-native-elements";
import { ScrollView } from "react-native-virtualized-view";
import { Rating, Input, Button } from "react-native-elements";
import { Modal } from "react-native";
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
import { baseUrl } from "../shared/baseUrl";

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image
            source={{ uri: baseUrl + dish.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Icon
            raised
            reverse
            type="font-awesome"
            color="#f50"
            name={this.props.favorite ? "heart" : "heart-o"}
            onPress={() =>
              this.props.favorite
                ? alert("Already favorite")
                : this.props.onPressFavorite()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={this.props.onPressComment}
          />
        </Card>
      );
    }
    return <View />;
  }
}

class RenderComments extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList
          data={this.props.comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating readonly startingValue={item.rating} imageSize={12} />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  }
}

// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};
import { postFavorite, postComment } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    };
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter(
      (cmt) => cmt.dishId === dishId
    );
    const favorite = this.props.favorites.some((el) => el === dishId);
    return (
      <>
        <ScrollView>
          <RenderDish
            dish={dish}
            favorite={favorite}
            onPressFavorite={() => this.markFavorite(dishId)}
            onPressComment={() => this.toggleModal()}
          />
          <RenderComments comments={comments} />
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={{ marginTop: 50, padding: 20 }}>
            <Rating
              showRating
              startingValue={this.state.rating}
              onFinishRating={(rate) => this.setState({ rating: rate })}
            />

            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(text) => this.setState({ author: text })}
            />

            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={(text) => this.setState({ comment: text })}
            />

            <Button
              title="Submit"
              onPress={() => this.handleSubmit()}
              buttonStyle={{ backgroundColor: "#512DA8" }}
            />

            <Button
              title="Cancel"
              onPress={() => this.resetForm()}
              buttonStyle={{ backgroundColor: "gray", marginTop: 10 }}
            />
          </View>
        </Modal>
      </>
    );
  }
  markFavorite(dishId) {
    // this.setState({ favorites: this.state.favorites.concat(dishId)});
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    });
  }

  handleSubmit() {
    const dishId = parseInt(this.props.route.params.dishId);

    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );

    this.resetForm();
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
