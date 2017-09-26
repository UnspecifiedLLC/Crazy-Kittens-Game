# Cucumber and Selenium acceptance testing

## Technologies Used
Docker
Maven 
Cucumber

## Setup
Install docker https://docs.docker.com/engine/installation/.

## Start the application and the Selenium server
Open a terminal session. Navigate to the JVM acceptance test directory (/Crazy-Kittens-Game/acceptance/jvm). Run:

`docker-compose -f kittens-compose.yml up`

This will start two containers: 

### Crazy Kittens
Crazy Kittens should be running locally in a docker container. It's a web application, you should be able to inspect it 
at http://localhost:8080/

### Selenium Standalone
There should be a Selenium standalone instance also running locaally. Selenium standalone provides a web browser (in this case,
Chrome) that our test implementation can use to interact with Crazy Kittens. You can access the console at 
http://localhost:4444/wd/hub

This terminal session will now show the output of the Selenium server. When you're ready to stop, use ctrl-c to kill the process.

## Run Tests
Open a terminal session. Navigate to the JVM acceptance test directory (/Crazy-Kittens-Game/acceptance/jvm). Run:

`docker-compose up`

A transient container instance that will run Maven targets will be started. It will run tests (via Maven targets defined in 
the pom.xml file).  

### Viewing Results
Results from the last test run are put into `/Crazy-Kittens-Game/acceptance/jvm/target/surefire-reports`. 

## Issues
  * some crufty example code should be cleaned out 
  * could use more tests of the actual gameplay, development of the KittensPage class

