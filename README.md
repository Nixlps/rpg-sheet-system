## Sistema para cadastro e gerenciamento de fichas de RPG

# Stack e Arquitetura
- MVC e autenticação utilizando JWT
- Frontend: React.js e SASS
- Backend: PHP e MySQL 

# Objetivos V1
- Para acessar a aplicação é necessário ter um cadastro e estar logado
- Qualquer usuário pode criar uma nova mesa e receberá o cargo "Mestre"
- Dentro de uma mesa, o mestre irá definir o modelo da ficha, isso é, os campos que existirão na ficha
- O mestre de uma mesa poderá criar novas fichas (criação de NPCs) e ver todas as fichas da mesa
- O mestre não pode editar ou deletar as fichas que não forem criadas por ele
- Apenas o mestre pode invitar jogadores (precisam estar cadastrados)
- Usuários dentro de uma mesa já criada receberão o cargo "Jogador"
- Jogadores poderão criar novas fichas, edita-las ou deleta-las, mas não irão ver as demais fichas da mesa
