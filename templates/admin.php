<html>
    <head>
        <style>
html,body{
    margin:0px;
    background:#f0f0f0;
}
form{
    position:absolute;
    left:37.1%;
    top:23%;
    background:white;
    width:25.6%;
    height:40%;
    border-radius:5px;
    box-shadow: 0.5px 0.5px 30px rgb(128, 128, 128,0.5);
}
#email,#senha{
    font-size:105%;
    padding-left:5%;
    position:relative;
    margin-top:7.5%;
    margin-left:5%;
    width:90%;
    height:19%;
    border:solid 1.5px rgba(160,160,160,0.3);
    border-radius:0px;
    outline: 0px;
}
#senha{
    margin-top:3%;
}
#email:focus, #senha:focus{
    outline:solid 1px black;
}
button{
    font-size:105%;
    position:relative;
    margin-top:4%;
    margin-left:5%;
    width:90%;
    height:20%;
    background:black;
    color:white;
    border:solid 1px black;
    border-radius:5px;
}
button:hover{
    background:white;
    color:black;
}
img{
    position:absolute;
    left:43.75%;
    top:8%;
    width:12.5%;
    height:11.25%;
}
a{
    font-family:Arial;
    font-size:87%;
    position:relative;
    top:7.5%;
    left:34.25%;
    width:50%;
    width:10%;
    color:black;
    text-decoration: none;
}
a:hover{
    text-decoration:underline;
    text-decoration-color: black;
}
        </style>
    </head>
    <body>
        <img src="../static/logo-anjoovi.png">
        <form action="" method="post">
            <input name="email" id="email" placeholder="E-mail" required>
            <input type="password" name="password" id="senha" placeholder="Senha" required>
            <button type="submit">Entrar</button>
            <a href="/pegar_senha">Esqueceu a senha?</a>
        </form>
        <script src="/static/comom.js"></script>
        <script src="/static/admin.js"></script>
    </body>
</html>