import {navigateTo} from "../support/page_objects/navigationPage.js"
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage.js"
import { onDatePickerPage } from "../support/page_objects/datePickerPage.js";
import { onSmartTablePage } from "../support/page_objects/smartTablePage.js";

describe('Test with Page Objects', () => {

    beforeEach('open application', ()=> {
        cy.openHomePage();
    });

    it('verify navigations across the pages', () => {

        navigateTo.formLayoutsPages();
        navigateTo.datePickerPage();
        navigateTo.toastr();
        navigateTo.smartTable();
        navigateTo.tooltip();
 
    });

    it('sould submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPages();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Maria', 'mariaJucelina@gmail.com')
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('terra@test.com', 'test12345')
        navigateTo.datePickerPage();
        onDatePickerPage.selectCommonDatePickerDateFromToday(10)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14);
        navigateTo.smartTable();
        onSmartTablePage.addNewRecordWithFirstAndLastName('Leandro', 'Santos');
        onSmartTablePage.updateAgeByFirstName('Leandro', '90');
        onSmartTablePage.deleteRowByIndex(1);
    });

});