const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");
const aFormCad = document.getElementById("aLogCadastro");
const urlAPI = "https://api.nicolasvaladares.pro/Estrelas/Usuarios/";

document.addEventListener('DOMContentLoaded', async () => {
    const salvo = localStorage.getItem("sessaoAtiva");
    if (!salvo) return;

    try {
        const usuario = JSON.parse(salvo);
        const resultado = await EfetivarLogin(usuario.Email, usuario.Senha);

        if (resultado) {
            window.location.href = "pagPrincipal.html";
        } else {
            localStorage.removeItem("sessaoAtiva");
        }
    } catch (erro) {
        console.error("Não foi possível restaurar a sessão:", erro);
    }
});

function LogarCadastrar() {
    formCadastro.classList.toggle("escondido");
    formLogin.classList.toggle("escondido");

    if (formCadastro.classList.contains("escondido")) {
        aFormCad.innerHTML = "Não tem uma conta? Cadastre-se!";
    }
    else if (formLogin.classList.contains("escondido")) {
        aFormCad.innerHTML = "Já tem uma conta? Faça o login!";
    }
}

async function Cadastrar() {
    const nome = document.getElementById("inpNomeCadastro").value;
    const email = document.getElementById("inpEmailCadastro").value.trim().toLowerCase();
    const senha = document.getElementById("inpSenhaCadastro").value;
    const confirmar = document.getElementById("inpConfSenhaCadastro").value;

    if (!nome || !email || !senha || !confirmar) {
        window.alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmar) {
        window.alert("As senhas não são iguais!");
        return;
    }

    try {

        if (await EfetivarCadastro(nome, email, senha)) {
            window.alert(`${nome} Cadastrado com êxito!`);
        }
        else {
            window.error("Falha ao cadastrar. Procure o administrador")
        }
    }
    catch (erro) {
        console.error("Não foi possível conectar à API:", erro);
        window.alert("Não foi possível conectar à API.");
    }

    document.getElementById("inpEmail").value = email;
    document.getElementById("phase1").checked = true;
}

async function Logar() {
    const email = document.getElementById("inpEmail").value.trim().toLowerCase();
    const senha = document.getElementById("inpSenha").value;
    const lembrar = document.getElementById("LembrarCheck").checked;

    try {
        const resultado = await EfetivarLogin(email, senha);

        if (resultado) {
            if (lembrar) {
                localStorage.setItem("sessaoAtiva", JSON.stringify({ Email: email, Senha: senha }));
            }
            
            localStorage.setItem("emailUsuario", email);
            console.log(`${email} logou.`);
            window.location.href = "pagPrincipal.html";
        }
    }
    catch (erro) {
        console.error("Não foi possível conectar à API:", erro);
        window.alert("Não foi possível conectar à API");
    }
}

async function EfetivarCadastro(nome, email, senha) {
    const resposta = await fetch(
        `${urlAPI}Cadastro`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                Nome: nome,
                Email: email,
                senha: senha
            })
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        console.error(resultado);
        window.alert(resultado);
        return false;
    }

    console.log(resultado.mensagem);
    window.alert(resultado.mensagem);
    return true;
}

async function EfetivarLogin(email, senha) {
    const resposta = await fetch(
        `${urlAPI}Login`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(
            {
                Email: email,
                Senha: senha
            }
        )
    }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        console.error(resultado);
        window.alert(resultado);
        return false;
    }

    return true;
}