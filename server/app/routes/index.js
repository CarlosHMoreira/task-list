/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/tarefas/semana')
        .get(api.listaSemana);
        
    app.route('/tarefas/anterior')
        .get(api.listaAnterior);
        
    app.route('/tarefas/retrasada')
        .get(api.listaRetrasada);  
        
    app.route('/tarefas')
        .post(api.cadastraTarefa);          
};