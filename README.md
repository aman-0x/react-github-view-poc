# React Github View POC

This React POC I develped for learning and to get hands on how to consume github api.
I used axios to fetch the data from the github api.

## How to use it ?
1. Clone the repo in you local system.
2. We need github api secret key which we can generate from our github account and paste it in the " .env " file which we need to add in the root directory.
    > REACT_APP_GIT_AUTHSECRET=<YOUR_SECRET_KEY>
3. Now use the below script in the project directory to install the node modules.
    > npm i
4. Once node modules gets installed use the below script in the project directory to run the app in your default browser.
    > npm start
    
## Features

1. User can see 5 records per page in the Home Screen.
2. User can sort the table data using the sort button available in the column.
3. User can use the search input to search the record based on the repo name, owner and language.
4. User can view the details of the user and repo on the Details Page by clicking the View Details button.

## Screenshots
### Home Page
<img src="https://github.com/aman-0x/react-app-github-view-poc/blob/main/screenshot/sc1.png">

### Searching
<img src="https://github.com/aman-0x/react-app-github-view-poc/blob/main/screenshot/sc2.png">

### Details Page
<img src="https://github.com/aman-0x/react-app-github-view-poc/blob/main/screenshot/sc3.png">
