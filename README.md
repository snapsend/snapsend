__Build status__: [![CircleCI](https://circleci.com/gh/kristojorg/snapsend/tree/master.svg?style=svg)](https://circleci.com/gh/kristojorg/snapsend/tree/master)


## Deploying the backend

There are two pieces to the backend. The first is the "cluster", which is essentially the database wrapped in a Prisma API. This we deploy to prisma cloud. It will have a url that it is available on, which the _server_ then interacts with. 

The server is where we write any of our application code, which will primarily consist of user authentication at this point. Everything else is on the frontend or handled by the database API. The server we deploy to [`now`](https://zeit.co/now). You can read all about it there. It's basically an easy cloud service. I chose `now` because I've used it a bunch, but if you guys are more comfortable with something else, let's use that! Maybe google cloud? Especially since we have the instructions already to set up CI/CD there. 

## Deploying the front end

The front end is just a set of static files that get sent to the browser, and which the browser then runs. So I currently have it set up in `netlify` to deploy whenever there is a PR. I just set that up initially to show you guys the site as I was developing it. It's a free and easy service, but again let's choose something you are comfortable with and that will be easy to set up the CI/CD for. Maybe we should use google again for this? 

_EDIT_: I realized after writing this that the frontend is basically done already. It deploys on every branch and PR(you can see in github on a PR there is the netlify bot giving us a URL to go look at the app on). So we're done with that part!


# What we need to do

There are these three moving parts, the `cluster`, the `server`, and the `frontend`. We need to have a version of each for dev, UA, and production. I'll list out the different environments below. All of the variables to coordinate these environments will need to be stored somewhere standard. I've created three files: `.env`, `.env.staging`, and `.env.prod` in the `/server` directory. You won't see them because I have instructed git to ignore them, since they will contain secrets. I will create a zip file of them and send it to you via whatsapp. You will each need to place the contents of that folder in the `/server` directory, or things won't work!

Our to-dos are:

1. Set up google cloud to host our server, and deploy the "staging" branch to a staging url. When the server runs in staging, it will need to communicate with the staging cluster. Thus we need to make sure to set an environment variable in the staging environment that points `PRISMA_CLUSTER` to the staging cluster (see the existing url in `.env.staging`). 

2. Set up google cloud to host our server and deploy the master branch to a production URL. Same thing applies as last point about setting correct `PRISMA_CLUSTER`. 

3. ~~Set up google cloud to host our frontend and deploy the "staging" branch to staging url, and master to production. Here, we need to change which server url we will be pointing at. I'll handle that part of it when we actually connect the frontend and the server (they don't talk to each other yet). For now, we just need to make it deploy on those branches.~~ nvm we're done with this. 

4. Finally, we need to decide how we will manage the cluster. Theoretically, our database schema won't be changing often, and we wouldn't necessarily want to deploy a fresh database every time we update staging. Certainly not for master, since deploying a new cluster wipes the database (there are *migration* capabilities for when we might need to change our DB schema without data loss). For now, I think we just leave this as is and manage it manually. Just need to make sure our server is talking to the right cluster in local, staging and production. 


### dev

*cluster*: In the dev environment, the cluster should be hosted locally, running inside docker on a container. This is already set up in the `.env` file, which is the dev env file. You can see `PRISMA_CLUSTER="local"`. 

*server*: you can run the server with the script `npm run dev`, which uses prisma to start a local server on your computer and starts your local docker cluster too. Make sure you have docker running when you do this or it will fail! It will give you a url like `localhost:8000` when it starts. 

*frontend*: you can start the frontend with `npm run start`, which starts up a local server that just sends the static files to the browser. It'll give you a url like `localhost:3000` when it starts. 

### staging

*cluster*: I have deployed a staging cluster for us. We shouldn't need to change it much. Just need to make sure the server is talking to the right cluster when running in staging. This is set using the `PRISMA_CLUSTER` variable in the `.env*` files. You can see the correct staging cluster name in `.env.staging`. I'm not sure how google cloud does environment variables, but we need to make sure that variable gets set correctly for staging. 

*server*: I actually just talked about what we need to do right above ^. Just set the right `PRISMA_CLUSTER` variable and deploy the server. The script that google cloud uses to run the server is `npm run start`. Remember, this command needs to be run *inside the `/server` directory*. If you try to run it in the root of the repo, you'll get an error. So somehow you need to make google cloud run it inside that folder. You also may need to `npm install` before running `npm run start`, which just downloads all the dependencies for the project.

*frontend*: The frontend just needs to deploy. The frontend code needs to be "built" before it can be served. Technically, this is not the same as compiling since it is not turning it into bytecode. It's essentially just gathering all the dependencies and then converting the new-age javascript into javascript that older browsers can still run. Doesn't really matter. The script to build the site is `npm run build`. This will build all the files into the the folder `/front/build`. All that google cloud has to do is host that folder. Again, you'll need to `npm install` before `npm run build`. The script I set in netlify is `cd front && npm install && npm run build`.

### production

Same as above, we just need to feed google cloud the environment variables that are found in `.env.prod` instead of `.env.staging`. 


# On second thought!

We can ignore frontend for now. It's basically set up fine. It deploys on every branch and gives us a new url to go preview it at. So we actually don't need to do anything there. Cluster is also done. So we just need to set up the server. 
