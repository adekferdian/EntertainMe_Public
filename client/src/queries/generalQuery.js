import { from } from "@apollo/client";
import { gql } from '@apollo/client';

export const GET_ALL = gql`
    query {
        movies {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags,
        }
        allTvSeries {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags,
        }
    }
`