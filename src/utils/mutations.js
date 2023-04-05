import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                username
            }
            tasks {
                id
                title
                description
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const CREATE_TASK = gql`
    mutation createTask($title: String!, $description: String!, $user_id: ID!) {
        createTask(title: $title, description: $description, user_id: $user_id) {
            id
            title
            description
        }
    }
`;

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
            title
            description
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask($id: ID!, $title: String!, $description: String!, $completed: Boolean!) {
        updateTask(id: $id, title: $title, description: $description, completed: $completed) {
            id
            title
            description
            completed
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation logout($id: ID!) {
        logout(id: $id) {
            id
            username
        }
    }
`;

export const GET_ALL_TASKS_FOR_USER = gql`
    mutation getAllTasksForUser($userId: ID!) {    
        getAllTasksForUser(userId: $userId) {
            id
            title
            description
            completed
        }

    }
`;