# NoDB Review

This repo is a review for the NoDB project to get students ready

## Get Started

Get started by running `create-react-app` in your terminal to create a brand new react application.

Once that has been created, install `cors`, and `express` from NPM.

After installing those dependencies, create a `server` folder in the root of your project and create a `index.js` file inside of it. This is where you will build the Node / Express API.

## Configuration

Once you have setup your folder structure, it's now time to configure our project a little bit. Hop into the `package.json` file to add some settings.

### Proxy

The proxy is what we will need to add to get our CRA server talking to our Express server.

Add:
```json
"proxy": "http://localhost:*server port*
```

### Main

The main is what we will add to get our `nodemon` configured.

Add:
```json
"main": "server/index.js"
```

The setup is now complete for the NoDB project, so go ahead and get started on yours!

You can find an example of the NODB Project inside the files of this repo.