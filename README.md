<h1 align="center">
    <img src="https://github.com/oppti/Bot-PreVendas/blob/master/.Docs/assets/bot-icon-2.png" width= "300px;" height= "300px;" />
</h1>

<h1 align='center'>Webex Bot Pré-Vendas</h1>

<p align="center">
  <a href="#-about-project">ℹ️ About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias-and-packages">💻 Tecnologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">🔖 Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">🚀 Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Contributing">🤝 Contributing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">📚 License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;  
</p>

<h4 align="center">
     Siga os passos descritos nos README.md de cada diretorio
</h4>

<p align="center">
  <a href="https://github.com/oppti/Bot-PreVendas">💻 Acesse o Front-end</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>
<br>

# 🚀 Welcome to Producthunt

Application developed.

## Descrição do projeto :star:

Uma solução de chaBOT cosntruida para o webex teams voltada para tornar o processo de consulta de produtos Cisco mais facil e automatizado.
O que antes era necessario a consulta acessar a documentação do DataSheat, agora sera possivel pelo chat do webex Teams, commmo mostra a demontração abaixo. [Cisco DevNet](https://developer.cisco.com/).


## Tecnologias utilizadas 🚀

<ul>
    <li><a href="https://nodejs.org/en/" target="_blank">Node</a></li>
    <li><a href="#" target="_blank">webex Bot-Framework</a></li>
    <li><a href="#" target="_blank">MySQL</a></li>
    <li><a href="#" target="_blank">webex Teams</a></li>
</ul>

## 🌎 Demonstration
visualize the application, a demonstration <foto ou gif>

## 🧰 Prerequisites
Make sure you have installed all of the following prerequisites on your machine:
* **[Git](https://git-scm.com/downloads)**;
* **[Node.js](https://nodejs.org/en/download/)** with npm package manager.
* **[Docker](https://nodejs.org/en/download/)** with npm package manager.
* **[MySQL](https://nodejs.org/en/download/)** with npm package manager.
* **[webex BotFramework](https://nodejs.org/en/download/)** with npm package manager.
* **[webex Teams](https://nodejs.org/en/download/)** with npm package manager.
* **[Vs-Code](https://nodejs.org/en/download/)** with npm package manager.
* **[Ngrok](https://nodejs.org/en/download/)** with npm package manager.


## 🔧 Get Started locale
```sh
$ https://github.com/oppti/Bot-PreVendas.git
$ cd Bot-PreVendas/
$ npm install -g yarn
$ yarn install

our

$ npm install
```
## 🔧 Get Started ngrok locale our docker
```sh
# access to ngok and download "https://ngrok.com/"
$ ngrok http 3000
# paste url for ngrok.io in config.json
```

```sh
# install Docker in your machine
run -d -p 4040:4040 --restart always --name ngrok wernight/ngrok ngrok http 192.168.0.72:8081
# follow the documentation dockerHub.com for install wernight/ngrok
```
## 🔧 Get Started mysql
```sh
docker run -p 3001:3001 -p 3306:3306 --restart always --name MYSQL-BOT -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
# access bash conatiner mysql our use ORM Database.
docker exec -it <ID ou name container> bash
```

## 🔧 Get Started node
```sh
$ docker build -t opportunity/node-botprevendas .
$ docker run --name bot-prevendas -p 3000:3000 -d opportunity/node-botprevendas
```

## 🔧 Get Started Aplication Bot
```sh
# use debug vs code our npm start
$ npm start
our
$ yarn start
```

### Production Environment
* [Webex Bot-framework documentation](https://)
* [Documentation assistant](https://)

## 🤝 Contributing
There are many forms to contribute with the project, first of all you can give this github repo a Star.

If you want do help with the code follow the steps bellow

```ts
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.
$ gh repo fork PF-Henrique/Be-The-Hero

# Clone your fork
$ git clone {your-fork-url}
$ cd proffy

# Create a branch with your feature
$ git checkout -b {branch-name}

# Make the commit with your changes
$ git commit -m 'Feat: {feature-name}'

# Send the code to your remote branch
$ git push origin {branch-name}
```

Then send a Pull Request that will be analyzed and approved if it helps with the project

---
## 🐛 Issues

Feel free to **file a new issue** with a respective title and description on the the [Bot-PreVendas](https://github.com/oppti/Bot-PreVendas/issues) repository. If you already found a solution to your problem, **i would love to review your pull request**!


## 💓 Support me
Give a ⭐️ if this project helped you!

## 📝 License
#### This project is [MIT](LICENSE) licensed. 
---

## 👤 Author

<a href="https://github.com/oppti">
  <img src="https://avatars2.githubusercontent.com/u/56740481?s=400&u=cea6412011266f7809f4958cb369536956490a67&v=4" width= "50px;" height= "50px;" alt="Avatar"/>
  <br />
 <sub>
  <b>
    Opportunity
  </b>
</sub>
</a> 
<a href="<a href="https://github.com/oppt/" title="Opportunity"></a>

<br />

Made with 💙 by Opportunity 👋 [Talk to me!](https://www.linkedin.com/in/opportunity-tecnologia-6735a6167/)
