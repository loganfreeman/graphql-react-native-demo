import * as React from "react";
import { FlatList, Text, View, ScrollView } from "react-native";

import graphqlTag from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_RESERVATIONS = graphqlTag`
query  queryReservations {
  reservations {
    id
    name
    hotelName
  }
}
`;

interface IData {
  reservations: Array<{ name: string; id: number; hotelName: string }>;
}

class QueryReservations extends Query<IData> {}

const getTextView = text => (
  <View>
    <Text>{text}</Text>
  </View>
);

const List = () => (
  <QueryReservations query={QUERY_RESERVATIONS}>
    {({ loading, error, data }) => {
      if (loading) return getTextView("Loading...");
      if (error) return getTextView(`Error: ${error}`);
      if (!data) return getTextView("No Data");
      return (
        <ScrollView>
          <FlatList
            data={data.reservations}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </ScrollView>
      );
    }}
  </QueryReservations>
);

export default List;
