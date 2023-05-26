import SignupPage from '../pages/signupPage';
//importando a classe SignupPage do aquivo signupPage na pasta pages;
import signupFactory from '../factores/signupFactory';

describe('Cadatro', () => {

    //instanciar Globalmente SignupPage na variavel signup para todos os cenários
    var signup = new SignupPage();

    // beforeEach(function () {
        // ========== comentado pois estamos usando pacote faker para gerar dados ======
    //     cy.fixture('deliver').then((d) => {
    //         //d é a abreviação de deliver (pode ser qlqr coisa)
    //         this.deliver = d;

    //     })
    // })

    it('Usuário deve tornar-se um entregador', function () {
        //instanciar localmente SignupPage na variavel signup
        //var signup = new SignupPage();

        var deliver = signupFactory.deliver();
        signup.go();
        signup.fillForm(deliver);
        signup.submit();

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage);

    })

    it('Usuário informa CPF incorreto', function () {
        var deliver = signupFactory.deliver();
        deliver.cpf = '000000141aa '

        signup.go();
        signup.fillForm(deliver);
        signup.submit();

        const alertMessage = 'Oops! CPF inválido'
        signup.alertMessageShouldBe(alertMessage);

    })

    it('Usuário informa email incorreto', function () {
        var deliver = signupFactory.deliver();
        deliver.email = 'user.com.br'

        signup.go();
        signup.fillForm(deliver);
        signup.submit();

        const alertMessage = 'Oops! Email com formato inválido.'
        signup.alertMessageShouldBe(alertMessage);

    })

    context('Campos obrigatórios',function(){
        //contexto para test case de validação de campos obrigatórios
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'cep', output: 'É necessário informar o CEP'},
            {field: 'numero', output: 'É necessário informar o número do endereço'},
            {field: 'metodo', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signup.go();
            signup.submit();
        })

        messages.forEach(function(msg){
            it(`${msg.field} é obrigatório`, function(){
                signup.massAlertShouldBe(msg.output)
            })
        })
    })
})