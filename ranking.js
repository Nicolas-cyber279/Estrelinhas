const urlAPI = "https://api.nicolasvaladares.pro/Estrelas/Usuarios/";

document.addEventListener("DOMContentLoaded", carregarRanking);

async function carregarRanking() {
    const area = document.getElementById("ranking");
    area.textContent = "Carregando ranking...";

    try {
        const resposta = await fetch(`${urlAPI}Ranking`);

        if (!resposta.ok) {
            throw new Error(`A API respondeu com status ${resposta.status}`);
        }

        const usuarios = await resposta.json();
        const titulo = document.createElement("h1");
        titulo.textContent = "Ranking de estrelinhas";

        if (!usuarios.length) {
            area.replaceChildren(titulo, document.createTextNode("Ainda não há participantes."));
            return;
        }

        const tabela = document.createElement("table");
        const cabecalho = document.createElement("thead");
        const linhaCabecalho = document.createElement("tr");

        for (const texto of ["Posição", "Participante", "Estrelinhas ⭐"]) {
            const celula = document.createElement("th");
            celula.scope = "col";
            celula.textContent = texto;
            linhaCabecalho.append(celula);
        }

        cabecalho.append(linhaCabecalho);
        tabela.append(cabecalho);

        const corpo = document.createElement("tbody");

        usuarios.forEach((usuario, indice) => {
            const linha = document.createElement("tr");
            const posicao = document.createElement("td");
            const nome = document.createElement("td");
            const estrelas = document.createElement("td");

            posicao.textContent = `${indice + 1}º`;
            nome.textContent = usuario.nome ?? "Participante";
            estrelas.textContent =
                `${Number(usuario.estrelinhas ?? 0).toLocaleString("pt-BR")}`;

            linha.append(posicao, nome, estrelas);
            corpo.append(linha);
        });

        tabela.append(corpo);
        area.replaceChildren(titulo, tabela);
    } catch (erro) {
        console.error("Não foi possível carregar o ranking:", erro);
        area.textContent = "Não foi possível carregar o ranking. Tente novamente.";
    }
}


function Reuniao() {
    window.location.href = "https://meet.google.com/tzd-myfi-awq";
}