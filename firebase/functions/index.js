const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

firebase = require('firebase-admin');

// to setup firestore
var config = {
    apiKey: "AIzaSyDs1qpxF4o7RCVR724Z7TBnDUCmBW01CeQ",
    authDomain: "dilbert-34d6c.firebaseapp.com",
    databaseURL: "https://dilbert-34d6c.firebaseio.com",
    projectId: "dilbert-34d6c",
    storageBucket: "dilbert-34d6c.appspot.com",
    messagingSenderId: "58006331254"
  };
  firebase.initializeApp(config);

var db = firebase.firestore();

// leave counter is set based on type of leave
// parameters : leave_type (type of leave)
// possible values : leave_taken, joined, salary_credited, extra_work_day, appraisal, salary_deduction, 1st_saturday
// returns leave_counter
function getLeaveCounter(leave_type) {
	var counter;
	if (leave_type === "leave_taken") {
		counter = -1;
	}
	else if (leave_type === "joined"){
		counter = 0;
	}
	else if (leave_type === "salary_credited")	{
	counter = 2.5;
	}
	else if (leave_type === "extra_work_day")	{
	counter = 1;
	}
	else if (leave_type === "appraisal")	{
	counter = 0;
	}
	else if (leave_type === "salary_deduction")	{
	counter = 1;
	}
	else if (leave_type === "1st_saturday")	{
	counter = 1;
	}
	else	{
	counter = -1;
	}
	return counter;
}

// function to generate parent_id 
// parent_id = user_id + date_of_application(which is timestamp)
// returns parent_id
function generateId(str1,str2) {
	var parent_id = String(str1)+String(str2);
	return parent_id;
}

// called while adding a leave. To make sure all the mandatory fields are filled
// parameter : request (send by user)
// returns a array with names of fields which are empty
function validateRequest(request) {
	var emptyFields=[];

	if(!request.body.user.user_id)
	{
		emptyFields.push('user\'s id');
	}
	if(!request.body.user.name)
	{
		emptyFields.push('user\'s name');
	}
	else if (!request.body.user.name.trim()) 
	{
		emptyFields.push('user\'s name');
	}

	if(!request.body.user.email)
	{
		emptyFields.push('user\'s email');
	}
	else if (!request.body.user.email.trim()) 
	{
		emptyFields.push('user\'s email');
	}
	if(!request.body.leave_date)
	{
		emptyFields.push('leave date');
	}
	else if(request.body.leave_date.length===0)
	{
		emptyFields.push('leave date');
	}
	if(!request.body.leave_note)
	{
		emptyFields.push('leave note');
	}
	else if (!request.body.leave_note.trim()) 
	{
		emptyFields.push('leave note');
	}
	if(!request.body.tagged_users) 
	{
		emptyFields.push('tagged user');
	}
	else if(request.body.tagged_users.length===0)
	{
		emptyFields.push('tagged user');
	}
	return emptyFields;	
}

// called while adding leave. So if some fields are not send send their default values 
// if created by is not send user becomes the created by
// if modified by is not send created by becomes modified by
// default leave status is informed
// defult leave type is leave_taken
function getRequestData(request) {
	requestData = request.body;
	if (!requestData.created_by) {
		requestData.created_by = requestData.user;
	}
	else
	{
		if (!requestData.created_by.user_id) {
			requestData.created_by.user_id = requestData.user.user_id;
		}
		if (!requestData.created_by.name) {
			requestData.created_by.name = requestData.user.name;
		}
		if (!requestData.created_by.email) {
			requestData.created_by.email = requestData.user.email;
		}
	}

	if (!requestData.modified_by) {
		requestData.modified_by = requestData.created_by;
	}
	else
	{
		if (!requestData.modified_by.user_id) {
			requestData.modified_by.user_id = requestData.created_by.user_id;
		}
		if (!requestData.modified_by.name) {
			requestData.modified_by.name = requestData.created_by.name;
		}
		if (!requestData.modified_by.email) {
			requestData.modified_by.email = requestData.created_by.email;
		}
	}


	if (!requestData.leave_status) {
		requestData.leave_status = "informed";
	}

	if (!requestData.leave_type) {
		requestData.leave_type = "leave_taken";
	}
	return request;
}

