//VARIABLES
// IN: dsPattern as String
// OUT: datastore as VcDatastore

// get all datastores
var allDatastores = VcPlugin.getAllDatastores();
var tmpVcDatastore = new VcDatastore() ;

// Check if the datastore match the regexp
for (var i in allDatastores) {
	//System.log("DEBUG: "+allDatastores[i].name+" / "+allDatastores[i].freeSpace);
	if (allDatastores[i].name.match(dsPattern)) {
		if(!tmpVcDatastore.name){ // first loop has no values to compare
			tmpVcDatastore=allDatastores[i];
		}else{ // if ds is less filled, keep it
			if (allDatastores[i].freeSpace > tmpVcDatastore.freeSpace) {
				tmpVcDatastore = allDatastores[i];
				//System.log("DEBUG: Rating: "+allDatastores[i].name);
			}	
		}
	}
}	

// return the results
dataStore = tmpVcDatastore;
System.log("INFO: "+dataStore.name+" : "+dataStore.freeSpace);
