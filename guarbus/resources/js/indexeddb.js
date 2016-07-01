 var db = new Dexie('indexeddb');
 db.version(1).stores({
     tasks: '++id,linha,data'
 });
 db.open().catch(function(err) {
     console.log("ERROR OPEN", err);
 });


 function findIndex() {
     var tmp = [];
     return db.tasks.toArray();
 }