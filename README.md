# Simple Kanban Board

This project is a simple kanban board application built with Angular CLI version 16.2.11. The front-end is designed using Angular, a popular framework for building web applications, while the back-end functionality is handled by Flask, a lightweight Python web framework known for its simplicity and flexibility.

The Angular application serves as the user interface, allowing users to create, view, and manage their to-do items. The Flask API, on the other hand, is responsible for storing and retrieving to-do items from the database, ensuring that the data persists across sessions and can be accessed by the Angular front-end.

## Requirements

To run this project, you will need to have the following software and tools installed on your machine:
- Node.js: Angular 16 requires Node.js to be installed. You can download the latest version from the official Node.js website.
- npm (Node Package Manager): npm is the package manager for Node.js and is necessary for installing Angular and its dependencies. It is included with Node.js.
- Angular CLI: The Angular CLI is a command-line interface for Angular, which is used to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment. You can install the latest version of Angular CLI globally on your machine using the following command: npm install -g @angular/cli@latest.
- Python: Flask requires Python to be installed. You can download the latest version from the official Python website.
- pip (Python Package Installer): pip is the package installer for Python and is necessary for installing Flask and its dependencies.
- Docker: Flask can be easily containerized with Docker, which is used to manage the application's services. You will need to have Docker installed on your machine to use Flask with Docker.

## How to use

- Clone this repo: git clone https://github.com/r0zh/todo-list-angular
- Navigate to the todo-list-angular directory: cd todo-list-angular
- Install the necessary npm packages: npm install
- Build and run the Docker container for the Flask API: docker-compose up -d
- Builds and serves the angular application: ng serve

After following these steps, your Flask and Angular applications should be up and running at http://localhost:4200/ with the database set up.

The Docker Compose setup includes a Python (Flask 3.8) server and a MySQL database, along with phpMyAdmin for database management. The Flask API is accessible on port 8081, and phpMyAdmin is available on port 8084.
