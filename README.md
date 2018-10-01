# cybersource-tab-sequence

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## HTML Example
* You can open `./RenderedDom.html` in a browser to see what the current tabbing behaviour is. Otherwise you can checkout the Angular project.

## Project setup and requirements
* Install Node.js - https://nodejs.org/en/download/
* Install Angular 5 - Simply run `npm install -g @angular/cli` in a terminal after Node.js has been installed.
* Run `npm install` in the root of the project.
* Update the `jwkUrl` property in `./src/app/app.component.ts` to point to the location where the JWK can be retrieved.

## Running the project
* In the root of the project run `ng serve`
* Open up a browser of your choice navigate to `http://localhost:4200/`
* This should load up a screen with 2 stock input fields separated by a blue band between them. The blue band in the container for Microform. If the Microform does not load it's most likely due to a failure to retrieve the JWK

## Files containing code
* `./src/app/app.component.ts`
* `./src/app/app.component.html`