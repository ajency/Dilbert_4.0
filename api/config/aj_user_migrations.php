<?php

return [
	/*
     All the Custom table / Model Name, type of Migration, Columns to be assigned under Migrations are to be defined below.
     Here are the fields available
     Under Table level,
        "model" -> Model Name & also Migration file is generated & Table Name generated relating to the Model Name
        "table" -> Table name to be assigned for Migrations (Note: Only Migration file is generated)
        "status" -> (create / alter)
        "columns" -> [Array of Columns]
            "columns" -> array(
                "column" => "<column_name>",
                "type" => "<column_type>",
                "size" => "size of the Column - < Only for String Type >",
                "digit" => "Digits to display - < Only for Float Type >", "decimal_pt" => "numbers to store after decimal point - < Only for Float Type >",
                "precision" => "Digits of precision to store < Only for Decimal Type >", "scale" => "Decimal point scale < Only for Decimal Type >",
                "comment" => "<comment_for_the_column>",
                "nullable" => "<true/false> [Decides whether Column is nullable or not]",
                "default" => "<default_value> [Sets default value on SAVE]"
            )

            "type" ("For a column") -> ["string", "text", "boolean", "integer", "decimal", "float", "date", "datetime", "timestamp", "increments"]
            For ex:
            array(
                "table" => "<table_A> [this field is only used if status == 'alter' or (status == 'create' & 'model' is not defined)]",
                "model" => "ModelA [this field is only used if status == 'create']",
                "status" => "< create / alter >",
                "columns" => [
                    array("column" => "<Col-1>", "type" => "string", "size" => 100, "nullable" => true, "comment" => "Internal / Registered (has password) / Guest (no password)"),
                    array("column" => "<Col-2>", "type" => "boolean", "default" => 0),
                    array("column" => "<Col-3>", "type" => "datetime", "nullable" => true),
                    array("column" => "<Col-4>", "type" => "date", "nullable" => true),
                    array("column" => "<Col-5>", "type" => "timestamp", "nullable" => true),
                    array("column" => "<Col-6>", "type" => "integer", "nullable" => true),
                    array("column" => "<Col-7>", "type" => "float", "digit" => <Digit limit>, "decimal_pt" => <Decimal_pt_limit>, "nullable" => true),
                    array("column" => "<Col-8>", "type" => "decimal", "precision" => <Precision limit>, "scale" => <decimal scale limit>, "nullable" => true),
                    array("column" => "<Col-9>", "type" => "increments", "nullable" => true),
                ]
            )
    */

	array(
        "table" => "users", "status" => "alter", "columns" => [
            array("column" => "has_required_fields_filled", "type" => "boolean", "default" => 0),
            array("column" => "status", "type" => "string", "size" => 50, "nullable" => true),
            array("column" => "signup_source", "type" => "string", "size" => 100, "nullable" => true),
        ]
    ),
    array(
        "table" => "user_details", "model" => "UserDetail", "status" => "create", "columns" => [
            array("column" => "avatar", "type" => "string", "size" => 150, "nullable" => true),
            array("column" => "lang", "type" => "string", "size" => 10, "nullable" => true),
			array("column" => "timeZone", "type" => "string", "size" => 50, "nullable" => true),
			array("column" => "joining_date", "type" => "date", "nullable" => true),
			array("column" => "org_id", "type" => "integer", "nullable" => true),
			array("column" => "socket_id", "type" => "string", "size" => 100, "nullable" => true),
			array("column" => "api_token", "type" => "string", "size" => 100, "nullable" => true),
			array("column" => "gender", "type" => "string", "size" => 10, "nullable" => true),
			array("column" => "dob", "type" => "date", "nullable" => true),
			array("column" => "app_version", "type" => "string", "size" => 10, "nullable" => true),
			array("column" => "browser_version", "type" => "string", "size" => 10, "nullable" => true),
        ]
    )
];
