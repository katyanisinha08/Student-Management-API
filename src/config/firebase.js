const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: cert({
    projectId:"student-management-syste-ab028",
    clientEmail:"firebase-adminsdk-fbsvc@student-management-syste-ab028.iam.gserviceaccount.com",
    privateKey:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKvx1orDIEXbR3\n+/ZB0ITxUauXt9Y5QXkC0ghGCIEBF9eOTfPI+70fcaAfzl5PP/iAdi8uUG0RO88x\nd9Etu3BMd6LA8igyT11itCa1CzoGe+LVgukKXKxlUKvqCMEcZ+VMu3On/etABMNT\nFw9uvTHe8/64KsFtQ1ShV1TDu6FpATgoGiJfyaNvNobo9DF9iFJICWwID0LHqT16\nPrfTncTEZ82JLBnlUcRM3P8Ns26lbGKsEpP6I7cmyFAtrqgXjaVEssxuzy4ZitPi\n00G17YdCuZDfJxm4vIq9bKpJqhIYVR8hsZOQRmD709DzUIHLDWfnvbYW5fGWx53V\n7pvyHvKZAgMBAAECggEAQfJaGYLxHfRw0Bo3pn6xz2C2RLo6RxNhziYNJOJ9O6LK\nrXHzmusvP/wQjmfsyzBOn1JR1Gm6oEFpCnkjpBF03JqJaOMbagngoUthz7+gFx3S\n0YosTP+J38aWtKA2WAv/TK8oVntEOuWRtwQoM+f8Qb3xm2vk0Kp266fhXW05elKj\n8B6SG7mYBu+ikfPCTQfAm7pV+t6YD6W7/Lgv5r5uZI6iltD1c+F34S8O5rxKeGEp\nshM4WkokjuEVOqxXNziQq+CyJpLPlvu36cHjHz6cxpCj7uy6Jn1fr5N5DPQymrvC\nuuLkJZMbpLgPtEUd9MONjm7DKlzKYpqxy8RaZAus9QKBgQDqwBEVTn9pCCr+jRcP\nJwlH4Q0+p5N1WBt2MhyCqIPbo/88rPD+lTNrbkdAupoJXIvMr4iOXuL/RMKUSXZY\nHP0r7cqwoO2xQwqVJ3AnCxI4DBxE2a9f7oHPJMIqxlmHZJDa9h47wjmld7PCJRR+\nE4CRw2M2g0ddavSfygMlDMHDUwKBgQDdGWrEYmRBShhN6kC8QA/747BwU1/q/97q\nvU4kUf64XpFV13f6YrvWrpW+EBj8H8YzZm/uy3zfyghHUjekKA7MzE3ct3jckM7S\njCU10ZDEoxm68YlXot52y9jn9rtklfq/FqwOuSy47JjE6LeDrSf0leJ1kkyI9jz7\nEA+og15A4wKBgQCSrkx+Wbw27smeoJ5F84hTB4Z1HdR/v/v40LsL0SwC8+gqC43S\nJXwpppCTG4XgT5ly3kOfYh7Ijjhe28A8snBnIIBD+WpMFq3oIOptGvfZWYfYZYS1\nlpw5yKgifim29dmlV5/wix3mDHOf3fd+B8WQTtwRVdojvw73QQzR+7SezQKBgQDC\nDXzXwEOdyhpqyB7pGpDs03oYHBUjfE96V4wt9IlL6DRG00ZKTD3wvmpO1nIXVwvu\nMQos3AxNnlSFxHNxcHcM6IOuJJm/fJkJ0lcWVUhqTXxXx4ZzlE8MlP1bGgJ+1eOt\ns4hvo7bM11t994KZ33AiCysnZbAmxXfgIsibbjFbYQKBgB/JcFDh+yHAziqNunqi\n1IXxR6Wv0jPmktCiWG0vQ3T+X+ToxMYaxql97w3mcAJ5vpMdXemifAe9+deYYaPe\nPbuDq6yl+/lf2TLrIBdpC61uca1gjYhEheMHA5p8y0AAn0KGS0mlkpRpFEl2PpUI\nT5QTTqESPQt/CxUEliKHkhdY\n-----END PRIVATE KEY-----\n",
  })
});

const db = getFirestore();

module.exports = { db };