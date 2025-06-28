import 'cypress-file-upload'

export class HomePage {

    homePageElements = {
        createPostButton: ()=> cy.get('[data-cy="createPostBtn"]'),
        bellIconButton: ()=> cy.get('data-cy="bellNotificationBtn"'),
        watchListButton: ()=> cy.get('[data-cy="watchlistBtn"]'),
        createQueryButton: ()=> cy.get('[data-cy="createQueryBtn"]'),
        createDiscussionButton: ()=> cy.get('[data-cy="startADiscussionBtn"]')
    }

    postModalElements = {
        fundamentalClubOption: ()=> cy.get('[data-cy="clubBtn-f14687af-12be-4c77-8da0-23185b181fd6"]'),
        technicalClubOption: ()=> cy.get('[data-cy="clubBtn-b56c7e0f-a652-4980-a376-7b2955624522"]'),
        learnToTradeClubOption: ()=> cy.get('[data-cy="clubBtn-ddc957c4-7c3d-46e4-9a15-acfedcf83cea"]'),
        queryModalImageButton: ()=> cy.get('[data-cy="selectImageBtn"]'),
        discussionModalFileInput: ()=> cy.get('[accept=".pdf"]'),
        discussionModalFileButton: ()=> cy.get('[data-cy="addAttachmentBtn"]'),
        textArea: ()=> cy.get('textarea'),
        postQueryButton: ()=> cy.contains('[data-cy="createQueryBtn"]','Post'),
        postDiscussionButton: ()=>cy.contains('[data-cy="createPostBtn"]','Post')
    }

    createQueryWithImageAttachment (queryText:any){
        this.homePageElements.createPostButton().click()
        this.homePageElements.createDiscussionButton().click()
        this.postModalElements.textArea().clear()
        this.postModalElements.textArea().type(queryText)
        this.postModalElements.discussionModalFileInput().attachFile('../resources/sample.pdf',{force:true})
        this.postModalElements.postDiscussionButton().click()
    }
}