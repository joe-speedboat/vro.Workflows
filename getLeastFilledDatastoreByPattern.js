// DESC: Find all datastores matching a regex pattern and return the least filled one
//INPUT VARIABLES
// 		cluster --> VC:ClusterComputeResource
// 		site --> Datastore naming confvention (partial DS name)
// 		spaceNeeded --> space needed on DS in GB

// RETURN: VC:Datastore 


// get all datastores from cluster
var allDatastores = cluster.datastore;
//var tmpVcDatastore = new VcDatastore() ;

// Check if the datastore match the regexp for (var i in allDatastores) {
	if(allDatastores[i].summary.accessible){ // if datastore is not available, skip it
		// System.log("DEBUG: "+allDatastores[i].name+" / "+allDatastores[i].freeSpace);
		if (allDatastores[i].name.match(site)) {
			if(!tmpVcDatastore){ // first loop has no values to compare
				var tmpVcDatastore=allDatastores[i];
			}else{ // if ds is less filled, keep it
				//System.log("DEBUG: Checking: "+allDatastores[i].name+" / Free: "+allDatastores[i].info.freeSpace/1024/1024/1024+" GB");
				if (allDatastores[i].info.freeSpace > tmpVcDatastore.info.freeSpace) {
					tmpVcDatastore = allDatastores[i];
					//System.log("DEBUG: Rating: "+allDatastores[i].name+" / Free: "+allDatastores[i].info.freeSpace/1024/1024/1024+" GB");
				}	
			}
		}
	}
}	

// return the results
dataStore = tmpVcDatastore;
System.log("INFO: Least filled DS is: "+dataStore.name+" : "+dataStore.info.freeSpace/1024/1024/1024+" GB"); dataStoreSize=dataStore.info.freeSpace/1024/1024/1024;
if (dataStoreSize > spaceNeeded){
	System.log("INFO: Validated Least filled DS has sufficient free space: "+dataStore.name+" : "+dataStore.info.freeSpace/1024/1024/1024+" GB");
	return dataStore;
}else{
	System.log("ERROR: No Datastore found with needed free space: "+spaceNeeded+" GB");
	throw("No Datastore found with needed free space: "+spaceNeeded+" GB");
}		
