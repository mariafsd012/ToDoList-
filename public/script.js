const entrarHome = document.getElementById('entrarBtn');

if (entrarHome) {

    entrarHome.addEventListener('click', function () {

        window.location.href = 'login.html';
    });
}

const cadastrarBtn = document.getElementById('cadastrar');

if (cadastrarBtn) {

    cadastrarBtn.addEventListener('click', function (event) {

        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        if (nome === '' || email === '' || senha === '') {
            alert('Preencha todos os campos!');
            return;
        }

        // salva usuário
        localStorage.setItem('nomeUsuario', nome);
        localStorage.setItem('emailUsuario', email);
        localStorage.setItem('senhaUsuario', senha);

        alert('Cadastro realizado com sucesso!');

        window.location.href = 'login.html';
    });
}


const entrarBtn = document.getElementById('entrarLogin');

if (entrarBtn) {

    entrarBtn.addEventListener('click', function (event) {

        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        // pega dados salvos
        const emailSalvo = localStorage.getItem('emailUsuario');
        const senhaSalva = localStorage.getItem('senhaUsuario');

        if (email === '' || senha === '') {
            alert('Preencha todos os campos!');
            return;
        }

        // verifica login
        if (email === emailSalvo && senha === senhaSalva) {

            alert('Login realizado com sucesso!');

            window.location.href = 'inicial.html';

        } else {

            alert('Email ou senha incorretos!');
        }
    });
}


const inputTarefa = document.querySelector('.nova-tarefa input');
const botaoAdicionar = document.querySelector('.nova-tarefa button');
const listaTarefas = document.querySelector('.lista-tarefas');

carregarTarefas();

if (botaoAdicionar) {

    botaoAdicionar.addEventListener('click', adicionarTarefa);
}

function adicionarTarefa() {

    const textoTarefa = inputTarefa.value;

    if (textoTarefa === '') {
        alert('Digite uma tarefa!');
        return;
    }

    criarTarefa(textoTarefa, false);

    inputTarefa.value = '';

    salvarTarefas();
}

function criarTarefa(textoTarefa, concluida) {

    const tarefa = document.createElement('div');

    tarefa.classList.add('tarefa');

    tarefa.innerHTML = `
        <input type="checkbox" class="check-tarefa">

        <span>${textoTarefa}</span>

        <button class="btn-remover">
            ❌
        </button>
    `;

    listaTarefas.appendChild(tarefa);

    const checkbox = tarefa.querySelector('.check-tarefa');
    const texto = tarefa.querySelector('span');

    checkbox.checked = concluida;

    if (concluida) {
        texto.style.textDecoration = 'line-through';
        texto.style.opacity = '0.6';
    }

    checkbox.addEventListener('change', function () {

        if (checkbox.checked) {

            texto.style.textDecoration = 'line-through';
            texto.style.opacity = '0.6';

        } else {

            texto.style.textDecoration = 'none';
            texto.style.opacity = '1';
        }

        salvarTarefas();
    });

    const btnRemover = tarefa.querySelector('.btn-remover');

    btnRemover.addEventListener('click', function () {

        tarefa.remove();

        salvarTarefas();
    });
}

function salvarTarefas() {

    const tarefas = [];

    const lista = document.querySelectorAll('.tarefa');

    lista.forEach(function (tarefa) {

        const texto = tarefa.querySelector('span').innerText;

        const concluida = tarefa.querySelector('input').checked;

        tarefas.push({
            texto: texto,
            concluida: concluida
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasSalvas.forEach(function (tarefa) {

        criarTarefa(tarefa.texto, tarefa.concluida);
    });
}