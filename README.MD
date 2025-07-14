# Backend da Wishlist

<p align="center">
  <img src="assets/OIP.webp" alt="Wishlist" />
</p>

## Visão Geral

O **Wishlist Backend** é um serviço dedicado à gestão de listas de desejos, permitindo que usuários consultem, adicionem ou removam itens de suas listas. Ele foi desenvolvido para integração direta com uma camada BFF (Backend for Frontend), garantindo entrega otimizada de dados para aplicações frontend.

---

## Funcionalidades

- **Gerenciamento de Wishlist**: criar, excluir e listar itens na lista de desejos.
- **Integração com BFF**: entrega de dados otimizada para aplicações frontend.

---

## Tecnologias Utilizadas

- **Framework Backend**: Node.js com NestJS
- **Banco de Dados**: MongoDB
- **API**: REST
- **GraphQL**: Implementação opcional para consultas avançadas
- **Integração**: Comunicação direta com a camada BFF

---

## Como Iniciar o Projeto

Existem duas formas de instalar a aplicação


1. **Docker**: Utilize o Docker para subir a aplicação e o banco de dados MongoDB.

A aplicação utiliza um arquivo `docker-compose.yml` para subir os serviços necessários (NestJS + MongoDB). Execute os seguintes comandos no terminal para iniciar o ambiente:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```



2. **Instalação Local**: Clone o repositório e instale as dependências.
É necessário que se tenha nodejs, npm e mongodb(portal padrão) instalados na máquina.

### Instalando as dependências:
Entre nas pastas

wishlist-rest-service e wishlist-rest-bff e execute o seguinte comando:
```bash
npm install
```
Logo em seguida inicie o servidor NestJS nas respectivas pastas:
```bash
npm run dev
```

depois execute o comando abaixo para subir o servidor http mock do json server

```bash
npx json-server --watch db.json --port 3000
```

 
## Integração com o BFF

O Wishlist Backend foi projetado para funcionar em conjunto com um BFF (Backend for Frontend), que atua como intermediário entre o frontend e os serviços backend. Essa arquitetura permite adaptar a entrega de dados às necessidades da interface, garantindo melhor desempenho e organização.

## Implementação

A estrutura da aplicação segue boas práticas modernas:

- **Injeção de Dependência (DI)**: gerenciamento de serviços desacoplado.
- **DTOs (Data Transfer Objects)**: estruturação e validação de dados.
- **Pipes**: transformação e validação das entradas.
- **Guards**: controle de acesso aos endpoints.
- **Autenticação com JWT**: proteção de rotas por meio de tokens.
- **Swagger**: documentação automática da API.
- **json-server**: simulação de APIs externas em ambiente de testes.


Para mocks de chamadas http foi utilizado o json-server, que simula o comportamento do backend para as entidades não gerenciadas
___
# REST BFF

## Como utilizar
A documentação Swagger está disponível em (Após iniciar o docker): `http://localhost:3002/swagger-ui`

## API Endpoints 
Para reproduzir o uso da aplicação é necessário os seguintes passos:

## Autenticação via Swagger

### 1. Obter token
Execute o endpoint:
Endpoint exemplo: `GET http://localhost:3002/authentication/get-token`
![img.png](assets/img.png)
Clique em **"Execute"** e copie o token gerado.


### 2. Autorizar o token
Clique no botão **"Authorize"** no topo da interface Swagger.

![img_1.png](assets/img_1.png)


Cole o token e confirme. Agora todos os endpoints estarão autenticados e prontos para uso.

![img_2.png](assets/img_2.png)

## Endpoints Disponíveis 

- `GET /wishlist/items`: retorna a wishlist do usuário autenticado.
- `POST /wishlist/items`: adiciona um item à wishlist.
- `DELETE /wishlist/items/:id`: remove um item da wishlist.
- `GET /wishlist/items/:id`: verifica se um item está presente na wishlist.
___
# GraphQL BFF

## Como utilizar
Para utilizar o GraphQL BFF, acesse a interface GraphQL Playground em `http://localhost:3002/graphql`.

## API Endpoints
Para reproduzir o uso da aplicação é necessário os seguintes passos:

