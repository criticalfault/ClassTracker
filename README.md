# ClassTracker
------------------------


# CodeShip + Heroku

## Installation

Installation comes in three parts...

1. Codeship
1. Staging on Heroku
1. Production on Heroku

### Setting up CodeShip

#### Getting an Account

First you need to get an account on _www.Codeship.com_. Once you have registered, you can click on the menu above and click, 'Create a new project'

#### Linking a Repository
You will be given three options to link your code repository. _Github_, _BitBucket_, _Gitlab_. 

![Imgur](http://i.imgur.com/rr3R2qq.png)

Once you click on your repository service of your choice. You will have to enter the link to the repository you want to codeship.

![Imgur](http://i.imgur.com/rmOjKCq.png)

You then will be asked to choose between _Codeship basic_ and _pro_. We will only be covering the basic tools. Though you can free feel to use the Pro should you find you enjoy this tool specifically.

![Imgur](http://i.imgur.com/CZzJpAn.png)

After, you will need to make a test setup for the repository you are using. This will require you to declare what kind of tests you will be using and what you will be using to perform them with. They have prestablished test builds for many of the more popular code bases. Select your unit testing software and make sure they are placed in the proper folders in your repository. 

![Imgur](http://i.imgur.com/AvqZe0Q.png)

Finalize with writing the commands required to run your tests!

After you have completed this final test commands. It will require you to make a push to the repository you have configured. This will then accept in your push, download that repository on to _CodeShip_ and run your unit test. After completion, if its gets a green light (Your tests succeed) then it will fire off the deployment plan you will be prompted to establish.

#### Project Settings

After your successful push (Continue to retry after making modifications to your code so your tests succeed). You can setup a deployment pipeline to have _CodeShip_ push your code to a remote server. This requires you to add _CodeShips_ SSH Key to the ```~/.ssh/authorized_keys``` file. This key can be found under the general tab of project settings.

>Be extremely careful when editing this file. It is very possible to accidentally change this file while trying to add the key to the bottom of it. Doing so will make it impossible for you to use the edited key as they need to match exactly.

Finally you will need to add a script or select what service you want codeship to deploy too. We will be going with Heroku in this instance. Log into Heroku and create a new application. You will need to also go into your account in order to grab your API key. 

![Imgur](http://i.imgur.com/8ponjsP.png)

Record your HTTP address of your application and API Key

1. Application: https://APPLICATIONNAME.herokuapp.com/

1. API Key: < A MASSIVE STRING OF RANDOM CHARACTERS >

Click on Heroku for deployment and fill in your information

![Imgur](http://i.imgur.com/gx5qcT4.png)

## Setting up the Staging Server on Heroku

Once your setup with your API key and you know what your application is called and where it will be stored, you need only to setup the pipeline. 

### Establishing Heroku Pipelines


1) Head over to Heroku and log in on their front page. This will take you to their dashboard. You will see your application you created already on the server. This application will be blank so far because we haven't actually pushed anything to Heroku yet.

You will see a "new" dropdown on the right-hand side. Click that and click create new pipeline.
![Imgur](http://i.imgur.com/KYff7RF.png)

2) Type in the name of your pipe-line. They must contain only lower case letters. Once you have completed that, go ahead and connect this pipe-line to the repository. We created earlier. 

![Imgur](http://i.imgur.com/SKINUWQ.png)

3) Go back to your "personal Apps" now and click on the newly created application. Find the "deploy" tab and bring it up. Search then on that page for the ability to  "Add this app to a pipeline". Select the proper pipeline you created above in order to assign that application to the pipeline.

![Imgur](http://i.imgur.com/RTtgrWM.png)

4) This will then take you to the pipe-line page. From here you can move the server you've created around. Because we don't have multiple server created yet. It will set itself up as a production server. We can go back into the local branch of our terminal and execute ```heroku create``` again should we desire to add another server using that same configuration to our heroku applications. From there we can continue to add servers or arrange them in the pipeline. Its recommended to have atleast a staging server and a production server, though you can also add a development server as well!


## Setting up the Production Server on Heroku

For the Production line, simply follow the previous instructions on how to add an application and add the second to the pipeline. It will place it on the pipeline. You can then move them around to decide which one is Staging and which one will be Production. Should you add three, one will become the Development server. You can also add then multiple staging, development, production servers.


## Execution

Every push that hits the master branch, will go to CodeShip. Once CodeShip passes through it's tests, it will then be pushed to the staging server on Heroku. When pushing to Production, you will need to simple log into Heroku to push from the staging server to production!
