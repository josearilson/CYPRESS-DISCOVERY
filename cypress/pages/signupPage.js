// classes são definidas em PastalCase e funções e variáveis são feitas em camelCase
class SignupPage {
    go (){
        cy.visit('/')
        cy.get('a[href="/deliver"]').click()

        //checkpoint validando pagina /deliver e também validar texto
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
        cy.get('input[name="fullName"]').type(deliver.nome)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.endereco.numero)
        cy.get('input[name="address-details"]').type(deliver.endereco.complemento)

        //validar automcomplete do texto
        cy.get('input[name="address"]').should('have.value', deliver.endereco.rua)
        cy.get('input[name="district"]').should('have.value', deliver.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', deliver.endereco.cidade_UF)

        cy.contains('.delivery-method li', deliver.metodo_entrega).click()
        cy.get('input[accept^="image"]').attachFile('/images/'+ deliver.cnh)
        //upload de imagem. Devem estar em .jpg (massa de dados em fixtures)
    }
    submit(){
        cy.get('form button[type="submit"]').click()
    }
    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }
    alertMessageShouldBe(alertMessage){
        cy.get('.alert-error').should('have.text', alertMessage)
    }
    massAlertShouldBe(expectedMessage){  
        //localiza element que contem a classe alert-error combinada com o texto e verifica se está visivel
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

//exportar para que seja possivel importar em outro arquivo.
export default SignupPage;