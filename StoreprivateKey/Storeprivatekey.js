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

//console.log(user);


function add_user_with_key(){
    const tx = gtx.newTransaction([user.pubKey]);
    tx.addOperation('add_user_with_key',user.pubKey);
   // console.log("@@@@@@@@@@@@@@@@@@@@@@@@"+[user.pubKey]);
    tx.sign(user.privKey,user.pubKey);
    console.log("#######ADDED_USER_WITH_KEY##########")
    return tx.postAndWaitConfirmation();
}

function is_user_key(user_key) {
    console.log("#########Query Output######")
    //var arrByte= new Uint8Array(user_key)
      //var binaryData= new Blob([arrByte])
    return gtx.query("is_user_key", {user_key: [user_key]});
    
}
//Return all user array//
function all_user(){
    console.log("#########Query Output######")
    return gtx.query("all_user_query",{});

}

async function runTest() {
    await add_user_with_key();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@"+user.pubKey);
    const output = await is_user_key(user.pubKey);
    console.log("output=", output.pubkey);
}

async function runTestQuery(){
    await add_user_with_key();
    
   const output = await all_user(user.pubKey);
    //console.log("#######################"+output)
}

//runTest().catch( err => console.log(err.stack));
runTestQuery().catch(err => console.log(err.stack));