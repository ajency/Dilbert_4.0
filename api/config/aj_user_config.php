<?php
	/*
		"social_failure_redirect_url" ->  Redirect to Defined path on Failure / Error,
		"social" -> List of social account that will be used in the project
		"social_email_domain" -> The email domain that is append to all the Social account Username. Hence the username will be "<SocialAccount_ID>@<social_email_domain><Provider>.com" ex: 123192812139001@<social_email_domain>google.com
		"table_required_fields" -> This fields checks if the required columns of the Table are satisfied & if not then the "required_field" check returns False, else True
	*/
	return [
		"social_failure_redirect_url" => "/",
		"social_account_provider" => ["google", "facebook"], // Social account Domains that are considered for now
		"social_email_domain" => "aj",
		"table_required_fields" => [
			array("table" => "users", "columns" => ["id", "email", "signup_source"], "column_relating_to_user" => "id"),
			array("table" => "user_details", "columns" => ["org_id", "avatar", "lang", "joining_date", "api_token"], "column_relating_to_user" => "user_id"),
			array("table" => "user_communications", "columns" => [], "column_relating_to_user" => "object_id")
		]
	];
