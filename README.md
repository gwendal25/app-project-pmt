# AppProjectPmt

This project is the front-end of the Project Management Tool application made for the SpringBoot/Angular formation of Iscod. In order to use this project for development, you will need to have npm and Angular installed on your computer.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

### Use the production image

In order to use the image of this project, you will need to have Docker installed. Follow the below steps in order to run the project with Docker

Create a network named spring-cloud-network, if you do not have any

```bash
docker network create spring-cloud-network
```

Pull the latest project image

```bash
docker pull gwendal25/app-project-pmt:latest
```

Run the project image

```bash
docker container run -it --rm --name app-project-pmt-hub --network spring-cloud-network `
    -p 4200:4200 `
	gwendal25/app-project-pmt:latest 
```


### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner and get the code coverage, use the following command:

```bash
npm run test-coverage
```

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
