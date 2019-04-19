# instructions:
# need to use `docker exec -it 9e3 /bin/bash` to keep container running
# Start: docker  run -d  mat-mashr
# to login: docker exec -it 9e3 /bin/bash
# to view: cat /var/logs/cron.log

FROM openjdk:8-jre-stretch
WORKDIR /root

RUN apt-get -y update && apt-get -y upgrade

RUN apt-get install -y vim git zip unzip less wget

ENV EMBULK_VERSION 0.9.17
RUN curl -o /usr/local/bin/embulk \
    --create-dirs -L "http://dl.embulk.org/embulk-${EMBULK_VERSION}.jar" && \
    chmod +x /usr/local/bin/embulk

RUN mkdir mashr
COPY mashr/ mashr/
RUN mashr/install_gems.sh

RUN apt-get install cron -y
COPY crontab /etc/cron.d/hello-cron
RUN chmod 0644 /etc/cron.d/hello-cron
RUN crontab /etc/cron.d/hello-cron
RUN touch /var/log/cron.log

CMD service cron start && tail -f /var/log/cron.log
# ENTRYPOINT ["/bin/bash"]
# CMD service cron start
# CMD tail -f /var/log/cron.log
