# hoteru-apis-nodejs

Run the apt update command on your Ubuntu / Debian Linux to update package repository contents database.
	```sudo apt update```

After system update, install Node.js 14 on Ubuntu / Debian by first installing the required repository.
```curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -```


You can begin the installation of Node.js 14 on Ubuntu & Debian Linux:
```sudo apt -y install nodejs```

Verify the version of Node.js installed.
```node  -v```
```npm install -g npm@6```

# MONGODB
Follow these steps to install MongoDB Community Edition using the apt package manager.

Import the public key used by the package management system
```wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -```



Create the /etc/apt/sources.list.d/mongodb-org-4.4.list file for Ubuntu 20.04 (Focal):
```echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list```


Issue the following command to reload the local package database:
```sudo apt-get update```


To install the latest stable version, issue the following
```sudo apt-get install -y mongodb-org```


Start MongoDB
```sudo systemctl start mongod```


Verify that MongoDB has started successfully
```sudo systemctl status mongod```


# NODEJS PROVIDERS SIMULATOR

```git clone https://github.com/Hoteru-Project/hoteru-apis-nodejs.git```

```cd hoteru-forntend-reactjs```

```npm install```


#### Add .env variables:
#### Application port
#### APP_PORT=8080
#### Application Hostname
#### APP_HOSTNAME=localhost
#### Application Secret key wil be used in encrypting some variables in the future like JWT
#### APP_KEY=


#### URL of the Mongo DB
#### MONGODB_URL=

##### Finally run:
```npm start```


