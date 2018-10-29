import * as React from "react";
import { TextInput, Button, View, Text } from "react-native";
import graphqlTag from "graphql-tag";
import { Mutation } from "react-apollo";

interface IProps {
  onSubmit: (text: string) => void;
  label: string;
  value: string;
}

interface IState {
  text: string;
}

interface IReservation {
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

class MyTextInput extends React.Component<IProps, IState> {
  public state = {
    text: this.props.value
  };

  public render() {
    return (
      <View>
        <Text>{this.props.label}</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Enter text..."
          onSubmitEditing={this.onSubmit}
          onChangeText={this.onChange}
          value={this.state.text}
        />
      </View>
    );
  }

  private onSubmit = () => {
    this.props.onSubmit(this.state.text);
  };

  private onChange = (text: string) => {
    this.setState({ text });
  };
}

const ADD_RESERVATION = graphqlTag`
mutation addReservation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
  addReservation(name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate) {

    name
    hotelName
    arrivalDate
    departureDate
  }
}
`;

class NewReservation extends React.Component<null, any> {
  state = {
    name: "",
    hotelName: "",
    arrivalDate: "",
    departureDate: ""
  };

  setReservation = (key: string, value: string) => {
    console.log(key, value);
    this.setState({
      [key]: value
    });
  };
  render() {
    return (
      <Mutation
        mutation={ADD_RESERVATION}
        refetchQueries={["queryReservations"]}
      >
        {addReservation => {
          const add = () => {
            addReservation({
              variables: {
                name: this.state.name,
                hotelName: this.state.hotelName,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate
              }
            });
          };

          return (
            <View>
              <MyTextInput
                onSubmit={value => this.setReservation("name", value)}
                label="name"
                value={this.state.name}
              />
              <MyTextInput
                onSubmit={value => this.setReservation("hotelName", value)}
                label="hotelName"
                value={this.state.hotelName}
              />
              <MyTextInput
                onSubmit={value => this.setReservation("arrivalDate", value)}
                label="arrivalDate"
                value={this.state.arrivalDate}
              />
              <MyTextInput
                onSubmit={value => this.setReservation("departureDate", value)}
                label="departureDate"
                value={this.state.departureDate}
              />
              <Button onPress={add} title="Add" />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default NewReservation;
