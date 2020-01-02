echo -e $"Docker Swarm Initialization"
docker swarm init
echo -e $"Creating Docker Image"
docker build -t graph-microservice -f graph-microservice/Dockerfile graph-microservice
docker build -t car-microservice -f car-microservice/Dockerfile car-microservice
docker build -t draw-microservice -f draw-microservice/Dockerfile draw-microservice
echo -e $"Starting the stack"
docker stack deploy -c ./docker-compose.yml talk
echo -e $"Finish"