/// <reference types="cypress" />

describe('JSON objects', () => {

    it.only('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2", };

        const simpleArrayOfValues = ["one", "two", "three"];

        const arrayOfObjects = [{ "key": "value" }, { "key2": "value2" }, { "key3": "value3" }];

        const typesOfData = { "string": "this is a string", "number": 10 };

        const mix = {
            "FirstName": "Ronaldo",
            "LasName": "Santos",
            "Age": 20,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Corner"
                },
                {
                    "firstName": "Leandro",
                    "lastName": "Santos",
                    "Titulos": [
                        {
                            "Title": "doctor"
                        },
                        {
                            "Title2": "Master",
                            "ArrayOfTitles": [
                                {
                                    "title0": "one"
                                },
                                {
                                    "title1": "two"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        console.log("My Object Test: " + simpleObject.key2);
        console.log(simpleObject);
        console.log(mix.Students[1])

    })



})