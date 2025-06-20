
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_id>:<db_password>@<클러스터 정보>/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // admin DB 인스턴스
        const adminDB = client.db('test').admin();
        // 데이터베이스 정보 가져오기
        const listDatabase = await adminDB.listDatabases();

        console.log(listDatabase);

        return "OK";

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run()
    .then(console.log)
    .catch(console.error);
