const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require('ioredis');
const { all } = require('../../../services/movies/routes');
const redis = new Redis;

const typeDefs = gql`
    type TvSeries {
        _id: String
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        allTvSeries: [TvSeries]
        tvSeries(_id: String): TvSeries
    }

    input seriesInput {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Mutation {
        addSeries(series: seriesInput): TvSeries
        updateSeries(_id: String, series: seriesInput): TvSeries
        deleteSeries(_id: String): TvSeries
    }
`;

const apiTvSeriesUrl = `http://localhost:4010/tvSeries`

const resolvers = {
    Query: {
        allTvSeries: async () => {
            console.log('masukk nih <<<');
            const allSeriesRedis = await redis.get('allTvSeries')
            try {
                if (allSeriesRedis) {
                    return JSON.parse(allSeriesRedis)
                }
                const allTvSeries = await axios.get(apiTvSeriesUrl)
                await redis.set('tvSeries', JSON.stringify(allTvSeries.data))
                console.log(allTvSeries.data, '------------2');
                return allTvSeries.data
            } catch (error) {
                return error
            }
        },
        tvSeries: async (_, args) => {
            console.log('masuk ke sini?');
            // const allSeriesRedis = await redis.get('tvSeries')
            try {
                // if (allSeriesRedis) {
                //     const selectedSeries = JSON.parse(allSeriesRedis).filter(series => series._id) === args._id
                //     return selectedSeries[0]
                // }
                const selectedSeries = await axios.get(`${apiTvSeriesUrl}/${args._id}`)
                return selectedSeries.data
            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        addSeries: async (_, args) => {
            const series = await axios.post(apiTvSeriesUrl, args.series)
            const allSeriesRedis = await redis.get('tvSeries')
            const newData = JSON.parse(allSeriesRedis).concat(series.data)
            await redis.set('tvSeries', JSON.stringify(newData))
            return series.data
        },
        updateSeries: async (_, args) => {
            const series = await axios.put(`${apiTvSeriesUrl}/${args._id}`, arg.series)
            const allSeriesRedis = await redis.set('tvSeries')
            const newData = JSON.parse(allSeriesRedis).filter(series => series._id !== args._id )
            const updatedSeries = newData.concat(series.data)
            await redis.set('tvSeries', JSON.stringify(updatedSeries))
            console.log(series.data)
            return series.data
        },
        deleteSeries: async (_, args) => {
            const series = await axios.delete(`${apiTvSeriesUrl}/${args._id}`)
            const allSeriesRedis = await redis.get('tvSeries')
            const newData = JSON.parse(allSeriesRedis).filter(series => series._id !== args._id)
            await redis.set('tvSeries', JSON.stringify(newData))
            return series.data
        }
    }
};

module.exports = { typeDefs, resolvers }