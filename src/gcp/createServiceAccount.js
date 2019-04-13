module.exports = async function createServiceAccount() {

  return {
      json_keyfile: 'dkaslasdlj45jd',
      service_account_email: 'new_account@service-account.com'
  };
}

// // BEFORE RUNNING:
// // ---------------
// // 1. If not already done, enable the Identity and Access Management (IAM) API
// //    and check the quota for your project at
// //    https://console.developers.google.com/apis/api/iam
// // 2. This sample uses Application Default Credentials for authentication.
// //    If not already done, install the gcloud CLI from
// //    https://cloud.google.com/sdk and run
// //    `gcloud beta auth application-default login`.
// //    For more information, see
// //    https://developers.google.com/identity/protocols/application-default-credentials
// // 3. Install the Node.js client library by running
// //    `npm install googleapis --save`

// const {google} = require('googleapis');
// var iam = google.iam('v1');

// function authorize(callback) {
  // google.auth.getApplicationDefault(function(err, authClient) {
    // if (err) {
      // console.error('authentication failed: ', err);
      // return;
    // }
    // if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      // var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      // authClient = authClient.createScoped(scopes);
    // }
    // callback(authClient);
  // });
// }

// authorize(function(authClient) {
  // var request = {
    // // Required. The resource name of the project associated with the service
    // // accounts, such as `projects/my-project-123`.
    // name: 'projects/-',  // TODO: Update placeholder value.
    // accountId: '-',
    // // resource: {
    // //   // TODO: Add desired properties to the request body.
    // // },

    // auth: authClient,
  // };

  // iam.projects.serviceAccounts.create(request, function(err, response) {
    // if (err) {
      // console.error(err);
      // return;
    // }

    // // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
  // });
// });
