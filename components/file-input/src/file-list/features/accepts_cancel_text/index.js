import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given(
    'a loading FileListItem with onCancel handler and cancelText is rendered',
    () => {
        cy.visitStory('FileListItem', 'Loading with onCancel and cancelText')
    }
)

Then('the cancelText will be visible', () => {
    cy.get('[data-test="dhis2-uicore-filelistitem-cancel"]')
        .contains('Cancel')
        .should('be.visible')
})
