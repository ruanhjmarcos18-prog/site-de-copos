# Back-office - Exportação de Copos

Sistema completo para gerenciamento de produtos (copos de vidro) e conversão de preços para exportação, com aplicação automática de 100% de lucro.

## Requisitos
- Node.js (versão 18 ou superior, pois utiliza Fetch API nativa)

## Como instalar as dependências
1. Abra o terminal na pasta raiz do projeto.
2. Execute o comando:
   `npm install`

## Como iniciar o servidor
No mesmo terminal, execute:
`npm start`

O servidor será iniciado na porta 3000.

## Como acessar o sistema
Abra o seu navegador e acesse:
http://localhost:3000

## Como testar e utilizar
1. **Login:** Utilize qualquer e-mail e senha (é uma simulação didática de front-end).
2. **Dashboard:** 
   - Visualize os produtos cadastrados automaticamente (SQLite memory/file).
   - Use o formulário lateral para **Cadastrar** novos produtos.
   - Use os botões de ação na tabela para **Editar** ou **Excluir**.
   - Clique em **Converter** para selecionar um país (Moeda), aplicar os 100% de lucro e ver o preço final na moeda estrangeira. A conversão consome uma API de câmbio real e gratuita.
