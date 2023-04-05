# TaskMaster

We  created a simple task list that meets all your needs. Say goodbye to handwritten to-do lists with missing detail, and say hello to having all the information you need to get your tasks done. You can set reminders to important appointments, meetings, daily activities, and habits to the list.
Adding tasks is quick and so is organizing them, but there's seemingly no end of variation in ways to organize them. Areas can contain tasks or projects; projects can contain tasks or headers that can also contain tasks; and tasks can contain subtasks if you want. It sounds confusing, but it isn't, which really speaks to how well Things is designed.
The technologies used in the app are React for the front end. We used GraphQL with a Node.js and Express.js server.We used MongoDB and the Mongoose ODM for the database. We used queries and mutations for retrieving, adding, updating, and deleting data.We deployed it using Heroku.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![TaskMaster](./img/Screenshot%202023-04-05%20180015.png)

## Features

- Create new notes
- Edit existing notes
- Delete notes
- View list of all notes
- Search notes by title or content

## Usage

To use the application, follow these steps:

1. Open the deployed site at https://task-master-1.herokuapp.com/
2. To create a new note, click on the "New Note" button at the top of the page.
3. To edit an existing note, click on the note you want to edit in the list and click on the "Edit" button.
4. To delete a note, click on the note you want to delete in the list and click on the "Delete" button.
5. To search for a note, type a search term in the search bar at the top of the page.

## Installation

To install the application locally, follow these steps:

1. Clone the repository:
git clone https://github.com/<username>/<repository>.git

2. Navigate to the repository directory:
cd <repository>


3. Install the dependencies:
npm install


4. Create a `.env` file with the following contents:
MONGODB_URI=<MongoDB connection string>


5. Start the server:

6. Open the application in a web browser at `http://localhost:3000/`.

## Technologies Used

- Apollo Server/GraphQL
- MongoDB
- Express
- React
- Node.js
- Bootstrap
- Heroku

## License

This project is licensed under the MIT License.

## Authors

Kyle Roff
Yasmine Mohamed
David Rose