# Getting Started

## Setup
Because of the cors issues we get in local development, enable proxy by going to https://cors-anywhere.herokuapp.com/corsdemo
and request temporary access.

### to install `yarn` or `npm install` in root
### to start `yarn start` or `npm start` in root 

## Design/Scope decisions
I decided not to use a global state but rather only update the components local state,
as the application is now with no more than one page a more complex state seemed like overkill.

I did decide to use axios instead of fetch method for readability and code cleanliness.

I did decide not to implement a server since there were no need for handling high data load.
