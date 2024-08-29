# Projeto Integrador - IA

## Rodar o Projeto

O projeto utiliza `Turbo js` para rodar o backend e frontend simultaneamente

- Crie a `.env` dentro de cada projeto da pasta `./apps` e depois rode os comandos abaixo para rodar o projeto

```bash
# Baixar dependencias
npm i

# Rodar backend e front
npm run dev

# Caso queira rodar apenas o backend
npm run dev:back
```

Caso nao possua postgres instalado na máquina, é possível iniciar um container docker com o comando abaixo
`docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

## Configurando VSCode

- Baixar a extensão `Eslint`
- Baixar a extensão `Prettier`
- Para formatar o código automaticamente e manter o padrão do projeto aperte `ctrl+shift+p` e pesquise por `Open User Settings`,
  depois adicione as seguintes configurações no arquivo

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```