// called to display leaves of single user
// parameters : filters , user 
// filters : based on which field to display data
// user : user id of the user whose to be displayed is passed
// returns single users leave
function getUserLeaves(filters,user)
{
	// defining variables
		var user_temp = user;

		user = user_temp.toString();

		var userCollection = user+"_leave";

		var promise1,promise2;
		var resp = [];
		var docStatus = [];
		var docCount = 0;
		var index = 0;
		var results = [];
		var returnData  = {};
		var tempData = {};
		var resp1 = [];
		var errorResponse = {};

		var end_string = filters["end_string"];
		var start_string = filters["start_string"];

	var start_date,end_date;

	var userLeavesQuery = db.collection("leave_management").doc(user).collection(userCollection);

	var dataMainQuery =  db.collection("leave_management").doc(user).collection(userCollection);

	// filters for getting leaves
		if(start_string !== "" && end_string !== "")
		{
			start_date = new Date(start_string);
			end_date = new Date(end_string);
			
			userLeavesQuery = userLeavesQuery.where("start_date",">=",start_date);
			userLeavesQuery = userLeavesQuery.where("end_date","<",end_date);
		}
		else if(start_string !== "")
		{
			start_date = new Date(start_string);
			
			userLeavesQuery = userLeavesQuery.where("end_date",">=",start_date).orderBy("end_date");
		}
		else if(end_string !== "")
		{
			end_date = new Date(end_string);
			
			userLeavesQuery = userLeavesQuery.where("start_date","<=",end_date).orderBy("start_date");
		}
		else
		{
			userLeavesQuery = userLeavesQuery.orderBy("start_date");
		}

	//promise to return values
	return userLeavesQuery.get().then((querySnapshot) => {
		/*if(querySnapshot.empty)
		{
			// var notPresent = [{}];
			return notPresent;
		}
		else
		{*/
			docStatus.push("pending");
			return Promise.all(
				querySnapshot.docs.map(doc => {
	
					var userLeaves = {};
			    	var cloudData = [];
	
			        userLeaves = doc.data();
	
			        //code to access comments of user
					const dataComment = dataMainQuery.doc(doc.id).collection("comments").orderBy("timestamp","desc");
			       	
			       	var promise1 = new Promise(function(resolve,reject){
			       		tempPromiseComment = dataComment.get();
			       		tempPromiseComment.then((querySnapshotComment) => {
			       			if(querySnapshotComment.empty)
				       			{
				       				userLeaves['comments'] = [];
				       			}
			    			querySnapshotComment.forEach((docComment) => {
			    				cloudData.push(docComment.data());
			        			userLeaves['comments'] = cloudData;
			    		});
		    			return resolve(userLeaves);    			
					})
					.catch(function(error) {
							reject(error);
						    console.error("Error displaying comments document: ", error);
						   
						})
					});
	
					// code to access tagged users
			       	const dataTagged = dataMainQuery.doc(doc.id).collection("tagged_users");
			        
			        var promise2 = new Promise(function(resolve,reject){
			        	tempPromise = dataTagged.get();
			        	tempPromise.then((querySnapshotTagged) => {
			    			querySnapshotTagged.forEach((docTagged) => {
			    				userLeaves['tagged_users'] = docTagged.data().tagged_users;
			    		});
			    		return resolve(userLeaves);
					})
					.catch(function(error) {
							reject(error);
						    console.error("Error displaying tagged users document: ", error);
						    
						})
					});
	
					// code to access leave date
					const dataLeave = dataMainQuery.doc(doc.id).collection("leave_date");
			        
			        var promise3 = new Promise(function(resolve,reject){
			        	dataLeave.get().then((querySnapshotLeave) => {
			    			querySnapshotLeave.forEach((docLeave) => {
			    				userLeaves['leave_date'] = docLeave.data().dates;
			    				});
			    			return resolve(userLeaves);
						})
						.catch(function(error) {
							reject(error);
						    console.error("Error displaying tagged users document: ", error);
						  
						})
			    	});
	
			    	//code to access users
					const dataUser = dataMainQuery.doc(doc.id).collection("user");
			       	
			       	var promise4 = new Promise(function(resolve,reject){
			        	tempPromiseUser = dataUser.get();
			        	tempPromiseUser.then((querySnapshotUser) => {
			    			querySnapshotUser.forEach((docUser) => {
			    				userLeaves['user'] = docUser.data().user;
			    		});
			    		return resolve(userLeaves);
			    			
					})
					.catch(function(error) {
							reject(error);
						    console.error("Error displaying tagged users document: ", error);
						   
						})
					});
	
					return Promise.all([promise1,promise2,promise3,promise4]).then(function(values) {
			        	return userLeaves;
			        })
			    	.catch(function(error) {
					    console.error("Error returning promise: ", error);
					   
					});
					// return userLeaves;
				})
			)
			.then(results => { 
				return results 
			})
			.catch(function(error) {
		   		reject(new Error('Error viewing document'));
			});
		// }

		// resolve("promise is pending")
	})
	.catch(function(error) {
	   return new Error('Error viewing document'+error);
	});
}

