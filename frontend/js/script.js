const API_URL = 'http://localhost:3000/api';
if (localStorage.getItem('autenticado') !== 'true') window.location.href = 'login.html';

function logout() { localStorage.removeItem('autenticado'); window.location.href = 'login.html'; }

document.addEventListener('DOMContentLoaded', () => carregarProdutos());

async function carregarProdutos() {
    try {
        const res = await fetch(`${API_URL}/produtos`);
        renderizarTabela(await res.json());
    } catch (e) { mostrarMensagem('formMsg', 'Erro de conexão.', 'erro'); }
}

function renderizarTabela(produtos) {
    const tbody = document.querySelector('#produtosTable tbody');
    tbody.innerHTML = '';
    produtos.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>#${p.id}</td>
            <td>${p.nome}</td>
            <td>R$ ${p.precoBase.toFixed(2)}</td>
            <td>
                <button class="btn-info" onclick="abrirModalConversao(${p.id}, '${p.nome}')">Converter</button>
                <button class="btn-secondary" onclick="editarProduto(${p.id}, '${p.nome}', ${p.precoBase})">Editar</button>
                <button class="btn-danger" onclick="excluirProduto(${p.id})">Excluir</button>
            </td>
        </tr>`;
    });
}

document.getElementById('produtoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('produtoId').value;
    const body = JSON.stringify({ nome: document.getElementById('nome').value, precoBase: document.getElementById('precoBase').value });
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/produtos/${id}` : `${API_URL}/produtos`;
    
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
    limparFormulario(); carregarProdutos();
});

function editarProduto(id, nome, preco) {
    document.getElementById('produtoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('precoBase').value = preco;
}

async function excluirProduto(id) {
    if (confirm('Excluir?')) {
        await fetch(`${API_URL}/produtos/${id}`, { method: 'DELETE' });
        carregarProdutos();
    }
}

function limparFormulario() { document.getElementById('produtoForm').reset(); document.getElementById('produtoId').value = ''; }

function mostrarMensagem(id, msg, tipo) {
    const el = document.getElementById(id);
    el.innerText = msg; el.className = `msg-box msg-${tipo}`;
    setTimeout(() => el.style.display = 'none', 3000);
}

function abrirModalConversao(id, nome) {
    document.getElementById('modalProdutoId').value = id;
    document.getElementById('produtoSelecionadoNome').innerText = nome;
    document.getElementById('modalConversao').style.display = 'flex';
}
function fecharModal() { document.getElementById('modalConversao').style.display = 'none'; }

async function realizarConversao() {
    const btn = document.querySelector('.modal-content .btn-primary');
    btn.innerText = 'Calculando...'; btn.disabled = true;
    try {
        const res = await fetch(`${API_URL}/converter`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idProduto: document.getElementById('modalProdutoId').value, moeda: document.getElementById('moedaSelect').value })
        });
        const data = await res.json();
        document.getElementById('resBase').innerText = `R$ ${data.precoBaseBRL.toFixed(2)}`;
        document.getElementById('resLucro').innerText = `R$ ${data.precoComLucroBRL.toFixed(2)}`;
        document.getElementById('resMoeda').innerText = data.moedaAlvo;
        document.getElementById('resTaxa').innerText = data.taxaAplicada.toFixed(4);
        document.getElementById('resFinal').innerText = `${data.moedaAlvo} ${data.precoFinalConvertido}`;
        document.getElementById('resultadoConversao').style.display = 'block';
    } finally { btn.innerText = 'Calcular'; btn.disabled = false; }
}
