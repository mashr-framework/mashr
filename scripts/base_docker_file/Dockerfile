FROM openjdk:8-jre-stretch

RUN apt-get -y update && apt-get -y upgrade

RUN apt-get install -y vim git zip unzip less wget

ENV EMBULK_VERSION 0.9.17

RUN curl -o /usr/local/bin/embulk \
    --create-dirs -L "http://dl.embulk.org/embulk-${EMBULK_VERSION}.jar" && \
    chmod +x /usr/local/bin/embulk

WORKDIR /root
RUN mkdir mashr

RUN apt-get install cron -y

