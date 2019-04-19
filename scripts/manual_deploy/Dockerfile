FROM jacobleecd/mashr:latest
WORKDIR /root

COPY mashr/ mashr/
RUN mashr/install_gems.sh

COPY crontab /etc/cron.d/mashr-cron
RUN chmod 0644 /etc/cron.d/mashr-cron
RUN crontab /etc/cron.d/mashr-cron
RUN touch /var/log/cron.log

CMD service cron start && tail -f /var/log/cron.log
