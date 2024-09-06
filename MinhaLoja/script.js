const resultado = document.querySelector("#resultado");
const iconeCarrinho = document.querySelector("#iconeCarrinho");
const contadorCarrinho = document.querySelector("#contadorCarrinho");
const modal = document.querySelector("#modal");
const modalTitulo = document.querySelector("#modalTitulo");
const modalDescricao = document.querySelector("#modalDescricao");
const modalPreco = document.querySelector("#modalPreco");
const modalImagem = document.querySelector("#modalImagem");
const closeModal = document.querySelector(".close");

// Função para adicionar um produto ao carrinho
async function adicionarAoCarrinho(produtoId) {
    try {
        const resposta = await fetch(`https://fakestoreapi.com/products/${produtoId}`);
        const produto = await resposta.json();
        
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoExistente = carrinho.find(item => item.id === produto.id);

        if (produtoExistente) {
            produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
        } else {
            produto.quantidade = 1;
            carrinho.push(produto);
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        alert('Produto adicionado ao carrinho!');
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    }
}

// Função para atualizar o contador de itens no carrinho
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;
}

// Função para buscar e exibir itens na página principal
async function buscarItensCarrinho() {
    try {
        const resposta = await fetch("https://fakestoreapi.com/products");
        const dados = await resposta.json();

        dados.forEach((element) => {
            const card = document.createElement("div");
            card.className = "card";
            card.dataset.id = element.id; // Adiciona ID ao card para referência futura

            // Adiciona título acima da imagem
            const titulo = document.createElement("h2");
            titulo.textContent = element.title;
            titulo.className = "titulo";

            const imagem = document.createElement("img");
            imagem.src = element.image;
            imagem.className = "imagem";

            const preco = document.createElement("p");
            preco.textContent = `Price: ${element.price}`;
            preco.className = "price";

            // Adicionar botão de adicionar ao carrinho
            const botaoAdicionar = document.createElement("button");
            botaoAdicionar.textContent = "Adicionar ao Carrinho";
            botaoAdicionar.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que o clique no botão abra o modal
                adicionarAoCarrinho(element.id);
            });

            // Adiciona evento de clique ao card para mostrar detalhes
            card.addEventListener('click', () => mostrarDetalhesProduto(element));

            // Adicionando os elementos ao card
            card.append(titulo, imagem, preco, botaoAdicionar);

            // Adicionando o card ao resultado
            resultado.appendChild(card);
        });

        atualizarContadorCarrinho();
    } catch (error) {
        console.log(error);
        resultado.textContent = "Erro ao consumir a API. Por favor, cheque a URL.";
    }
}

// Função para exibir os detalhes do produto no modal
function mostrarDetalhesProduto(produto) {
    modalImagem.src = produto.image;
    modalTitulo.textContent = produto.title;
    modalDescricao.textContent = produto.description;
    modalPreco.textContent = `Price: ${produto.price}`;
    modal.style.display = "block";
}

// Função para fechar o modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Fecha o modal quando clica fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Adicionar o evento de clique ao ícone do carrinho
iconeCarrinho.addEventListener('click', () => {
    window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
});

// Carregar os produtos ao carregar a página
buscarItensCarrinho();
