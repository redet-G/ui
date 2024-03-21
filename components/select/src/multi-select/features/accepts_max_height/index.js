require('../common/index.js')
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('a MultiSelect with more than ten options is rendered', () => {
    cy.visitStory('MultiSelect', 'With more than ten options')
})

Given(
    'a MultiSelect with more than three options and a 100px max-height is rendered',
    () => {
        cy.visitStory(
            'MultiSelect',
            'With more than three options and a 100px max-height'
        )
    }
)

Then('has the default max-height', () => {
    cy.get('[data-test="dhis2-uicore-select-menu-menuwrapper"]').should(
        'have.css',
        'max-height',
        '280px'
    )
})

Then('has a max-height of 100px', () => {
    cy.get('[data-test="dhis2-uicore-select-menu-menuwrapper"]').should(
        'have.css',
        'max-height',
        '100px'
    )
})
