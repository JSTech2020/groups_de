# Zukunftschreiben x JSTech

This repository hosts the project by Zukunftschreiben and JSTech at TUM in SS2020.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
This project is based on the MERN stack. You will need to install MongoDB and NodeJS for the backend software.

[MongoDB installation guide]: https://docs.mongodb.com/manual/installation/
Follow the installation guide for NodeJS: https://nodejs.org/en/

`Yarn` is used as a package manager. [How to install](https://yarnpkg.com/getting-started)

### Installing

As an example, create a mongo database called `zukunftschreiben` with one collection `users`.
Add a sample document:
```
{
    "username" : "test"
}
```

Install all project dependencies:

```
    $ cd frontend-zs
    $ yarn install
    $ cd ..
    $ cd backend-zs
    $ yarn install
```

Go to the root folder that contains `frontend-zs` and `backend-zs` and run `yarn run dev`, this will start the server app as well as the react app.

### Coding style guide

React coding style guide based on [Airbnb](https://airbnb.io/javascript/react/)
Node JS coding style guide based on https://docs.npmjs.com/misc/coding-style

## Deployment

[TODO]


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

