
#!/usr/bin/env bash
set -e 

echo 'Creating application user and db'

mongo ${DB_NAME} \
        --host localhost \
        --port ${DB_PORT} \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${DB_USER}', pwd: '${DB_PASSWD}', roles:[{role:'dbOwner', db: '${DB_NAME}'}]});"

echo 'Set Data'
mongo ${DB_NAME} \
        --host localhost \
        --port ${DB_PORT} \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.getCollection('courses').insertMany([{
    title: 'Node JS',
    teacher: 'Alejandro Medina',
    descrition: 'Basicos de Node',
    topic: 'JS',
    },
    {
        title: 'React JS',
        teacher: 'Alejandro Medina',
        descrition: 'Basicos de React',
        topic: 'JS',
    }]);"