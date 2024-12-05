var ex=0;
var g0;
var g01;
var g1;
var g2;
window.location.iniciar=()=>{
    window.setStyle={elemento:"#grafico",color:"gray"};
    window.total_u ? document.querySelector("#total_u").textContent=window.total_u.length : null;
    // document.querySelector("#total").textContent="total de visualizações: "+window.total;
    // document.querySelector("#total_24").textContent="total de visualizações 24 horas: "+(window.total_24 ? window.total_24 : "não há postagens 24 horas");
    var counts2=[];
    var labels2=[];
    var primeiroDiaDoMes = new Date();
    primeiroDiaDoMes.setDate(1);
    var ultimoDiaDoMes = new Date(primeiroDiaDoMes);
    ultimoDiaDoMes.setMonth(primeiroDiaDoMes.getMonth() + 1);
    ultimoDiaDoMes.setDate(0);
    var numeroDeDias = ultimoDiaDoMes.getDate();
    for(var i=0;i<numeroDeDias;i++){
        counts2.push(0);
        labels2.push(i+1);
    }
    var counts=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var post of window.posts) {
        var datas=JSON.parse(post.acessos_d);
            if (datas instanceof Array){
            for (var datad of datas){
            // Extrair a hora da data;
            for (var data in datad){
                var nd=new Date(data);
                nd.setHours(nd.getHours()); 
                nd.setDate(nd.getDate()-1);
                var hora=nd.getHours();  
                var dia=nd.getDate();
                counts2[dia]++;
                counts[hora]++;
            };
            };
        };
    };
    function grafico0(){
        if (window.total_u){
            var counts0=[0,0];
            for (user of window.total_u){
                if (user.tipo=="mobile"){
                    counts0[0]++;
                } else {
                    counts0[1]++;
                }
            }
            var dados = {
                labels: ["celular","computador"],
                datasets: [{
                    label: 'Usuários ativos',
                    data: counts0,
                    backgroundColor:['rgba(255,0,0,0.2)','rgba(0,255,0,0.2)'],
                }]
            };
        
            // Configuração do gráfico
            var config = {
                type: 'pie',
                data: dados,
                options: {
                    responsive:false,
                    // scales: {
                    //     y: {
                    //         beginAtZero: true
                    //     }
                    // }
                }
            };
        
            // Criar o gráfico
            if (ex==0){
            var ctx = document.getElementById('grafico0').getContext('2d');
            g0 = new Chart(ctx, config);
            document.getElementById('grafico0').style.background="white";
            } else {
                g0.data=dados;
                g0.update();
            }
        }
    }
    function grafico01(){
        if (window.total_u){
            var counts0=[0,0];
            for (user of window.total_u){
                if (user.usuario!=null){
                    counts0[0]++;
                } else {
                    counts0[1]++;
                }
            }
            var dados = {
                labels: ["logado","não logado"],
                datasets: [{
                    label: 'Usuários logados',
                    data: counts0,
                    backgroundColor:['rgba(0,255,0,0.2)','rgba(255,0,0,0.2)'],
                }]
            };
        
            // Configuração do gráfico
            var config = {
                type: 'pie',
                data: dados,
                options: {
                    responsive:false,
                    // scales: {
                    //     y: {
                    //         beginAtZero: true
                    //     }
                    // }
                }
            };
        
            // Criar o gráfico
            if (ex==0){
                var ctx = document.getElementById('grafico01').getContext('2d');
                g01= new Chart(ctx, config);
                document.getElementById('grafico01').style.background="white";
            } else {
                g01.data=dados;
                g01.update();
            }
        }
    }
    function grafico1(){
    var dados = {
        labels: ['0:00', '1:00', '2:00', '3:00', '4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        datasets: [{
            label: 'Visualizações hoje',
            data: counts,
            borderColor: 'rgba(0,0,255,1)',
            borderWidth: 2,
            fill: false
        }]
    };

    // Configuração do gráfico
    var config = {
        type: 'line',
        data: dados,
        options: {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Criar o gráfico
    if (ex==0){
        var g=document.querySelector("#grafico");
        var ctx = g.getContext('2d');
        g1 = new Chart(ctx, config);
        g.style.background="white";
        g.width=500;
    } else {
        g1.data=dados;
        g1.update();
    }
    }
    function grafico2(){
        var dados = {
            labels: labels2,
            datasets: [{
                label: 'Visualizações neste mês',
                data: counts2,
                borderColor: 'rgba(0,0,255,1)',
                borderWidth: 2,
                fill: false
            }]
        };
    
        // Configuração do gráfico
        var config = {
            type: 'line',
            data: dados,
            options: {
                responsive:false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    
        // Criar o gráfico
        if (ex==0){
            var ctx = document.getElementById('grafico2').getContext('2d');
            g2 = new Chart(ctx, config);
            document.getElementById('grafico2').style.background="white";
        } else {
            g2.data=dados;
            g2.update();
        }
    }
    grafico0();
    grafico01();
    grafico1();
    grafico2();
    ex++;
}
var charts=document.querySelector("#charts");
function ir(){
$a.post("",{type:"info"},(result)=>{
    window.total_u=result.total_u;
    window.total=result.total;
    window.total_24=result.total_24 ? result.total_24 : null;
    window.posts=result.posts;
    if (charts){
        window.location.iniciar();
    } else {
        charts.addEventListener("load",()=>{
            window.location.iniciar();
        });
    };
})
}
setInterval(ir,10000);
ir();