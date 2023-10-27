echo type the packages you want to install :

read packages

docker compose exec nodejs_server npm i $packages

docker compose stop nodejs_server

docker compose build nodejs_server

docker compose start nodejs_server