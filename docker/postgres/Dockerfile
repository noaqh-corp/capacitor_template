FROM postgres:16.2

RUN apt-get update && \
    apt-get install -y git make gcc postgresql-server-dev-16

# postgres_test
RUN cd /tmp && \
    git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git && \
    cd pgvector && \
    make && \
    make install && \
    cd ../ && rm -rf pgvector

RUN echo "CREATE DATABASE postgres_test;" > /docker-entrypoint-initdb.d/init.sql

