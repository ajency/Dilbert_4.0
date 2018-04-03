const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createLeave = functions.https.onRequest((request,response) => {
var obj = 
{
"status" : "200",		        // status codes
"message" : "success", 		//in case of error 
"data" : {          
    "user" : {
		"user_id": "81",
		"email" : "shreya@ajency.in",
		"name" : "shreya"
                 },
	"created_by" : { 
		"user_id": "81",
		"email" : "shreya@ajency.in",
		"name" : "shreya"
                       },                        
	"date_of_application" : "2018-04-11", 
        "leave_date" : ["2018-04-15","2018-04-16"],
        "leave_note" : "Sisters Wedding",
        "modified_by" : {
                           "user_id":81 ,
                           "email" :"shreya@ajency.in", 
                           "name" : "shreya"
                        },
        "parent_id" : 181 , 
        "leave_status":"informed",
        "leave_type":"leave_taken", 
        "tagged_user":[{
                        "user_id":81 ,
                           "email" :"shreya@ajency.in", 
                           "name" : "shreya"
                        },
                        {
                        "user_id": 42,
						"name" : "nutan",
						"email" : "nutan@ajency.in"}
                      ] 
         }
}
	response.send(obj);
});