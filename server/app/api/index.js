/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

var tarefas = [
      { date: dateRetrasada, name: 'Dentista Clarice', priority: 0, done: true},
      { date: dataAnterior, name: 'Procurar faculdade', priority: 1,  done: true},
      { date: dataAtual, name: 'Tentar resarcir plano dentário', priority: 2, done: true},
      { date: dataAtual, name: 'Dar vacinas da Beerus', priority: 3, done: true},
      { date: dataAtual, name: 'Arrumar clientes', priority: 4, done: true},
      { date: dateRetrasada, name: 'Ajeitar postura', priority: 4, done: true},
    ];

api.todas = function (req, res) {
    res.json(tarefas);
}

api.listaSemana = function(req, res) {
    var tarefasAtuais = tarefas.filter(function(tarefa) {
        return tarefa.data > dataAnterior;
    });
    console.log(tarefasAtuais);
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

   const tarefa = req.body;
   tarefa.date = new Date(tarefa.date);
   tarefas.push(tarefa);
   res.status(201).json(tarefa);
};



module.exports = api;