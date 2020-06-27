-- Provided as reference against Pythonic ORM  => Flask w/ SQL Alchemy

-- PSQL 9.6.17 used for setup.
\echo 'Iniitializing DB, keep in mind this schema was written with psql -V 9.6.17 :: Other versions may require query modification'

-- First create user and password
CREATE USER hw_db_user SUPERUSER;
ALTER USER hw_db_user WITH PASSWORD 'hw_db_pass';

-- Now create database
CREATE DATABASE "hw_db" WITH OWNER hw_db_user;
GRANT ALL PRIVILEGES ON DATABASE "hw_db" TO hw_db_user;

-- Add UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Warning to switch to new user
\echo 'DB Initialized, Run server.py to create tables via SQL Alchemy.'
