const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var firebase = require('firebase-admin');

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
				"message" : "Mandatory fields "+mandatoryRequest+" not present",
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
