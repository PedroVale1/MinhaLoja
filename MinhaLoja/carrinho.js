const resultadoCarrinho = document.querySelector("#resultadoCarrinho");
const voltarProdutos = document.querySelector("#voltarProdutos");

// Função para exibir o carrinho
function exibirCarrinho() {
    try {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        while (resultadoCarrinho.firstChild) {
            resultadoCarrinho.removeChild(resultadoCarrinho.firstChild);
        }

        if (carrinho.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "O carrinho está vazio.";
            resultadoCarrinho.appendChild(mensagem);
            return;
        }

        for (const produto of carrinho) {
            const card = document.createElement("div");
            card.className = "card";

            const imagem = document.createElement("img");
            imagem.src = produto.image;
            imagem.className = "imagem";

            const titulo = document.createElement("h2");
            titulo.textContent = produto.title;
            titulo.className = "titulo";

            const descricao = document.createElement("p");
            descricao.textContent = produto.description;
            descricao.className = "descricao";

            const preco = document.createElement("p");
            preco.textContent = `Price: ${produto.price}`;
            preco.className = "preco";

            const categoria = document.createElement("p");
            categoria.textContent = `Category: ${produto.category}`;
            categoria.className = "categoria";

            const id = document.createElement("p");
            id.textContent = `ID: ${produto.id}`;
            id.className = "id";

            const quantidade = document.createElement("p");
            quantidade.textContent = `Quantidade: ${produto.quantidade}`;
            quantidade.className = "quantidade";

            // Adiciona o botão de remover
            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.className = "remove-button";
            botaoRemover.addEventListener('click', () => removerDoCarrinho(produto.id));

            card.append(imagem, titulo, descricao, preco, categoria, id, quantidade, botaoRemover);
            resultadoCarrinho.appendChild(card);
        }

        // Rolagem suave até a seção do carrinho
        resultadoCarrinho.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Erro ao exibir o carrinho:', error);
    }
}

// Função para remover um item do carrinho
function removerDoCarrinho(id) {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
    atualizarContadorCarrinho();
}

// Adicionar o evento de clique ao botão de voltar para produtos
voltarProdutos.addEventListener('click', () => {
    window.location.href = '../index.html'; // Redireciona para a página principal
});

// Carregar o carrinho ao carregar a página
exibirCarrinho();
