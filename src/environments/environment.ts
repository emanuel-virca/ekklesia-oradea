// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>',
    appId: '<your-app-id>',
    measurementId: '<your-measurement-Id>',
  },
  algolia: {
    applicationId: '<your-application-id>',
    apiKey: '<your-api-key>',
    resourceIndex: 'resources',
  },
  webPortal: {
    domainURL: '<your-app-domain-url-here>',
    domainURLEncoded: '<your-app-domain-url-encoded-here>',
  },
  sts: {
    authority: '<auth-authority>',
    clientId: '<auth-client-id>',
    apiAudience: '<auth-api-audience>',
    apiAudienceEncoded: '<auth-api-audience-encoded>',
  },
};
