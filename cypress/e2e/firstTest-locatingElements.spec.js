/// <reference types="cypress"/>

describe('Our first suite', ()=> {


    it('first test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        
        // by Tag Name
        cy.get('input');
        
        //by ID
        cy.get('#inputEmail');

        //by Class Name
        cy.get('.input-full-width');

        //by Attribute Name
        cy.get('[placeholder]');

        //by Attribute name and Value
        cy.get('[placeholder="Email"]');

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        //by Tag name and Attribute with Value
        cy.get('input[placeholder="Email"]');

        //by two different Attributes and more
        cy.get('[placeholder="Email"][type="Email"]');

        //by Tag name. Attribute with Value, ID and Class Name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

        //The most recommended way by Cypress (customised attribute and value)
        cy.get('[data-cy="imputEmail1"]');

    });

    it.only('second test', ()=>{
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="signInButton"]');

        //can only pass a description of a web element and it will be returned
        cy.contains('Sign in');

        //more specific by combining different locators
        //"Hey Cypress find to me the web element '[status="warning"]' which contains 'Sign in' 
        cy.contains('[status="warning"]','Sign in');

        //Lets say there are many 'Sign in' locators in the page and we need to find the specific one.
        //Another whay of doing it instead using many combination of locators from the same TAG is
        //to use "parents" command combined with "find" command
        //tip: After "parents" must use "find" instead "get". the command "find"
        //will try to find the locator in the same section(or chain).
        //"find" - command is only to find the child element inside the parent element.
        //"parents" - command is to locate the parents element from the currentkey element you are in. 
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in');

        //Same as above but now we want to click on a checkbox
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox').click();

        //Another shortcut is to use "contains" command straight.
        //Read: Find "nb-card" which contains "Horizontal form" and within this "nb-card" find the web element attribute with "type="email".
        cy.contains('nb-card','Horizontal form')
        .find('[type="email"]');

    });

}); //or context()