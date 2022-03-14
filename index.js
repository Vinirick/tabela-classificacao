function construtorJogador(nome) {
    return (jogador = {
      nome: nome,
      partidas: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      pontos: 0
    });
  }
  
  function adicionarJogador() {
    const nome = document.getElementById("nomeJogador");
    jogadores.push(construtorJogador(nome.value));
    nome.value = "";
    exibirJogadoresNaTela(jogadores);
  }
  
  function calculaPontos(jogador) {
    jogador.pontos = jogador.vitorias * 3 + jogador.empates;
  }
  
  function calculaPartidas(jogador) {
    jogador.partidas = jogador.vitorias + jogador.empates + jogador.derrotas;
  }
  
  function adicionarVitoria(i) {
    jogadores[i].vitorias++;
    exibirJogadoresNaTela(jogadores);
  }
  
  function adicionarEmpate(i) {
    jogadores[i].empates++;
    exibirJogadoresNaTela(jogadores);
  }
  
  function adicionarDerrota(i) {
    jogadores[i].derrotas++;
    exibirJogadoresNaTela(jogadores);
  }
  
  function exibirJogadoresNaTela(jogadores) {
    let html = "";
    for (var i = 0; i < jogadores.length; i++) {
      calculaPontos(jogadores[i]);
      calculaPartidas(jogadores[i]);
      html += "<tr>";
      html += "<td>" + jogadores[i].nome + "</td>";
      html += "<td>" + jogadores[i].partidas + "</td>";
      html += "<td>" + jogadores[i].vitorias + "</td>";
      html += "<td>" + jogadores[i].empates + "</td>";
      html += "<td>" + jogadores[i].derrotas + "</td>";
      html += "<td>" + jogadores[i].pontos + "</td>";
      html += "<td>";
      html += '<button onClick="adicionarVitoria(' + i + ')">Vitória</button>';
      html += '<button onClick="adicionarEmpate(' + i + ')">Empate</button>';
      html += '<button onClick="adicionarDerrota(' + i + ')">Derrota</button>';
      html += "</td>";
      html += "</tr>";
    }
    let tabelaJogadores = document.getElementById("tabelaJogadores");
    tabelaJogadores.innerHTML = html;
  }
  
  function zerarPontos() {
    for (var i = 0; i < jogadores.length; i++) {
      jogadores[i].vitorias = 0;
      jogadores[i].empates = 0;
      jogadores[i].derrotas = 0;
    }
    exibirJogadoresNaTela(jogadores);
  }
  
  function exportarCSV() {
    let conteudoCSV =
      "data:text/csv;charset=utf-8,Nome,Vitorias,Empates,Derrotas\r\n";
    //let conteudoCSV = "";
  
    jogadores.forEach(function (jogadorObj) {
      let jogador = `${jogadorObj.nome},${jogadorObj.vitorias},${jogadorObj.empates},${jogadorObj.derrotas}`;
      conteudoCSV += jogador + "\r\n";
    });
    let encodedUri = encodeURI(conteudoCSV);
    window.open(encodedUri);
  }
  
  function importarCSV(file) {
    let conteudoCSV = file;
    jogadores = []; //reseta jogadores
  
    let linhas = conteudoCSV.split(/\r\n|\n/);
    linhas.forEach(function (linha) {
      let colunas = linha.split(",");
      if (colunas[0] != "Nome" && colunas[1] != "Vitorias" && colunas[0] != "") {
        jogadores.push(construtorJogador(colunas[0]));
        for (var i = 0; i < jogadores.length; i++) {
          jogadores[i].vitorias = parseInt(colunas[1]);
          console.log(jogadores[i].vitorias);
          jogadores[i].empates = parseInt(colunas[2]);
          jogadores[i].derrotas = parseInt(colunas[3]);
        }
      }
    });
    exibirJogadoresNaTela(jogadores);
  }
  
  let jogadores = [];
  
  document.getElementById("csvText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      importarCSV(fr.result);
    };
    fr.readAsText(this.files[0]);
  });
  