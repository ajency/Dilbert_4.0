<?php
	/*
		"roles" ->  Array of Role names to be generated,
		"permissions" -> Array of Permission names to be generated
		"roles_permissions" -> [Array having
			array("role" => < Array index of the role in "roles", "permissions" => [array of <indexes of permssion> from "permissions"])
		]

		Example:
		[
			"roles" => ["superadmin", "admin", "member"],
			"permissions" => ["add_users", "edit_users", "add_personal", "edit_personal", "add_internal", "edit_internal"],
			"roles_permissions" => [
				"roles" => 0, "permissions" => [0, 1, 2, 3, 4, 5],
				"roles" => 1, "permissions" => [0, 1, 2, 3],
				"roles" => 2, "permissions" => [2, 3]
			]
		]
	*/
	return [
		"roles" => [
			"admin",
			"hr",
			"member"
		],
		"permissions" => [
			"view_period_data",
			"edit_period_data",
			"view_day_summary",
			"edit_day_summary",
			"edit_user",
			"view_log_history",
			"leave_marking",
			"slot_marking",
			"edit_log_mails",
			"leave_feature_enable",
			"edit_others_leaves",
		],
		"roles_permissions" => [
			array("role" => 0, "permissions" => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
			array("role" => 1, "permissions" => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
			array("role" => 2, "permissions" => [0, 2, 9])
        ]
	];
