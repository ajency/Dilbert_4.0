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

exports.createLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	if (request.method === "POST") 
	{
		console.log(request.body);
		mandatoryRequest=validateRequest(request);
		console.log("length",mandatoryRequest.length);
		request=getRequestData(request);
		if (mandatoryRequest.length === 0) {
			requestBody=request.body;
			console.log(requestBody);
			var ref = firebase.database().ref('/leave/'+requestBody.user.user_id);
			var leave_counter=getLeaveCounter(requestBody.leave_type);
			var date = new Date();
			var date_of_application = date.getTime();
			var parent_id = generateId(requestBody.user.user_id,date_of_application);

			var obj = {
				"user" : {
					"user_id": requestBody.user.user_id,
					"email" : requestBody.user.email,
					"name" : requestBody.user.name
				},

				"created_by":{
					"user_id":requestBody.created_by.user_id,
					"email":requestBody.created_by.email,
					"name":requestBody.created_by.name
				},

				"modified_by" : {
					"user_id":requestBody.modified_by.user_id ,
					"email" :requestBody.modified_by.email, 
					"name" : requestBody.modified_by.name
				},

				"date_of_application" : date_of_application,
				"leave_date" : requestBody.leave_date,
				"leave_note" : requestBody.leave_note,
				"parent_id" : parent_id,
				"leave_counter" : leave_counter,     
				"leave_status": requestBody.leave_status,
				"leave_type" : requestBody.leave_type,
				"tagged_users":requestBody.tagged_users                    
			};

			ref.push(obj); 
			return_value={
				"status" : "success",
				"message" : "200 OK",
				"data" : obj
			}
			response.status(200).send(return_value); 
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
		return_value=[
		{
			"status" : "error",
			"message" : "wrong method",
		}]
		response.status(200).send(return_value); 
	}
});

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


