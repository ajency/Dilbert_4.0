<?php 

use Google\Spreadsheet\ServiceRequestFactory;
use Google\Spreadsheet\DefaultServiceRequest;
use Google\Spreadsheet\SpreadsheetService;
function insert_to_sheet($sheet_name,$data)
{
	putenv('GOOGLE_APPLICATION_CREDENTIALS=' . public_path().''.$data['path']);
        $client = new Google_Client;
        $client->useApplicationDefaultCredentials();
         
        $client->setApplicationName("Something to do with my representatives");
        $client->setScopes(['https://www.googleapis.com/auth/drive','https://spreadsheets.google.com/feeds']);
         
        if ($client->isAccessTokenExpired()) {
            $client->refreshTokenWithAssertion();
        }
         
        $accessToken = $client->fetchAccessTokenWithAssertion()["access_token"];
        ServiceRequestFactory::setInstance(
            new DefaultServiceRequest($accessToken)
        );


        $spreadsheet = (new SpreadsheetService)
        ->getSpreadsheetFeed()
        ->getByTitle($sheet_name);

        return $spreadsheet;
}