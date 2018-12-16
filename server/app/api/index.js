/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

var tarefas = [
      { date: dateRetrasada, name: 'Dentista Clarice', priority: 0},
      { date: dataAnterior, name: 'Procurar faculdade', priority: 1},
      { date: dataAtual, name: 'Tentar resarcir plano dentário', priority: 2},
      { date: dataAtual, name: 'Dar vacinas da Beerus', priority: 3},
      { date: dataAtual, name: 'Arrumar clientes', priority: 4},
      { date: dateRetrasada, name: 'Ajeitar postura', priority: 4},
    ];


api.listaSemana = function(req, res) {
    var tarefasAtuais = tarefas.filter(function(tarefa) {
        return tarefa.data > dataAnterior;
    });
    res.json(tarefasAtuais);
};

api.listaAnterior = function(req, res) {
   
   var tarefasAnteriores = tarefas.filter(function(tarefa) {
        return tarefa.data < dataAtual && tarefa.data > dateRetrasada;
    });
	setTimeout(function() {
		res.json(tarefasAnteriores);	
	}, 500);
    
};

api.listaRetrasada = function(req, res) {

   var tarefasRetrasadas = tarefas.filter(function(tarefa) {
        return tarefa.data < dataAnterior;
    });
    res.json(tarefasRetrasadas);
    
};

api.cadastraTarefa = function(req, res) {

   console.log(req.body);
   req.body.date = new Date(req.body.date.replace(/-/g,'/'));
   tarefas.push(req.body);
   res.status(200).json("Tarefa Registrada");
};



module.exports = api;