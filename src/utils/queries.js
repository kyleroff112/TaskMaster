import { gql } from '@apollo/client';
export const USERS = gql`
    query users {
        users {
            id
            username
            email
        }  
    }
`;


export const GET_ALL_TASKS = gql`
    query getAllTasks {
        getAllTasks {
            id
            title
            description
            completed
        }
    }
`;

