echo type the packages you want to install :

read packages

docker compose exec nodejs_server npm i $packages