// when a leave needs to be invalidated this function is called
// Parameters : request sent by user
// to validate whether the fields which are mandatory are present
function cancelLeaveValidate(request) {
	var emptyFields=[];
	if(!request.body.user)
	{
		emptyFields.push('user');
	}
	else
	{
		if(!request.body.user.user_id)
		{
			emptyFields.push('user\'s id');
		}
	}
	if(!request.body.parent_id)
		{
			emptyFields.push('parent_id');
		}
	
	return emptyFields
}

// when a leave is requested to be updated this method is called
// parameters : request sent by the user
// to validate whether the fields which are mandatory are present
function validateUpdateRequest(request) {
	var emptyFields=[];

	if(!request.body.leave_data)
	{
		emptyFields.push('leave data');
	}
	if(!request.body.parent_id)
	{
		emptyFields.push('parent id');
	}
	if(!request.body.user_id)
	{
		emptyFields.push('user id');
	}
	if(!request.body.leave_data.user)
	{
		emptyFields.push('user');
	}
	if(!request.body.leave_data.user.user_id)
	{
		emptyFields.push('user\'s id');
	}
	if(!request.body.leave_data.user.name)
	{
		emptyFields.push('user\'s name');
	}
	else if (!request.body.leave_data.user.name.trim()) 
	{
		emptyFields.push('user\'s name');
	}

	if(!request.body.leave_data.user.email)
	{
		emptyFields.push('user\'s email');
	}
	else if (!request.body.leave_data.user.email.trim()) 
	{
		emptyFields.push('user\'s email');
	}
	if(!request.body.leave_data.leave_date)
	{
		emptyFields.push('leave date');
	}
	else if(request.body.leave_data.leave_date.length===0)
	{
		emptyFields.push('leave date');
	}
	if(!request.body.leave_data.leave_note)
	{
		emptyFields.push('leave note');
	}
	else if (!request.body.leave_data.leave_note.trim()) 
	{
		emptyFields.push('leave note');
	}
	if(!request.body.leave_data.tagged_users) 
	{
		emptyFields.push('tagged user');
	}
	else if(request.body.leave_data.tagged_users.length===0)
	{
		emptyFields.push('tagged user');
	}
	return emptyFields;	
}

// when a leave is requested to be updated this method is called
// parameters : request sent by the user
// to send default values when values are not passed in request
function getUpdateRequestData(request) {
	requestData = request.body.leave_data;
	
	if (!requestData.leave_status) {
		requestData.leave_status = "informed";
	}

	if (!requestData.leave_type) {
		requestData.leave_type = "leave_taken";
	}
	return request;
}

