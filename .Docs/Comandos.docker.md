# Docker Commands, Help & Tips

### Show commands & management commands

Acesso ao servidor Docker

* addr: **192.168.0.72**
* user: **root**
* pass: **0pp0rtunity**

### Docker version info

```
$ docker version
```

### Show info like number of containers, etc

```
$ docker info
```

# WORKING WITH CONTAINERS

### Create an run a container in foreground

```
$ docker container run -it -p 80:80 nginx
```

### Create an run a container in background

```
$ docker container run -d -p 80:80 nginx
```

### Shorthand

```
$ docker container run -d -p 80:80 nginx
```

### Naming Containers

```
$ docker container run -d -p 80:80 --name nginx-server nginx
```

### List running containers

```
$ docker container ls
```

OR

```
$ docker ps
```

### List all containers (Even if not running)

```
$ docker container ls -a
```

### Stop container

```
$ docker container stop [ID]
```

### Stop all running containers

```
$ docker stop $(docker ps -aq)
```

### Remove container (Can not remove running containers, must stop first)

```
$ docker container rm [ID]
```

### To remove a running container use force(-f)

```
$ docker container rm -f [ID]
```

### Remove multiple containers

```
$ docker container rm [ID] [ID] [ID]
```

### Remove all containers

```
$ docker rm $(docker ps -aq)
```

### Get logs (Use name or ID)

```
$ docker container logs [NAME]
```

### List processes running in container

```
$ docker container top [NAME]
```

# Run images and containers

### criar sua img
docker build -t -p 3000:9000 <nome_da_img> .

### rodar sua img em um container
docker run -it -p 3000:9000 - $(pwd):/app node-express-docker

docker run -d -p 3000:9000 --restart=always <nome_da_img> (' -d é para deixar rodando em segundo plano')

### para parar o container
docker stop <container ID> 

### listar containers em execução
docker ps (pode usar o -a)

### listar todos containers 
docker containers ls

### listar images
docker images 

### especificando uma versão
docker pull ubuntu:14.04

### baixar uma img 
docker pull <nome da img>

### acesar o terminal do container do ubuntu
docker run -it ubuntu bash

### sair do container 
exit ou CTRL + D

# para limpar todos seus containers 
docker system prune -a ('não faça isso sem autorização kkk')

### para commitar uma img modificada e compartilha-la
docker ps -l
docker commit  <Container ID> <nome original da img>:<novo nome> 

### rodar a img modificada 
docker run -ti ubuntu:ubuntoModificado bash
