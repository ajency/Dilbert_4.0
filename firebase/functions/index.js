const functions = require('firebase-functions');
// require("firebase/firestore");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

firebase = require('firebase-admin');

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
function generateId(str1,str2) {
	var parent_id = String(str1)+String(str2);
	return parent_id;
}

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





exports.displayLeaveTest1 = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	if (request.method === "POST") 
	{
		console.log("Test run 18");

		var requestBody = request.body;
		if(requestBody.filters.users)
		{
			var user_temp = requestBody.filters.users;

			var user = user_temp.toString();

			var userCollection = user+"_leave";

			var promise1,promise2;
			var resp = [];
			var docStatus = [];
			var index = 0;
			var results = [];
			var returnData  = {};
			var tempData = {};


			console.log("userCollection",userCollection);
			const userValidate = db.collection("leave_management");
			//console.log("db.FieldPath.documentId() : ",db.testdata.documentId());
			//const userValidate =testdata.where(db.FieldPath.get();
			console.log(userValidate);
			userValidate.get().then((queryUser) => {
			    queryUser.forEach((doc) => {
			    	/*if (doc.id === user) {
			    		console.log("happy");			   
			    	}
			    	else
			    	{
			    		console.log("sad");
			    	}*/
			    	console.log("doc.id : ",doc.id)
			    });
			    return response.status(200);
			})
			.catch(function(error) {
					    console.error("Error displaying users document: ", error);
					    return response.status(400);
					});
		}
		else
		{
			return_value=[
			{
				"status" : "error",
				"message" : "User id not passed or not present"
			}]
			response.status(400).send(return_value); 
		}
	}
	else
	{
		return_value=[
		{
			"status" : "error",
			"message" : "wrong method"
		}]
		response.status(400).send(return_value); 
	}

});




//View leaves


exports.cloudLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	if (request.method === "POST") 
	{
		console.log("Test run 22");

		var requestBody = request.body;
		var user_temp = requestBody.filters.users;

		var user = user_temp.toString();

		var userCollection = user+"_leave";

		var promise1,promise2;
		var resp = [];
		var docStatus = [];
		var index = 0;
		var results = [];
		var returnData  = {};
		var tempData = {};


		console.log("userCollection",userCollection);

		const dataForDisplay = db.collection("leave_management").doc(user).collection(userCollection);

		console.log("dataForDisplay",dataForDisplay);
		dataForDisplay.get().then((querySnapshot) => {
			// console.log("querySnapshot",querySnapshot);
			console.log("querySnapshot.exists",querySnapshot.exists());
			if(!querySnapshot.exists()) {
				console.log("User does not exist");
				return response.status(400).send("Doesnt exist!!");
			}
		    querySnapshot.forEach((doc) => {
		    	var userLeaves = {};
		    	var cloudData = [];
		    	docStatus.push("pending");
		    	var i = index;
		    	index = index + 1;

		        console.log(doc.id, " => ", doc.data());

		        userLeaves = doc.data();
		        console.log("Console 1",cloudData);

		        //code to access comments of user
				const dataComment = dataForDisplay.doc(doc.id).collection("comments");
		       	
		       	var promise1 = new Promise(function(resolve,reject){
		       		tempPromiseComment = dataComment.get();
		       		tempPromiseComment.then((querySnapshotComment) => {
		    			querySnapshotComment.forEach((docComment) => {
		    				console.log("Comments");
		    				console.log(docComment.data());
		    				cloudData.push(docComment.data());
		        			userLeaves['comments'] = cloudData;
		    		});
		    			resolve(userLeaves);
		    			return 0;
				})
				.catch(function(error) {
						reject(error);
					    console.error("Error displaying comments document: ", error);
					    return response.status(400);
					})
				});

				// code to access tagged users
		       	const dataTagged = dataForDisplay.doc(doc.id).collection("tagged_users");
		        
		        var promise2 = new Promise(function(resolve,reject){
		        	tempPromise = dataTagged.get();
		        	console.log("tempPromise",tempPromise);
		        	tempPromise.then((querySnapshotTagged) => {
		    			querySnapshotTagged.forEach((docTagged) => {
		    				console.log("tagged users :  ");
		    				console.log(docTagged.data());
		        			userLeaves['tagged_users'] = docTagged.data().tagged_users;
		    		});
		    			resolve(userLeaves);
		    			return 0;
				})
				.catch(function(error) {
						reject(error);
					    console.error("Error displaying tagged users document: ", error);
					    return response.status(400);
					})
				});

				// code to access leave date
				const dataLeave = dataForDisplay.doc(doc.id).collection("leave_date");
		        
		        var promise3 = new Promise(function(resolve,reject){
		        	dataLeave.get().then((querySnapshotLeave) => {
		    			querySnapshotLeave.forEach((docLeave) => {
		    				console.log("Leave date : ");
		    				console.log(docLeave.data());
		        			userLeaves['leave_date'] = docLeave.data().dates;
		    				});
		    			resolve(userLeaves);
		    			return 0;
					})
					.catch(function(error) {
						reject(error);
					    console.error("Error displaying tagged users document: ", error);
					    return response.status(400);
					})
			        console.log("dataForDisplay",dataForDisplay);
		    	});

		    	//code to access users
				const dataUser = dataForDisplay.doc(doc.id).collection("user");
		       	
		       	var promise4 = new Promise(function(resolve,reject){
		        	tempPromiseUser = dataUser.get();
		        	console.log("tempPromiseUser",tempPromiseUser);
		        	tempPromiseUser.then((querySnapshotUser) => {
		    			querySnapshotUser.forEach((docUser) => {
		    				console.log("tagged users :  ");
		    				console.log(docUser.data());
		        			userLeaves['user'] = docUser.data().user;
		    		});
		    			resolve(userLeaves);
		    			return 0;
				})
				.catch(function(error) {
						reject(error);
					    console.error("Error displaying tagged users document: ", error);
					    return response.status(400);
					})
				});

				console.log("Promise 1",promise1);

				Promise.all([promise1, promise2,promise3,promise4]).then(function(values) {
		        	console.log("Test")
		        	console.log("Values");
		        	console.log(values);
		        	console.log(values[0]);
					console.log("Promise 1",promise1);

		        	docStatus[i] = "completed";

		        	if (docStatus.indexOf("pending") === -1){
		        		tempData["leaves"]=results;
		        		returnData={
							"status" : "success",
							"message" : "200 OK",
							"data" : tempData
						}
						return response.status(200).send(returnData);
		        	}
		        	return 0;
		        })
		    	.catch(function(error) {
				    console.error("Error returning promise: ", error);
				    return response.status(400);
				});
				console.log("userLeaves : ",userLeaves);
				results.push(userLeaves);
			});

			return 0;
		})
		.catch(function(error) {
		    console.error("Error viewing document: ", error);
		    return response.status(400);
		});
	}
	else
	{
		return_value=[
		{
			"status" : "error",
			"message" : "wrong method",
		}]
		response.status(200).send(return_value); 
	}

});