## Autenticação via GraphQL

### 1. Obter token
para obter o token é necessário executar a mutação:

```graphql
mutation {
  generateToken
}
```
Resultado esperado
```json
{
  "data": {
    "generateToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc1MjQ1MDAzMSwiZXhwIjoxNzUzMDU0ODMxfQ.MNY0ExFN7YS2Iu3NV8zo1yiEMQZcRZ-Pzm_peMIncMA"
  }
}
```


### 2. Autorizar o token

A cada chamada necessitamos utilzar o token gerado.
como http header
```graphql
--Headers
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc1MjQ1MDAzMSwiZXhwIjoxNzUzMDU0ODMxfQ.MNY0ExFN7YS2Iu3NV8zo1yiEMQZcRZ-Pzm_peMIncMA"
}
```

### Operações Disponíveis
- `query getWishlist`: retorna a wishlist do usuário autenticado.
```graphql
query {
  wishlistProducts {
    id
    name
    price
    category
    addAt
  }
}
```

Resultado esperado: 
```json
{
  "data": {
    "wishlistProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "price": 100,
        "category": "Categoria A",
        "addAt": "2023-10-01T00:00:00.000Z"
      },
      ...
    ]
  }
}
```

- `mutation addProductToWishlist($productId: Int!)`: adiciona um item à wishlist.
```graphql
mutation {
  addProductToWishlist(input: { id: "20" }) {
    added
    message
  }
}
```
Resultado esperado:
```json
{
  "data": {
    "addProductToWishlist": {
      "added": true,
      "message": "Produto adicionado com sucesso"
    }
  }
}
```

- `mutation removeProductFromWishlist($productId: Int!)`: remove um item da wishlist.
```graphql
mutation {
  removeProductFromWishlist(input: { id: "20" }) {
    removed
    message
  }
}
```

Resultado esperado:
```json
{
  "data": {
    "removeProductFromWishlist": {
      "removed": true,
      "message": "Produto removido com sucesso"
    }
  }
}
```

- query checkProductInWishlist($productId: Int!): verifica se um item está presente na wishlist.
```graphql
query {
  checkProductInWishlist(input: { id: "20" }) 
}
```
Resultado esperado:
```json
{
  "data": {
    "checkProductInWishlist": true
  }
}
```

---
# Preset de Dados para Testes

- Um usuário com `userId: "2"` é pré-configurado com uma wishlist de **19 itens**.
- Essa lista é criada automaticamente sempre que o container é iniciado.
- Os produtos válidos têm IDs de `1` a `30`.
- Você pode adicionar ou remover itens da lista a qualquer momento.
- O token gerado na autenticação é do usuário com `id: "2"`.


## Informações Adicionais

- Visando exploração maior do framework, a autenticação foi implementada com JWT, mas não há controle de acesso real.
- Para simplificação do código, os use-cases foram anotados com `@Injectable` e disponibilizada como um provider do NestJS, evitando a criação de uma camada de injeção de serviços separada.
- Os endpoints funcionam de forma **independente**, não exigem chamadas em ordem.
- Se um produto já está presente na wishlist, o backend **não retorna erro**, apenas ajusta o **status code** adequadamente.
- Erros reais só ocorrem em casos de **falha externa**, como indisponibilidade de serviços HTTP simulados.
- Arquivos .env e docker compose com environmets comitados são propositais para o teste da aplicação.


## Próximos Passos

- 🔃 **Criar mappers para transformaçao**: Gerar mappers de DTOs em entidades e vice-versa.   
- 🔧 **Padronizar mensagens de erro**: melhorar clareza e debuggabilidade.
- 🧪 **Adicionar testes unitários**: garantir estabilidade e qualidade do código.
- 💡 **Melhorar Observabilidade e resiliencia** Adicionar retry policies, caching, logging, tracing e circuit breakers, para melhorar a experiencia do consumo da aplicação, reduzindo o downtime .
- 🔗 **Aprimorar segregação**: Alguns DTOs e serviços podem ser mais segregados, porem a ideia foi mostrar o macro do uso da arquitetura limpa