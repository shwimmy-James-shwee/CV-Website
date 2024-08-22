FROM nginx:latest


RUN mkdir -p /src/app/deployment && \
    echo "while true; do echo $(date); sleep 10; done" > /src/app/deployment/pipeline.sh &&\
    chmod +x /src/app/deployment/pipeline.sh