exports.cloudViewLeave = functions.https.onRequest((request,response) => {
	console.log("Just Testing 10 ");

	var requestBody1 = request.body;
	var user_temp1 = requestBody1.filters.users;
	var user1 = user_temp1.toString();
	var userCollection1 = user1+"_leaves";

	const dataForDisplay1 = db.collection("leave_management").doc(user1).collection(userCollection1);
	console.log("dataForDisplay1",dataForDisplay1);
			dataForDisplay1.get().then((querySnapshot1) => {
			    querySnapshot1.forEach((doc1) => {
			    	console.log("Document : ",doc1.data());
			    	console.log("Testing 1 ");
				});
				return response.status(200).send("heyhello");
			})
			.catch(function(error) {
			    console.error("Error viewing document: ", error);
			    return response.status(400);
			});

});

//To Add Leave
exports.cloudAddLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
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
			console.log("parent_id:",parent_id);
			console.log("date_of_application:",date_of_application);
			console.log(request.body.leave_note);

			var leave_details={
				 leave_note: request.body.leave_note,
				 type:request.body.leave_type,
				 leave_status:request.body.leave_status,
				 leave_counter:leave_counter,
				 date_of_application:date_of_application,
				 parent_id:parent_id
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
				comments:request.body.comments
			}

			var leave_date={

				dates:request.body.leave_date
			}

			console.log("dates",leave_date);
			var tagged_users={
				tagged_users:request.body.tagged_users
			}
			var objdata={
				leave_details:leave_details,
				tagged_users:tagged_users,
				leave_date:leave_date

			}
			var return_value_post={
					"status" : "success",
					"message" : "200 OK",
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
	else{
		return_value=[
		{
			"status" : "error",
			"message" : "wrong method",
		}]
		response.status(200).send(return_value); 
	}

});


//To Add comment
// To Validate Comment
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

exports.cloudAddComment = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
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
		else{
			return_value=[
			{
				"status" : "error",
				"message" : "wrong method",
			}]
			response.status(200).send(return_value); 
		}
	
	});
