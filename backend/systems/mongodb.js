const assert = require('assert');
const mongodb = require('mongodb');
const EventEmitter = require('events');

const config = require('../config.json').mongodb;

const events = new EventEmitter();
const tags = { client: 'MongoDB::client', db: 'MongoDB::db' };

events.on('created', () => console.log(`${tags.client} created`));
events.on('connected', () => console.log(`${tags.db} connected`));

let client;
let db;

// eslint-disable-next-line func-names
(async function () {
    // eslint-disable-next-line no-undef
    const { connection, options } = config;
    const { host, port, source, database, username, password } = connection;

    client = await mongodb.MongoClient.connect(`mongodb://${username}:${password}@${host}:${port}/?authSource=${source}`, options);

    events.emit('created');

    db = client.db(database);

    assert.strictEqual(typeof client, 'object');
    assert.strictEqual(typeof db, 'object');
    assert.strictEqual(client.isConnected(), true);

	events.emit('connected');

    db.on('close', error => console.log(`${tags.db} close`, error));
    db.on('error', error => console.log(`${tags.db} error`, error));
    db.on('fullsetup', () => console.log(`${tags.db} fullsetup`));
    db.on('parseError', error => console.log(`${tags.db} parseError`, error));
	db.on('reconnect', () => console.log(`${tags.db} reconnect`));
	db.on('timeout', error => console.log(`${tags.db} timeout`, error));
}()).catch(exception => {
    console.log(exception);
    process.exit(1);
});

module.exports = {
    events,

    /**
     * Преобразовывает строку в ObjectID.
     * @param {string} value
     * @return {ObjectId}
     */
	id: value => {
        assert.strictEqual(typeof value, 'string');
        assert.strictEqual(mongodb.ObjectId.isValid(value), true);

        const result = new mongodb.ObjectId(value);

        assert.strictEqual(typeof result, 'object');

        return result;
    },

    /**
     * Создает новую коллекцию.
     * @param {string} value
     * @return {Promise}
     */
    createCollection: value => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof value, 'string');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.createCollection(value);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Создает новый индекс.
     * @param {string} collection
     * @param {object} query
     * @param {object} options
     * @return {Promise}
     */
    createIndex: (collection, query, options = {}) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof query, 'object');
                assert.strictEqual(typeof options, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).createIndex(query, options);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет агрегацию.
     * @param {string} collection
     * @param {Array} pipeline
     * @param {object} options
     * @return {Promise}
     */
    aggregate: (collection, pipeline, options = {}) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(Array.isArray(pipeline), true);
                assert.strictEqual(typeof options, 'object');

                // console.log(pipeline);

                assert.strictEqual(client.isConnected(), true);

                // https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/
                // https://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/
                // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#aggregate
                // https://docs.mongodb.com/v4.0/reference/operator/aggregation-pipeline/
                // https://docs.mongodb.com/v4.0/reference/operator/aggregation/
                // https://docs.mongodb.com/v4.0/reference/command/aggregate/

                // https://docs.mongodb.com/manual/core/aggregation-pipeline-limits/#memory-restrictions

                // Этапы конвейера имеют ограничение в 100 мегабайт оперативной памяти. Если этап превышает этот предел, MongoDB выдаст ошибку. Чтобы разрешить обработку больших наборов данных, используйте параметр allowDiskUse, чтобы разрешить этапам конвейера агрегации записывать данные во временные файлы.

                const response = await db.collection(collection).aggregate(pipeline, options).toArray();

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет единичный поиск.
     * @param {string} collection
     * @param {object} query
     * @return {Promise}
     */
    findOne: (collection, query) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof query, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).findOne(query);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет множественный поиск.
     * @param {string} collection
     * @return {Promise}
     */
    getAll: (collection) => new Promise(async (resolve, reject) => {
            try {
                assert.strictEqual(typeof collection, 'string');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).find().toArray();

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
    }),

    /**
     * Выполняет единичную вставку.
     * @param {string} collection
     * @param {object} query
     * @return {Promise}
     */
    insertOne: (collection, query) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof query, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).insertOne(query);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет массовую вставку.
     * @param {string} collection
     * @param {Array} query
     * @return {Promise}
     */
    insertMany: (collection, query) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof query, 'object');

                assert.strictEqual(Array.isArray(query), true);

                assert.strictEqual(client.isConnected(), true);

                // https://docs.mongodb.com/v4.0/reference/method/db.collection.insertMany/
                const response = await db.collection(collection).insertMany(query);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет единичное обновление.
     * @param {string} collection
     * @param {object} filter
     * @param {object} update
     * @param {object} options
     * @return {Promise}
     */
    updateOne: (collection, filter, update, options = {}) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof filter, 'object');
                assert.strictEqual(typeof update, 'object');
                assert.strictEqual(typeof options, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).updateOne(filter, update, options);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

        /**
     * Выполняет множественное обновление.
     * @param {string} collection
     * @param {object} filter
     * @param {object} update
     * @param {object} options
     * @return {Promise}
     */
    updateMany: (collection, filter, update, options = {}) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof filter, 'object');
                assert.strictEqual(typeof update, 'object');
                assert.strictEqual(typeof options, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).updateMany(filter, update, options);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет единичное удаление.
     * @param {string} collection
     * @param {object} filter
     * @return {Promise}
     */
    deleteOne: (collection, filter) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof filter, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).deleteOne(filter);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет массовое удаление.
     * @param {string} collection
     * @param {object} filter
     * @return {Promise}
     */
    deleteMany: (collection, filter) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof filter, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).deleteMany(filter);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),

    /**
     * Выполняет подсчет документов.
     * @param {string} collection
     * @param {object} query
     * @return {Promise}
     */
    countDocuments: (collection, query) => new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                assert.strictEqual(typeof collection, 'string');
                assert.strictEqual(typeof query, 'object');

                assert.strictEqual(client.isConnected(), true);

                const response = await db.collection(collection).countDocuments(query);

                resolve(response);
            } catch (exception) {
                reject(exception);
            }
        }, 0);
    }),
};