// called when commenting, to validate the comments fields
// parameters : request sent by the user
// to validate whether the fields which are mandatory are present
function commentValidate(request){
	console.log(request.body);
	var emptyFields=[];
	if(!request.body.user_id){
		emptyFields.push('id');
	}
	if(!request.body.parent_id){
		emptyFields.push('parent_id');
	}
	if(!request.body.user.user_id)
	{
		emptyFields.push('user\'s id');
	}
	if(!request.body.user.name)
	{
		emptyFields.push('user\'s name');
	}
	else if (!request.body.user.name) 
	{
		emptyFields.push('user\'s name');
	}

	if(!request.body.user.email)
	{
		emptyFields.push('user\'s email');
	}
	else if (!request.body.user.email) 
	{
		emptyFields.push('user\'s email');
	}
	if(!request.body.message)
	{
		emptyFields.push('message');
	}
	else if (!request.body.message) 
	{
		emptyFields.push('message');
	}
	
	return emptyFields;	

}

// when sending response to user this method is called
// parameters : sortData,sortValue,sortType
// sortData : data which needs to be sorted (in array format)
// sortValue : based on which it needs to be sorted (default start-date)
// sortType : 
function sortArray(sortData,sortValue,sortType)
{
	console.log("in function");
	if(sortType === "date")
	{
		sortData.sort(function(a,b){
			var c = new Date( a[sortValue] );
			var d = new Date( b[sortValue] );
			return c-d;
		});
	}
	else
	{
		sortData.sort(function(a,b){
			var c = a[sortValue];
			var d = b[sortValue];
			return c-d;
		});
	}
	return sortData;
}

// in order to sort the data sort type is needed
// parameter : sortValue
// sortValue : field by which you want to sort
// returns type of sort
function getSortType(sortValue)
{
	var sortType;
	if(sortValue === "start_date" || sortValue === "end_date")
	{
		sortType = "date";
	}
	else
	{
		sortType = "string";
	}
	return sortType;
}

//view My or Team Leaves
// https://us-central1-dilbert-34d6c.cloudfunctions.net/viewLeave
exports.viewLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");	
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, From, X-API-KEY");
	if (request.method === "POST") 
	{
		//define variable
			var userRef = [];
			var userResult = {};
			var finalResult = [];
			var returnResponse = {};
			var filters = [];
			var userStatus = [];
			var userCount = 0;

			var requestBody = request.body;
			var all_users = requestBody.filters.users;

			// date filter
			var end_string = requestBody.filters.leave_date.end;
			var start_string = requestBody.filters.leave_date.start;

			var sortBy = requestBody.sort_by;

		filters['start_string'] = start_string;
		filters['end_string'] = end_string;

		// for each user get reference
		for (var i = 0; i < all_users.length; i++) {
			var users = all_users[i];
			users = users.toString();
			userRef[i] = db.collection("leave_management").doc(users);
		}

		// looping through each user
		db.getAll(userRef).then((querySnapshotUsers) => {
			querySnapshotUsers.forEach((docUser) => 
			{
				userStatus.push("pending");

				getUserLeaves(filters,docUser.id).
				then((results) => {
					userStatus[userCount] = "completed";
					if(finalResult.length === 0)
						finalResult = results;
					else
						finalResult = finalResult.concat(results);

					console.log("status : ",userStatus);

					if (userStatus.indexOf("pending") === -1) {
						if (sortBy === "") 
						{
							sortBy = "start_date";
						}
						var sortType = getSortType(sortBy);

						console.log("Sort By : ",sortBy);
						finalResult = sortArray(finalResult,sortBy,sortType);

						var finalFilter = [];
						for(var i = 0; i<finalResult.length ; i++)
						{
							console.log("finalResult: ",finalResult[i].valid);
							if(finalResult[i].valid === "true")
							{
								console.log("filtered");
								finalFilter.push(finalResult[i]);
							}
						}

						/*console.log("To be sorted : ");
						console.log(finalResult);

						finalResult.sort(function(a,b){
							var c = new Date(a.start_date);
							var d = new Date(b.start_date);
							return c-d;
						});*/
							
						returnResponse = {
							"status" : "success",
							"message" : "200 OK",
							"data" :{
								"leaves" : finalFilter
							}
						}
						return response.status(200).send(returnResponse);
					}
					userCount = userCount+1;
					return "pending";
				})
				.catch(function(error)
				{
					 console.log('Error getting documents', error);
           			 return response.status(500).json({ message: "Error getting the all results" + error });
				})		
			});
			return "pending";
		})
		.catch(function(error) {
		    console.error("Error viewing users: ", error);
		    return response.status(400);
		});
	}
	else
	{
		/*var return_value={
			"status" : "success",
			"message" : "wrong method",
		};
		response.status(200).send(return_value); */
		response.setHeader("Access-Control-Max-Age", "1728000");
		response.setHeader("Content-Length", "0");

		status_code = 200;
		result = {	"status": "error", 
		"message": 'Method not supported' 
		};
		response.status(status_code).send(result);
	}
});

