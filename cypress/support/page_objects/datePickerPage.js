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
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
        }
    });
    return dateAssert;
}

export class DatePickerPage{

    selectCommonDatePickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( myInput => {
            cy.wrap(myInput).click();
            let dateAssert = selectDayFromCurrent(dayFromToday);
            cy.wrap(myInput).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(myInput).should('have.value', dateAssert);
        });


    }

    selectDatePickerWithRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( myInput => {
            cy.wrap(myInput).click();
            let dateAssertFirst = selectDayFromCurrent(firstDay);
            let dateAssertSecond = selectDayFromCurrent(secondDay);
            const finalDate = dateAssertFirst+' - '+dateAssertSecond;
            cy.wrap(myInput).invoke('prop', 'value').should('contain', finalDate);
            cy.wrap(myInput).should('have.value', finalDate);
        });

    }




}

export const onDatePickerPage = new DatePickerPage();