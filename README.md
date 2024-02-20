# TodoList

This project is a simple to-do list application built with Angular CLI version 16.2.11. The front-end is designed using Angular, a popular framework for building web applications, while the back-end functionality is handled by Laravel, a PHP framework known for its elegant syntax and robustness.

The Angular application serves as the user interface, allowing users to create, view, and manage their to-do items. The Laravel API, on the other hand, is responsible for storing and retrieving to-do items from the database, ensuring that the data persists across sessions and can be accessed by the Angular front-end.

## Requirements

To run this project, you will need to have the following software and tools installed on your machine:

- Node.js: Angular 16 requires Node.js to be installed. You can download the latest version from the official Node.js website 12.
- npm (Node Package Manager): npm is the package manager for Node.js and is necessary for installing Angular and its dependencies. It is included with Node.js 12.
- Angular CLI: The Angular CLI is a command-line interface for Angular, which is used to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment. You can install the latest version of Angular CLI globally on your machine using the following command: npm install -g @angular/cli@latest 2.
- Composer: Composer is a dependency manager for PHP and is used in Laravel projects. You can download and install Composer from the official website.
- Laravel Sail: Laravel Sail is a lightweight command-line interface for interacting with Laravel's default Docker environment. It is included with Laravel and does not require separate installation.
- Docker: Laravel Sail uses Docker to manage the application's services. You will need to have Docker installed on your machine to use Laravel Sail.


## How to use

1. Clone this repo: `git clone https://github.com/r0zh/todo-list-angular`
2. Navigate to the `todo-list-angular` directory: `cd todo-list-angular`
3. Install the necessary npm packages: `npm install`
4. Navigate to the `laravel-api` directory: `cd laravel-api`
5. Install the necessary composer packages: `composer install`
6. Start the Laravel Sail environment: `./vendor/bin/sail up -d`
7. Run the database migrations: `./vendor/bin/sail artisan migrate`
8. Navigate to the `todo-list-angular` directory: `cd ..`
9. Builds and serves the angular application: `ng serve`

After following these steps, your Laravel and Angular applications should be up and running at `http://localhost:4200/` with the database set up.
