Dilbert 4.0

Laravel 5.5 + Ionic 3


Ionic 3 Installation
	
	Step 1: Install Node.js(Node.js version 6.x or greater)
		$ sudo apt-get install nodejs

	Step 2: Install Cordova
		$ sudo npm install -g cordova

	Step 3: Install Ionic Framework
		$ sudo npm install -g ionic


To run the project on localhost
	$ ionic serve
	

# Dilbert server side

## Pre-requisites
This is a Laravel 5.5 project. Php version 7.0 is required.

## Initial Setup
1. Clone the repo into a directory.
2. Run the following command from the repo's directory. This will install the required dependencies. <br />
> composer install
3. Edit the .env.example file. Change the `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` to the values specific to your database. Optionally you change any other environment variables though not required.
4. Save this file as .env
5. Run the following command to generate a key for the application:
> php artisan key:generate
6. Once you start the deployment server you're good to go.
> php artisan serve
<br />

Incase of some error try running
> php artisan config:cache

to clear cache and reload the configurations.
