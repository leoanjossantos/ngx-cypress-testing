/// <reference types="cypress"/>

const { DataLayerManager } = require("@agm/core");

describe('test news stuff', ()=>{

    it('then and wrap methods', ()=>{
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //find 'nb-card' which contains 'Using the Grid'. In that way I find the hole form.
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');


        //want to verify the label of the fields from same form or from different forms.
        //In order to achieve it, we need to "save" the status of the element.
        //using THEN and use WRAP functions:
        //THEN converts the code in JQuery so we can catch the value and save it into a variable
        //WRAP converts the code back to Cypress using its functions, for isntante "should"

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');

            //Nested function inside previous one, which means that this function knows the previous 
            //variables.
            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
                expect(passwordLabelFirst).to.equal(passwordLabelSecond);

                //This is a way to bring it back to Cypress comands:
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            });


        } );

        //Another way to write the function, very verbose. Above way is quite simpler :)
        //Basically exist one function inside "then" function, which is very verbose as seen below. 
        //Above sample is quite simpler, where you have "firstForm" as a paremeter receiving the value from 
        //the Cypress "contains" command. Then everything inside Then funcion is JQuery. But you can
        //use WRAP to turns it back to Cypress.
        cy.contains('nb-card', 'Using the Grid').then( function colpsing (firstForm) {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');
        } );

    });

    it('invoke command', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // AS LEARNED SO FAR
        //1 - pure cypress
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address');
        //2 - using JQuery to manipulate the html data and assert it
        cy.get('[for="exampleInputEmail1"]').then( myLabel => {
            expect(myLabel.text()).to.equal('Email address');
        });
        
        //3 - New using invoke. I can grab the TEXT using invoke and save it at my parameter myText and use it
        //1
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( myText => {
            expect(myText).to.equal('Email address');
        });

        //2 - using should or then method 
        //testing is to check that check box was selected
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then( classValue => {
                expect(classValue).to.contain('checked');
            });
    });
    //asserting in properties 
    it('assert property', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then( myImput => {
            cy.wrap(myImput).click();
            cy.get('nb-calendar-day-picker').contains('17').click();
            cy.wrap(myImput).invoke('prop', 'value').should('contain', 'Nov 17, 2022');
        });
    
    });

    it('radio button', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons)
                .first()
                .check({force:true})
                .should('be.checked');
            cy.wrap(radioButtons)
                .eq(1)
                .check({force:true});
            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked');
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled');

        });

    });

    it('check boxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force:true});
        cy.get('[type="checkbox"]').eq(0).click({force:true});


    });

    it('lists and Dropdowns', () => {
        cy.visit('/');

        //1
        // cy.get('nav nb-select').click();
        // cy.get('.options-list').contains('Dark').click();
        // cy.get('nav nb-select').should('contain', 'Dark');
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');
        
        //2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim();

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark" : "rgb(34, 43, 69)",
                    "Cosmic" : "rgb(50, 50, 89)",
                    "Corporate" : "rgb(255, 255, 255)"
                };

                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
                if(index < 3 )
                    cy.wrap(dropdown).click();

            });

        });

    });

    it('Web tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();
        
        // 1 searching in a table and changing value in the same
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
        });
        // 2 adding a new line in a table
        //since there no unique identifier for which row then we are indexing to find the 3rd one to add a new record
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Casparov');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Xadrez');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then( tableColums => {
            cy.wrap(tableColums).eq(2).should('contain', 'Casparov');
            cy.wrap(tableColums).eq(3).should('contain', 'Xadrez');

        });

        // 3 filtering by age
        cy.get('thead [placeholder="Age"]').type('20');
        cy.wait(300); //adding delay because cypress was too fast
        cy.get('tbody tr').each( tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', '20');
        });
           
        // 3 filtering by age using each loop
        const age = [20, 30, 40, 200];
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(300); //adding delay because cypress was too fast
            cy.get('tbody tr').each( tableRow => {
                if (age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found');
                } else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                }
                
            });
        });
    }); 

    //asserting in properties 
    it('assert property using data', () => {
        function selectDayFromCurrent(day){
            let date = new Date();
            date.setDate(date.getDate() + day);
            let futureDay = date.getDate();
            let futureMonth = date.toLocaleString('default',  {month: 'short'});
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();
            console.log('futureDay: '+futureDay);
            console.log('futureMonth: '+futureMonth);

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                console.log('dateAttribute: ' + dateAttribute);
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click();
                    selectDayFromCurrent(day);
                }else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
                }
            });
            return dateAssert;
        }
        
        //test starts here
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then( myImput => {
            cy.wrap(myImput).click();
            let dateAssert = selectDayFromCurrent(40);
            cy.wrap(myImput).invoke('prop', 'value').should('contain', dateAssert);
        });
    
    });

    it('',  () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click();

        cy.get('nb-tooltip').should('contain', 'This is a tooltip');

    });

    it.only('dialog box (browser windows pop up)', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click(); 
        cy.contains('Smart Table').click();

        cy.get('tbody tr').first().find('[class="nb-trash"]').click();
        
        //1 relly on the event 'window:confirm' to be triggered, if not triggered the validation won't be checked
        //Not good approach
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        });

        // 2 - (deleting a record from the table with popup confirmation) it's better because if 'window:confirm' is not called then 'stub' variable will be enpty and lead to an error 
        //when comparing to the expected message
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('[class="nb-trash"]').click().then( ()=> {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        });

        //3 to Cancel when a pop up is called
        cy.get('tbody tr').first().find('[class="nb-trash"]').click();
        cy.on('window:confirm', () => false);


    });

});