// to update a leave (edit)
// https://us-central1-dilbert-34d6c.cloudfunctions.net/updateLeave
exports.updateLeave= functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");	
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, From, X-API-KEY");
	if (request.method === "POST") 
	{
		console.log("Request : ",request.body);
		mandatoryRequest=validateUpdateRequest(request);
		if (mandatoryRequest.length === 0) 
		{
			console.log("body",request.body);
			console.log("user id",request.body.user_id);

			request=getUpdateRequestData(request);
			var parent_id_temp=request.body.parent_id;
			var parent_id=parent_id_temp.toString();
			var temp=request.body.user_id;
			var user_id=temp.toString();
			var user_leave =user_id+"_leave";
			var leave_counter=getLeaveCounter(request.body.leave_data.leave_type);
			var tempdates=request.body.leave_data.leave_date;
			var tempdates1=tempdates.sort();
			var start_date= new Date(tempdates1[0]);
			var end_date= new Date(tempdates1[tempdates1.length-1]);

			var leave_details={
				leave_note: request.body.leave_data.leave_note,
				type:request.body.leave_data.leave_type,
				leave_status:request.body.leave_data.leave_status,
				leave_counter:leave_counter,
				date_of_application:request.body.leave_data.date_of_application,
				parent_id:parent_id,
				start_date:start_date,
				end_date:end_date,
				valid:request.body.leave_data.valid
			}

			var user={
				user:request.body.leave_data.user
			}

			var created_by={
				created_by:request.body.leave_data.created_by
			}

			var modified_by={
				modified_by:request.body.leave_data.modified_by
			}

			var comments={
				comments:""
			}

			var leave_date={
				dates:request.body.leave_data.leave_date
			}
			console.log("dates",leave_date);

			var tagged_users={
				tagged_users:request.body.leave_data.tagged_users
			}

			var objdata={
				date_of_application:request.body.leave_data.date_of_application,
				end_date:end_date,
				leave_counter:leave_counter,
				leave_date:request.body.leave_data.leave_date,
				leave_note: request.body.leave_data.leave_note,
				leave_status:request.body.leave_data.leave_status,
				parent_id:parent_id,
				start_date:start_date,
				tagged_user:request.body.leave_data.tagged_users,
				type:request.body.leave_data.leave_type,
				user:request.body.leave_data.user
			}

			var return_value_post={
				"status" : "success",
				"message" : "Leave Updated Successfully",
				"data" : objdata
			}
			console.log(leave_details);

			// add leave details 
			// console.log("user_id:",user_id);
			var dataStore= db.collection("leave_management").doc(user_id).collection(user_leave).doc(parent_id);
			// console.log(dataStore);
			dataStore.set(leave_details)

			.then(function() {
				console.log("leave details successfully written!");
				return response.status(200);
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
				return response.status(400);
			});

			//  modified by
			dataStore.collection("modified_by").get().then(function(doc){
				doc.forEach((docComment) => {
					console.log("document random id",docComment.id);
					dataStore.collection("modified_by").doc(docComment.id).update(modified_by).then(function() {
						console.log("leave modified_by data successfully written!");
						return response.status(200);
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
						return response.status(400);
					});
				});
				return 0;
			}).catch(function(error) {
				console.error("Error writing document: ", error);
				return response.status(400);
			});

			// ------------------------
			dataStore.collection("leave_date").get().then(function(doc){
				doc.forEach((docLeaveDate) => {
					console.log("document random id",docLeaveDate.id);
					dataStore.collection("leave_date").doc(docLeaveDate.id).update(leave_date).then(function() {
						console.log("leave leave_date data successfully written!");
						return response.status(200);
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
						return response.status(400);
					});
				});
				return 0;
			}).catch(function(error) {
				console.error("Error writing document: ", error);
				return response.status(400);
			});
			//------------------------------

			//----------------------------
			dataStore.collection("tagged_users").get().then(function(doc){
				doc.forEach((docTaggedUsers) => {
					console.log("document random id",docTaggedUsers.id);
					dataStore.collection("tagged_users").doc(docTaggedUsers.id).update(tagged_users).then(function() {
						console.log("leave tagged_users data successfully written!");
						return response.status(200).send(return_value_post);
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
						return response.status(400);
					});

				});
				return 0;

			}).catch(function(error) {
				console.error("Error writing document: ", error);
				return response.status(400);
			});
			//-------------------------------------
		}
		else
		{
			return_value={
				"status" : "error",
				"message" : "Mandatory fields ("+mandatoryRequest+") not present",
				"data" : mandatoryRequest
			}
			response.status(200).send(return_value);
		}
	}
	else
	{
		/*var return_value={
			"status" : "success",
			"message" : "wrong method",
		};
		response.status(200).send(return_value); */
		response.setHeader("Access-Control-Max-Age", "1728000");
		response.setHeader("Content-Length", "0");

		status_code = 200;
		result = {	"status": "error", 
		"message": 'Method not supported' 
		};
		response.status(status_code).send(result);
	}
	
	});

