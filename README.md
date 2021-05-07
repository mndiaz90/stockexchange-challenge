## Challenge
Criar uma página que apresente graficamente os balanços das empresas listadas na bolsa americana. Para isso você vai precisar:

 -Montar uma tabela com o código da empresa na bolsa, o nome da empresa e a cotação atual. Essas informações podem ser obtidas nessa API
 -Quando o usuário selecionar uma empresa na lista acima, devem ser apresentados em forma de gráfico alguns dados sobre os balanços da empresa. Os dados podem ser obtidos através dessa API e são os seguintes:
 Receita
 Crescimento da receita
 Despesas operacionais
 Margem EBITDA
 EBITDA
 Renda Consolidada
 -Deve ser possível comparar balanço de duas ou mais empresas.

## Observações
- Devido a mudanças na API, Crescimento da receita e Renda consolidada não existem mais e foram utilizadas outras informações.
Receita e Crescimento da receita foi sustituido por GrossProfit e GrossProfitRatio.

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### **Passos para rodar o projeto local**

- Clonar o projeto executando na consola o comando: 
```
 git clone git@github.com:mndiaz90/stockexchange-challenge.git
```
- Entrar na pasta do projeto: 
```
 cd stockexchange-challenge
```
- Instalar as dependencias executando na consola o comando: 
```
 npm install
```
- Criar uma ApiKey no site https://financialmodelingprep.com/developer/docs/ e botar o valor na variável existente no arquivo src/services/api.js

- Para finalizar executar o comando:
```
 npm run dev
```
### **Para ver o projeto online pode accessar no site**
- Lembrando que por ser um plano free pode ter restrição na quantidade de requisições.
[stockexchange-challenge](https://stockexchange-challenge.herokuapp.com/)

### **Para rodar os testes**
- Executar o comando
```
 npm test
```

### Autor
---
<sub><b>Mayler Navarro</b></sub> </br>
Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-mndiaz90-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/mndiaz90/)](https://www.linkedin.com/in/mndiaz90/)
