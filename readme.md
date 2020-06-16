# Mapbox datasets remote schema

We first need to create a [Mapbox datasets](https://docs.mapbox.com/api/maps/#datasets).
In a second time the [Mapbox Tilequery API](https://docs.mapbox.com/playground/tilequery/) allows you to retrieve data about specific features from a vector tileset, based on a given latitude and longitude.

## Hasura Postgis with remote schema

`docker-compose up`

## Insert Sample Data

Go to SQL tab to ass some very basic user id and coordinates into a new `user_location` table.
Change users coordinates according to your mapbox datasets, we will query data informations in a 3000 meters radius.

```sql
-- User location data
CREATE TABLE user_location (
  user_id INTEGER PRIMARY KEY,
  location GEOGRAPHY(Point)
);
```

> GraphQL Mutation

```gql
mutation insertUserLocation(
  $user_location_objects: [user_location_insert_input!]!
) {
  insert_user_location(objects: $user_location_objects) {
    returning {
      location
      user_id
    }
  }
}
```

> Variable would be the following:

```json
{
  "user_location_objects": [
    {
      "user_id": 1,
      "location": {
        "type": "Point",
        "coordinates": [2.5365543365478516, 48.77236950468487]
      }
    },
    {
      "user_id": 2,
      "location": {
        "type": "Point",
        "coordinates": [2.5059127807617183, 48.7550429007606]
      }
    }
  ]
}
```

## Deploy with Glitch

1. Click the following button to edit on glitch

   [![glitch-deploy-button](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](http://glitch.com/edit/#!/import/github/RobyRemzy/mapbox-datasets-remote-schema)

2. Rename `.env-sample` into `.env` and add the following environment variables.

```env
MAPBOX_API_KEY='YOUR-MAPBOX-TOKEN'
TILESET_ID='YOUR-TILE-ID'
```

3. Open the app on glitch or local Apollo server to test qickly

> Query

```gql
query($location: geography!) {
  places(location: $location) {
    name
    address
    lat
    lng
    distance
    rating
  }
}
```

> Test some coordinates in the variable to query mapbox datasets

```json
{
  "location": {
    "type": "Point",
    "coordinates": [2.5365543365478516, 48.77236950468487]
  }
}
```

### in Hasura console add remote schema

In Remote Shema just add a new remot shema and enter your glitch app url in
`GraphQL server URL`

### in Hasura console add the Remote Relationship called

Now in DATA > Relationships > Remote Relationships
click on `add remote relationships` and select your dataset and tables to work with

### query user info with the remote schema

```
query {
  user_location {
    user_id
     shops {
      name
      address
      lat
      lng
      rating
      distance
    }
  }
}
```