//To Add Leave
// https://us-central1-dilbert-34d6c.cloudfunctions.net/addLeave
exports.addLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");	
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, From, X-API-KEY");
	if (request.method === "POST") 
	{
		mandatoryRequest=validateRequest(request);
		request=getRequestData(request);
		if (mandatoryRequest.length === 0) {
			console.log("request",request.body);
			console.log("AddLeave");
			var temp=request.body.user.user_id;
			var user_id=temp.toString();
			var leave_counter=getLeaveCounter(request.body.leave_type);
			var date = new Date();
			var date_of_application = date.getTime();
			var user_leave =user_id+"_leave";
			console.log("user_leave",user_leave);
			var parent_id = generateId(request.body.user.user_id,date_of_application);
			// console.log("parent_id:",parent_id);
			// console.log("date_of_application:",date_of_application);
			// console.log(request.body.leave_note);
			var tempdates=request.body.leave_date;
			var tempdates1=tempdates.sort();
			// console.log("dates",tempdates);
			// console.log("sorted dates",tempdates1);
			// console.log(request.body.leave_date);
			var start_date= new Date(tempdates1[0]);
			var end_date= new Date(tempdates1[tempdates1.length-1]);
			// console.log("start date",start_date);
			// console.log("end date",end_date);
			// console.log("start",tempdates1[0]);
			// console.log("end",tempdates1[tempdates1.length-1]);

			var leave_details={
				 leave_note: request.body.leave_note,
				 type:request.body.leave_type,
				 leave_status:request.body.leave_status,
				 leave_counter:leave_counter,
				 date_of_application:date_of_application,
				 parent_id:parent_id,
				 start_date:start_date,
				 end_date:end_date,
				 valid:"true"
			}
			var user={
				user:request.body.user
			}
			var created_by={
				created_by:request.body.created_by
			}
			var modified_by={
				modified_by:request.body.modified_by
			}
			
			var comments={
				comments:""
			}

			var leave_date={

				dates:request.body.leave_date
			}
			console.log("dates",leave_date);
			var tagged_users={
				tagged_users:request.body.tagged_users
			}
			var objdata={
				date_of_application:date_of_application,
				end_date:end_date,
				leave_counter:leave_counter,
				leave_date:request.body.leave_date,
				leave_note: request.body.leave_note,
				leave_status:request.body.leave_status,
				parent_id:parent_id,
				start_date:start_date,
				tagged_user:request.body.tagged_users,
				type:request.body.leave_type,
				user:request.body.user
			}
			var return_value_post={
					"status" : "success",
					"message" : "Added leave request",
					"data" : objdata
				}

				// add leave details 
				console.log("user_id:",user_id);
				var dataStore= db.collection("leave_management").doc(user_id).collection(user_leave).doc(parent_id);
				console.log(dataStore);
				dataStore.set(leave_details)

				.then(function() {
				    console.log("leave details successfully written!");

				    return response.status(200);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});
				//user added
				console.log(user);
				dataStore.collection("user").doc().set(user)
				.then(function() {
				    console.log("leave user data successfully written!");
				    return response.status(200);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});

				//add created by user
				console.log(created_by);
				dataStore.collection("created_by").doc().set(created_by)
				.then(function() {
				    console.log("leave created_by data successfully written!");
				    return response.status(200);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});
				//add modified by
				console.log(modified_by);
				dataStore.collection("modified_by").doc().set(modified_by)
				.then(function() {
				    console.log("leave modified_by data successfully written!");
				    return response.status(200);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});
				//comments
				// console.log(comments);
				// dataStore.collection("comments").doc().set(comments)
				// .then(function() {
				//     console.log("leave comments data successfully written!");
				//     return response.status(200);
				// })
				// .catch(function(error) {
				//     console.error("Error writing document: ", error);
				//     return response.status(400);
				// });
				
				// add leave dates 
				dataStore.collection("leave_date").doc().set(leave_date)
				.then(function() {
				    console.log("leave dates successfully written!");
				    return response.status(200);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});

					// add leave tagged users 
				console.log(tagged_users);
				dataStore.collection("tagged_users").doc().set(tagged_users)
				.then(function() {
				    console.log("tagged users successfully written!");
				    return response.status(200).send(return_value_post);
				})
				.catch(function(error) {
				    console.error("Error writing document: ", error);
				    return response.status(400);
				});
		}
		else{
			return_value={
				"status" : "error",
				"message" : "Mandatory fields ("+mandatoryRequest+") not present",
				"data" : mandatoryRequest
			}
			response.status(200).send(return_value); 
		}

	}
	else
	{
		/*var return_value={
			"status" : "success",
			"message" : "wrong method",
		};
		response.status(200).send(return_value); */
		response.setHeader("Access-Control-Max-Age", "1728000");
		response.setHeader("Content-Length", "0");

		status_code = 200;
		result = {	"status": "error", 
		"message": 'Method not supported' 
		};
		response.status(status_code).send(result);
	}
});

