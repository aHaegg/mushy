const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const connectionString = process.env.CosmosDBConnection;
const client = new CosmosClient(connectionString);
const database = client.database('mushy-database');
const container = database.container('mushy-container');

// Function to read an item with id '1'
app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Connection String:', connectionString);
        context.log('Database:', database.id);
        context.log('Container:', container.id);

        try {
            // Query all items from the container to find the item ID
            const querySpec = { query: 'SELECT * FROM c' };
            const { resources: items } = await container.items.query(querySpec).fetchAll();

            if (!items || items.length === 0) {
                context.log('No documents found');
                return { status: 404, body: 'No documents found' };
            }

            // Log each item's ID
            items.forEach((item) => {
                context.log('Item ID:', item.id);
            });

            return { body: JSON.stringify(items), headers: { 'Content-Type': 'application/json' } };
        } catch (error) {
            context.log(`Error: ${error}`);
            return { status: 500, body: 'Internal Server Error' };
        }
    }
});

// Helper function to convert ReadableStream to JSON
async function streamToJSON(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    return JSON.parse(buffer.toString());
}

// Function to add a new item with an ID and name to the database
app.http('addItem', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const body = await streamToJSON(request.body);
            const { id, name } = body;

            context.log('Connection String:', connectionString);
            context.log('Database:', database.id);
            context.log('Container:', container.id);

            // Add new item to the container
            const newItem = { id, name };
            await container.items.create(newItem);

            context.log('New item added:', newItem);

            return { body: JSON.stringify(newItem), headers: { 'Content-Type': 'application/json' } };
        } catch (error) {
            context.log(`Error: ${error}`);
            return { status: 500, body: 'Internal Server Error' };
        }
    }
});

// Function to read an item with id '2'
app.http('readItem', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Connection String:', connectionString);
        context.log('Database:', database.id);
        context.log('Container:', container.id);

        try {
            // Read item with id '2'
            const { resource: item } = await container.item("1", "1").read();

            if (!item) {
                context.log('Document not found');
                return { status: 404, body: 'Document not found' };
            }

            context.log('Item:', item);

            return { body: JSON.stringify(item), headers: { 'Content-Type': 'application/json' } };
        } catch (error) {
            context.log(`Error: ${error}`);
            return { status: 500, body: 'Internal Server Error' };
        }
    }
});