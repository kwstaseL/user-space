# User Space

A simple user management app that I built for learning Angular and Spring Boot.

### Features

- Register users.
- View user profiles.
- Edit existing user information.
- Delete existing users.
- Support for paginated and sortable user data.
- Simple JWT authentication.

### Additional Information

- Use of JPA/Hibernate for ORM.
- Client & Server user data integrity.
- SPA Angular app.

### Installation

#### Configure the frontend:

- Navigate into the frontend folder.
- Run `npm install`.
- Start the app using `ng serve`.

#### Configure the backend:

This project is configured to use MySQL.

- Navigate to the backend directory.
- Create a new run configuration.
- Use `../application.properties` as a blueprint and update your new configuration with your local settings.
- Run the app through your configuration.

### Building with Docker

- Create a copy of `.env.sample` in the project's root directory and name it `.env`.
- Fill the `.env` file with your local settings using `.env.sample` as a blueprint.
- Run `docker compose up`.
