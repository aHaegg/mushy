import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient, Item } from '@azure/cosmos';

export async function hello(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const connectionString = process.env.CosmosDBConnection;
        if (!connectionString) {
            throw new Error("CosmosDBConnection environment variable is not defined");
        }
        const client = new CosmosClient(connectionString);
        const database = client.database('mushy-database');
        const container = database.container('mushy-container');

        const { resource: item } = await container.item("1", "1").read();

        if (!item) {
            context.log('Document not found');
            return { status: 404, body: 'Document not found' };
        }

        context.log('Item:', item);

        return { body: JSON.stringify({ text: "Hello, from the API!", dbtext: item.name }) };
    } catch (error) {
        context.log(`Error: ${error}`);
        return { status: 500, body: 'Internal Server Error' };
    }

};

app.http('hello', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: hello
});
