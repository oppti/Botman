# git Commands, Help & Tips

### Show commands & management commands

1 – Iniciando um Repositório
Todo repositørio Git armazena as informações dentro de uma pasta oculta chamada “/.git”. Para que os arquivos de uma pasta possam ser versionados pelo Git, é preciso iniciar o repositório. Basta executar o comando abaixo:

```
$ git init
```

2 - Comandos base para subir um repo para o github.

```
$ git remote add origin <URL_do_repo>
$ git add .
$ git commit -m "first commit"
$ git push origin master
```

3 -Listando Arquivos Modificados
Esse comando indica o estado do seu repositório. Em outras palavras, ele vai listar todos os arquivos que foram modificados desde o seu último commit.

```
$ git status
```
4 – Listando Branches
Esse comando lista todas as branches presentes no repositório do seu computador.
```
$ git branch
```
Caso você queira que ele liste também as branches que estão no repositório remoto, adicione -a:
```
$ git branch -a
```
Para mudar para uma outra branch basta usar o comando checkout, passando o nome da branch.
```
$ git checkout minha-branch
```
Se você adicionar -b, uma nova branch será criada.
```
$ git checkout -b minha-nova-branch
```
Para excluir uma branch local basta executar o comando branch com -d ou -D, passando o nome da branch que você quer apagar.
```
git branch -d nome-da-branch
git branch -D nome-da-branch
```
A opção -d é mais segura, pois ela só apaga a branch se você já tiver feito merge ou enviado as alterações para seu repositório remoto, evitando perda de código.

A opção -D ignora o estado da sua branch, forçando a sua remoção.

Esse comando apaga apenas a branch local, não removendo branches remotas.