exports.displayLeave = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	if (request.method === "POST") 
	{
	var requestBody = request.body;
	var responseData=[];
	var data = [];
	var leaves;

	console.log('request : ',requestBody);
	var ref = firebase.database().ref('leave/'+requestBody.filters.users);

	ref.once('value', function (snap) {
	 	snap.forEach(function (parentSnap) {
	 		responseData.push(parentSnap.val());
	 	});
	 	console.log('Response Data : ',responseData);
	 	leaves = {
	 		"leaves" : responseData
	 	};

	 	var dataResponse = {
	 			"status" : "success",
				"message" : "200 OK",
				"data" : leaves
		 	}

		console.log('Return Data : ',dataResponse);

	 	response.status(200).send(dataResponse); 

	},function (error) {
		console.log("Error: " + error.code);
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


exports.displayLeaveTest1 = functions.https.onRequest((request,response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	if (request.method === "POST") 
	{
	var requestBody = request.body;
	var responseData=[];
	var data = [];
	var leaves;

	console.log('request : ',requestBody);
	var ref = firebase.database().ref('leave/'+requestBody.filters.users);

	ref.once('value', function (snap) {
	 	snap.forEach(function (parentSnap) {
	 		responseData.push(parentSnap.val());
	 	});
	 	console.log('Response Data : ',responseData);
	 	leaves = {
	 		"leaves" : responseData
	 	};

	 	var dataResponse = {
	 			"status" : "success",
				"message" : "200 OK",
				"data" : leaves
		 	}

		console.log('Return Data : ',dataResponse);

	 	response.status(200).send(dataResponse); 

	},function (error) {
		console.log("Error: " + error.code);
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


exports.displayLeaveTest = functions.https.onRequest((request,response) => {
	var return_value={
				"status" : "success",
				"message" : "200 OK",
				"data" : {
					"leaves": [
					{
						"user":{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							},
						"leave_note": "sick",
						"leave_date": [
							"2018-04-12",
							"2018-04-13"
						],
						"leave_parent_id": 12345,
						"type": "leave_taken",
						"tagged_users": [
							{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							},
							{
								"user_id": 45,
								"name": "nutan",
								"email": "nutan@ajency.in"
							}
						],
						"comments": [
							{
								"id": 1231,
								"message": "hiii",
								"user": 
									{
										"user_id": 45,
										"name": "nutan",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							}
						]
					},
					{
						"user": 
							{
								"user_id": 45,
								"name": "nutan",
								"email": "nutan@ajency.in"
							},
						"leave_note": "sick",
						"leave_date": [
							"2018-04-14",
							"2018-04-15",
							"2018-04-16"

						],
						"leave_parent_id": 12345,
						"type": "leave_taken",
						"tagged_users": [
							{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							},
							{
								"user_id": 45,
								"name": "nutan",
								"email": "nutan@ajency.in"
							},
							{
								"user_id": 81,
								"name": "shreya",
								"email": "shreya@ajency.in"
							}
						],
						"comments": [
							{
								"id": 1231,
								"message": "hiii",
								"user": 
									{
										"user_id": 45,
										"name": "nutan",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							}
						]
					},
					{
						"user": 
							{
								"user_id": 81,
								"name": "shreya",
								"email": "shreya@ajency.in"
							},
						"leave_note": "I have a wedding to attend",
						"leave_date": [
							"2018-04-14",
							"2018-04-15",
							"2018-04-16"

						],
						"leave_parent_id": 12345,
						"type": "leave_taken",
						"tagged_users": [
							{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							},
							{
								"user_id": 25,
								"name": "tanaya",
								"email": "bac@ajency.in"
							},
							{
								"user_id": 15,
								"name": "tanvi",
								"email": "aa@ajency.in"
							},
							{
								"user_id": 33,
								"name": "prajay",
								"email": "ss@ajency.in"
							},
							{
								"user_id": 62,
								"name": "sujit",
								"email": "ds@ajency.in"
							},
							{
								"user_id": 45,
								"name": "nutan",
								"email": "nutan@ajency.in"
							},
							{
								"user_id": 81,
								"name": "shreya",
								"email": "shreya@ajency.in"
							},
							{
								"user_id": 22,
								"name": "sharang",
								"email": "uu@ajency.in"
							}
						],
						"comments": [
							{
								"id": 1231,
								"message": "This is test",
								"user": 
									{
										"user_id": 45,
										"name": "tanvi",
										"email": "tanvi@ajency.in"
									},
								"timestamp": "123123123"
							},
							{
								"id": 1231,
								"message": "test2",
								"user": 
									{
										"user_id": 45,
										"name": "amit",
										"email": "amit@ajency.in"
									},
								"timestamp": "123123123"
							},
							{
								"id": 1231,
								"message": "test3",
								"user": 
									{
										"user_id": 45,
										"name": "sujit",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							},
							{
								"id": 1231,
								"message": "comment test4",
								"user": 
									{
										"user_id": 45,
										"name": "sharang",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							}
						]
					},
					{
						"user": {
								"user_id": 35,
								"name": "sujay",
								"email": "sujay@ajency.in"
							},
						"leave_note": "sick",
						"leave_date": [
							"2018-04-12"
						],
						"leave_parent_id": 5022233,
						"type": "leave_taken",
						"tagged_users": [
							{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							}
						],
						"comments": [
							{
								"id": 1231,
								"message": "hiii",
								"user": 
									{
										"user_id": 45,
										"name": "nutan",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							},
							{
								"id": 1231,
								"message": "hiii1",
								"user": 
									{
										"user_id": 45,
										"name": "viraj",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							},
							{
								"id": 1231,
								"message": "hiii2",
								"user": 
									{
										"user_id": 45,
										"name": "prajay",
										"email": "nutan@ajency.in"
									},
								"timestamp": "123123123"
							}
						]
					},
					{
						"user": {
								"user_id": 35,
								"name": "sujay",
								"email": "sujay@ajency.in"
							},
						"leave_note": "sick",
						"leave_date": [
							"2018-04-12"
						],
						"leave_parent_id": 5022233,
						"type": "leave_taken",
						"tagged_users": [
							{
								"user_id": 80,
								"name": "anish",
								"email": "anish@ajency.in"
							}
						],
						"comments": []
					}
					]
				}
	}
	response.status(200).send(return_value); 
});


var db = firebase.firestore();

exports.cloudLeave = functions.https.onRequest((request,response) => {
	var cloudData = [];
	var cloudData1 = [];
	var cloudData2 = [];
	var cloudData3 = [];
	// var id = ["81","80","45"];
	var requestBody = request.body;
	var user_temp = requestBody.user_id;
	var user = user_temp.toString();
	var parent_id_temp = requestBody.parent_id;
	var parent_id = parent_id_temp.toString();
	var promise1,promise2;


	console.log("Parent Id",parent_id);
	// var dateDa = new Date('2018-04-20'); 
	const dataForDisplay = db.collection("leave_management").doc(user).collection(parent_id);
	// const dataComment = dataForDisplay.doc("IzBBL6boIKlypUkHTNv3").collection("comments");

	dataForDisplay.get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	        console.log(doc.id, " => ", doc.data());
	          //console.log(querySnapshot.doc().collection("comments"));
	        cloudData.push(doc.data());
	        console.log("Console 1",cloudData);

	        //code to access comments of user
			const dataComment = dataForDisplay.doc(doc.id).collection("comments");
	       	var promise1 = new Promise(function(resolve,reject){
	       		tempPromiseComment = dataComment.get();
	       		tempPromiseComment.then((querySnapshotComment) => {
	    			querySnapshotComment.forEach((docComment) => {
	    				console.log("Comments");
	    				console.log(docComment.data());
	    				cloudData1.push(docComment.data().comments);
	        			console.log("Console 2",cloudData1);
	    		});
	    			// commentData.push(cloudData1);
	    			resolve(cloudData1);
	    			return response.status(200);
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
	    				cloudData2.push(docTagged.data().tagged_users);
	        			console.log("Console 3",cloudData2);
	    		});
	    			// taggedData.push(cloudData2);
	    			resolve(cloudData2[0]);
	    			return response.status(200);
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
	    				cloudData3.push(docLeave.data().dates);
	        			console.log("Console 4",cloudData3);
	    				});
	    			// leaveData.push(cloudData3);
	    			resolve(cloudData3[0]);
	    			return response.status(200);
				})
				.catch(function(error) {
					reject(error);
				    console.error("Error displaying tagged users document: ", error);
				    return response.status(400);
				})
		        console.log("Console 5",cloudData3);
		        console.log("Console 6",cloudData);
		        console.log("dataForDisplay",dataForDisplay);
	    	});


		console.log("Promise 1",promise1);

		Promise.all([promise1, promise2,promise3]).then(function(values) {
	        	console.log("Test")
	        	console.log("Values");
	        	console.log(values);
	        	console.log(values[0]);
				console.log("Promise 1",promise1);

	        	var tempData = {
	        		"leave_type" : cloudData[0].leave_type,
				    "leave_status": cloudData[0].leave_status,
				    "leave_counter": cloudData[0].leave_counter,
				    "leave_note": cloudData[0].leave_note,
				    "parent_id": cloudData[0].parent_id,
				    "date_of_application": cloudData[0].date_of_application,
	        		"comment" : values[0],
	        		"tagged_user" : values[1],
	        		"leave_date" : values[2]
	        	}

	        	console.log("cloudData : ",cloudData);
	        	console.log("tempData",tempData);
	        	return response.status(200).send(tempData);
	        })
	        .catch(function(error) {
			    console.error("Error returning promise: ", error);
			    return response.status(400);
			});
			return 0;
		});


	  //       Promise.all([promise1, promise2]).then(function(values) {
	  //       	console.log("Test")
	  //       	console.log("Values");
	  //       	console.log(values);
	  //       	return response.status(200).send(values);
	  //       })
	  //       .catch(function(error) {
			//     console.error("Error returning promise: ", error);
			//     return response.status(400);
			// });
			return 0;
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	    return response.status(400);
	});
});
});