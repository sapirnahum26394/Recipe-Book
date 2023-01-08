#!/bin/bash
app="recipebook"
docker build --build-arg name=${app} -t ${app}:latest -f MyRecipeBook/Dockerfile MyRecipeBook
# docker run -d -p 56733:5000 --name=${app} -v MyRecipeBook:/app ${app} 
