# Cucumber and Selenium acceptance testing

## Technologies Used
Docker
Maven 
Cucumber

## Setup
Install docker https://docs.docker.com/engine/installation/.

## Run Tests
Open a terminal session. Navigate to the JVM acceptance test directory (/Crazy-Kittens-Game/acceptance/jvm). It should 
contain a `docker-compose.yml` file. Run:

`docker-compose up`

## Crazy Kittens
Crazy Kittens should be running locally in a docker container. It's a web application, you should be able to inspect it 
at http://localhost:8080/

## Selenium Standalone
There should be a Selenium standalone instance also running locaally. Selenium standalone provides a web browser (in this case,
Chrome) that our test implementation can use to interact with Crazy Kittens. You can access the console at 
http://localhost:4444/wd/hub

## Tests
A container instance that will run Maven targets is started, allowed to copmlete, and then dies. The targets are defined in 
the pom.xml file. 

### Viewing Results
Results from the last test run are put into `/target/surefire-reports`. 

## Issues
   * External page scenario results bundled up with the cukes demo example
   * Missing tests against kittens
   * Separate docker-compose commands for starting the 'persistent' containers (kittens, selenium) and running tests