// to add comment
// https://us-central1-dilbert-34d6c.cloudfunctions.net/addComment
exports.addComment = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");	
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, From, X-API-KEY");
	console.log("request method ",request.method);
	if(request.method === "POST") 
		{
			mandatoryRequest=commentValidate(request);
			console.log("emptyFields length",mandatoryRequest.length);
			console.log("emptyFields",mandatoryRequest);
			if(mandatoryRequest.length ===0){
				var date = new Date();
				var date_of_application = date.getTime();


				var user={
					user:request.body.user

				}
				var comments1={
					id : request.body.user_id,
					message:request.body.message,
					user:request.body.user,
					timestamp:date_of_application

				}
				console.log("request body",request.body);
				var tempuserId=request.body.user_id;
				var tempparentId=request.body.parent_id;
				var userId=tempuserId.toString();
				var parentId=tempparentId.toString();
				var user_leave =userId+"_leave";
				// var key=request.body.key;
				console.log("parentId",userId);
				console.log("parentId",parentId);
				// console.log(request.body.key);
				// console.log(comments1);
				var return_value_post={
						"status" : "success",
						"message" : "200 OK",
						"data" : comments1
					}
				var dataStore1= db.collection("leave_management").doc(userId).collection(user_leave);
				console.log("hello",dataStore1);
				dataStore1.doc(parentId).collection("comments").doc().set(comments1)
				.then(function() {
					    console.log("comment successfully written!");
					    return response.status(200).send(return_value_post);
					})
					.catch(function(error) {
					    console.error("Error writing document: ", error);
					    return response.status(400);
					});
			}
			else{
				return_value={
					"status" : "error",
					"message" : "Mandatory fields ("+mandatoryRequest+") not present",
					"data" : mandatoryRequest
				}
				response.status(200).send(return_value); 
			}
		}	
		else
	{
		/*var return_value={
			"status" : "success",
			"message" : "wrong method",
		};
		response.status(200).send(return_value); */
		response.setHeader("Access-Control-Max-Age", "1728000");
		response.setHeader("Content-Length", "0");

		status_code = 200;
		result = {	"status": "error", 
		"message": 'Method not supported' 
		};
		response.status(status_code).send(result);
	}
	
	});

