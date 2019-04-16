const pcl = require('postchain-client');

const node_api_url = "http://localhost:7740"; // using default postchain node REST API port

// default blockchain identifier used for testing
const blockchainRID = "78967baa4768cbcef11c508326ffb13a956689fcb6dc3ba17f4b895cbb1577a3";

const rest = pcl.restClient.createRestClient(node_api_url, blockchainRID, 5);
const gtx = pcl.gtxClient.createClient(
    rest,
    Buffer.from(blockchainRID, 'hex'),
    []
);

console.log(gtx);
// create a random key pair
const user = pcl.util.makeKeyPair();

function add_cities() {
    const tx = gtx.newTransaction([user.pubKey]);
    tx.addOperation('insert_city', "Kiev");
    tx.addOperation('insert_city', "Stockholm");
    tx.addOperation('insert_city', "Udaipur");
    tx.sign(user.privKey, user.pubKey);
    return tx.postAndWaitConfirmation();
}


function is_city_registered(city_name) {
    return gtx.query("is_city_registered", {city_name: city_name});
    
}

async function runTest() {
    await add_cities();
    const kiev_registered = await is_city_registered("Udaipur");
    console.log("kiev_registered=", kiev_registered);
}

//runTest().catch( err => console.log(err.stack));

function add_user(){
    const tx = gtx.newTransaction([user.pubKey]);
    tx.addOperation('add_user');
    tx.sign(user.privKey,user.pubKey);
    return tx.postAndWaitConfirmation();
}

function is_user_registered(usr_name){
    return gtx.query("is_user_registered",{usr_name : usr_name});
}


async function makeTest() {
   // await add_user();
    const output= await is_user_registered("Prateek");
    console.log(output);
}


makeTest().catch(err => console.log(err.stack));