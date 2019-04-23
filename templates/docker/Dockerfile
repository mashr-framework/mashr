FROM jacobleecd/mashr:latest
WORKDIR /root

COPY mashr/ mashr/

RUN chmod +x mashr/install_gems.sh
RUN mashr/install_gems.sh
RUN embulk gem install embulk-output-gcs

# Copy and make executable embulkScript.sh
COPY embulkScript.sh /etc/cron.d/embulkScript.sh
RUN chmod +x /etc/cron.d/embulkScript.sh

# Copy and make executable crontab, mashr-cron
COPY crontab /etc/cron.d/mashr-cron
RUN chmod 0644 /etc/cron.d/mashr-cron

# activate crontab, mashr-cron
RUN crontab /etc/cron.d/mashr-cron

RUN touch /var/log/cron.log

CMD service cron start && tail -f /var/log/cron.log