// Change status of the leave to invalid when user requests 
// https://us-central1-dilbert-34d6c.cloudfunctions.net/updateLeaveStatus
exports.updateLeaveStatus = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");	
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, From, X-API-KEY");
	console.log("request method ",request.method);
	if(request.method === "POST") 
		{
			if( request.body.status === "ignored")
			{
				mandatoryRequest=cancelLeaveValidate(request);
				// console.log("emptyFields length",mandatoryRequest.length);
				console.log("emptyFields",mandatoryRequest);
				if(mandatoryRequest.length ===0){
					var user={
						user:request.body.user
					}

					console.log("request body",request.body);
					var tempuserId=request.body.user.user_id;
					var tempparentId=request.body.parent_id;
					var userId=tempuserId.toString();
					var parentId=tempparentId.toString();
					var user_leave =userId+"_leave";
					console.log("user",userId);
					console.log("parentId",parentId);

					var returnData={
						parent_id:parentId,
						user:request.body.user
					}

					var return_value_post={
						"status" : "success",
						"message" : "Leave cancelled",
						"data" : returnData
					}

					var changeStatus = {valid :"false",
						invalidated_by : 
						{
							email:request.body.invalidated_by.email,
							name:request.body.invalidated_by.name,
							user_id:request.body.invalidated_by.user_id
						}
					};

					// setting valid : false on request from user so user's leave is not deleted and only marked as invalid
					var dataStore= db.collection("leave_management").doc(userId).collection(user_leave);
					dataStore.doc(parentId).set(changeStatus, { merge: true })
					.then(function() {
						    console.log("leave invalidated successfully!");
						    return response.status(200).send(return_value_post);
						})
						.catch(function(error) {
						    console.error("Error writing document: ", error);
						    return response.status(400);
						});
				}
				else{
					return_value={
						"status" : "error",
						"message" : "Mandatory fields ("+mandatoryRequest+") not present",
						"data" : mandatoryRequest
					}
					response.status(200).send(return_value); 
				}
			}
			else
			{
				return_value={
					"status" : "success",
					"message" : "200 Ok"
				}
			}
		}	
		else
	{
		/*var return_value={
			"status" : "success",
			"message" : "wrong method",
		};
		response.status(200).send(return_value); */
		response.setHeader("Access-Control-Max-Age", "1728000");
		response.setHeader("Content-Length", "0");

		status_code = 200;
		result = {	"status": "error", 
		"message": 'Method not supported' 
		};
		response.status(status_code).send(result);
	}
	
	});