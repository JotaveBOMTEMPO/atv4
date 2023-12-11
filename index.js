import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta_P = 3000;
const host__ = '0.0.0.0';
const LISTAP = [];

function analisa_cadastro(req, res) {
    const dados_u = req.body;

    let cont_resp = '';

    if (!(dados_u.nomeFIRST && dados_u.nomeSECOND && dados_u.nomeUSU && dados_u.em && dados_u.num)) {
        cont_resp = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="style.css">
            <title>Cadastro</title>
        </head>
        <body>
            <div id="caixa">
                <form action="/formulario.html" method="POST">
        
                    <h3>CADASTRO</h3>
                    <label class="rotul" for="nomeFIRST">Nome:</label>
                    <input type="text" id="nomeFIRST" name="nomeFIRST" placeholder="Insira seu nome" value="${dados_u.nomeFIRST}" required>
        `;
        if (!dados_u.nomeFIRST) {
            cont_resp += `
                    <p class="rockDanger">O campo Nome é obrigatório</p>
            `;
        }

        cont_resp += `
                    <label class="rotul" for="nomeSECOND">Sobrenome:</label>
                        <input type="text" id="nomeSECOND" name="nomeSECOND" placeholder="Insira seu sobrenome" value="${dados_u.nomeSECOND}" required>
        `;
        if (!dados_u.nomeSECOND) {
            cont_resp += `
                    <p class="rockDanger">O campo Sobrenome é obrigatório</p>
            `;
        }
        
        cont_resp += `
                    <label class="rotul" for="nomeUSU">Nome de Usuário:</label>
                        <input type="text" id="nomeUSU" name="nomeUSU" placeholder="Insira seu nome de usuário" value="${dados_u.nomeUSU}" required>
        `;   
        if (!dados_u.nomeUSU) {
            cont_resp += `
                    <p class="rockDanger">O campo Nome de Usuário é obrigatório</p>
            `;
        }
        
        cont_resp += `
                    <label class="rotul" for="em">Email:</label>
                        <input type="email" id="em" name="em" placeholder="Insira seu email" value="${dados_u.em}" required>
        `;   
        if (!dados_u.em) {
            cont_resp += `
                    <p class="rockDanger">O campo Email é obrigatório</p>
            `;
        }
        
        cont_resp += `
                    <label class="rotul" for="num">Número de Celular:</label>
                        <input type="text" id="num" name="num" placeholder="Insira seu número" value="${dados_u.num}" required>
        `;   
        if (!dados_u.num) {
            cont_resp += `
                    <p class="rockDanger">O campo Número de Celular é obrigatório</p>
            `;
        }  

        cont_resp += `
                    <br>
                    <button id="BotCad" type="submit">Cadastrar</button>
    
                </form>
            </div>
        </body>
        </html>
        `;
        
        res.end(cont_resp);

    } else {
        const usu = {
            nome: dados_u.nomeFIRST,
            sobrenome: dados_u.nomeSECOND,
            nomeUSUARIO: dados_u.nomeUSU,
            email: dados_u.em,
            celular: dados_u.num,
        }

        LISTAP.push(usu);

        cont_resp = `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <title>Cadastro de Usuário</title>
        </head>
        <body>
            <h1>Usuários Cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Email</th>
                        <th>Celular</th>
                    </tr>
                </thead>
                <tbody>`;
        
        for (const USER of LISTAP) {
            cont_resp += `
                <tr>
                    <td>${USER.nome}</td>
                    <td>${USER.sobrenome}</td>
                    <td>${USER.nomeUSUARIO}</td>
                    <td>${USER.email}</td>
                    <td>${USER.celular}</td>
                </tr>
                    `;
        }

        cont_resp += `
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
            <a class="btn btn-outline-info" href="/formulario.html" role="button">Acessar Cadastro</a>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>    
            </body>
            </html>
                `;

        res.end(cont_resp);

    }
}

function process_autentic(req, res, next) {
    if (req.session.user_autentic) {
        next();
    } else {
        res.redirect("/menu.html");
    }
}

const app = express();
app.use(cookieParser());

app.use(session({
    secret: "myS3CR3T",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15,
    }
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), './PROGRAMACAO PARA INTERNET')));

app.get('/', process_autentic, (req, res) => {
    const dataUltimoAcesso = req.cookies.DataUltimoAcesso;
    const data = new Date();
    res.cookie("dataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    res.sendFile(path.join(process.cwd(), './PROGRAMACAO PARA INTERNET/menu.html'));
});

app.get('/formulario.html', process_autentic, (req, res) => {
    res.sendFile(path.join(process.cwd(), './PROGRAMACAO PARA INTERNET/formulario.html'));
});

app.post('/formulario.html', process_autentic, analisa_cadastro);

app.post('/menu', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    console.log("Usuario:", usuario, "Senha:", senha);

    if (usuario && senha && usuario === 'Joao' && senha === '2302') {
        req.session.user_autentic = true;
        res.redirect('/');
    } else {
        console.log("Login falhou. Usuário ou senha incorretos.");
        res.end(`
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha no login</title>
                </head>
                <body>
                    <h1>Usuario ou senha invalidos</h1>
                    <a href="/menu.html">Voltar ao Menu</a>
                </body> 
        `)
    }
});

app.listen(porta_P, host__, () => {
    console.log(`Servidor rodando na url http://localhost__:3000`);
});
