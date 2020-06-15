import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

// Note: Your app client can be found in your MongoDB Realm dashboard
let client = Stitch.initializeDefaultAppClient("gif-battle-xlnwk");
let mongodb = client.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
let db = mongodb.db("gif-battle");

const getAllGifs = () => {
  return client.callFunction("getAllGifs");
};

const getSingleGif = (id) => {
  return client.callFunction("getSingleGif", [id]);
};

const voteCaption = (id, caption, direction) => {
  return db.collection("gifs").updateOne(
    {
      _id: { $oid: id },
      "captions.text": caption.text,
    },
    { $inc: { "captions.$.votes": direction } }
  );
};

const putCaption = (id, caption) => {
  return db
    .collection("gifs")
    .updateOne(
      { _id: { $oid: id } },
      { $push: { captions: { votes: 1, text: caption } } }
    );
};
const searchGifs = (query) => {
  return client.callFunction("searchGifs", [query]);
};
export { client, getAllGifs, getSingleGif, voteCaption, putCaption, searchGifs };