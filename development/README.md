# Development Environment

Provides a local environment with all the needed dependencies of the project using `docker` and `docker-compose` to orchestrate containers. The environment consists of two main systems; `mongodb` and `minio`.

## Backend
A Dockerfile builds the image for the backend. Specifying the .env file location could be changed in the [docker-compose file](./docker-compose.yml). The start command could (`yarn start dev`) could also be overriden from the docker-compose file. 

## Mongodb
The db is seeded using a previously created dump from [mongo-seed folder](./mongo-seed/zukunftschreiben)
It contains some basic objects for each collection.

## minio
`minio` is an opensource object store. It is compatible with aws sdk, accrodingly it could be used to provide buckets for working with locally. Data inside buckets are persisted locally at `development/data`.

## How To Run
For starting the environment the following steps should be executed:
- start from `development` directory
- run the following commands
    - ```shell 
        docker-compose build
        ```
    - ```shell 
        docker-compose up -d
        ```

## Accessing Services
`minio` interface will be found at `localhost:9000` with the following credentials:
- access key: minio
- secret key: minio123

`mongodb` could be accesed through the following url `mongodb://localhost:27017`
