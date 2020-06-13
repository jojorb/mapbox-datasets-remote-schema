import fetch from 'node-fetch'

const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const TILESET_ID = process.env.TILESET_ID;

const resolvers = {
    Query: {
        places: (root, args, context, info) => {
            const location = args.location;
            const coordinates = location.coordinates;
            const lat = coordinates[0];
            const lng = coordinates[1];
            const radius = 3500; // in meters
            const limit = 50; // max results

            const url=  'https://api.mapbox.com/v4/' + TILESET_ID + '/tilequery/' + lat+ ',' + lng + '.json?radius=' + radius + '&limit= ' + limit + ' &access_token=' + MAPBOX_API_KEY;
            return fetch(url)
            .then(res => res.json())
            .then((out) => {
                const feat = out.features;
                const finalResults = feat.map((item) => {
                    const finalObj = {
                        name: item.properties.name, 
                        lng: item.geometry.coordinates[0].toFixed(5), 
                        lat: item.geometry.coordinates[1].toFixed(5), 
                        distance: Number(item.properties.tilequery.distance.toFixed(0)),
                        address: item.properties.address, 
                        rating: parseFloat(item.properties.stars.replace(',', '.'))
                    }
                    return finalObj;
                });
                return finalResults;
            })
            .catch(err => { throw err });
        },
    },
};

export default resolvers;