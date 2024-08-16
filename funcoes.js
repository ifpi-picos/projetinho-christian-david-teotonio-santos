const tarefas = [];
const tarefas_concluidas = [];

export function adicionar(){
    console.log("Os campos marcados com * são obrigatórios!")
    let titulo = prompt("*Digite o título da tarefa que deseja adicionar:\n");
    const descricao = prompt("Digite uma breve descrição da tarefa que deseja adicionar:\n");
    let dados_venc = prompt("*Digite a data em que essa tarefa vencerá:\n (Um dia, Uma semana, Um mes, Um bimestre, Um semestre, Um ano)\n");
    let prioridade = prompt("*Digite o nível de importância da tarefa que deseja adicionar:\n (Baixa, Media ou Alta)\n");
    for (let i = titulo; i === null; i = titulo){
        const tit_obrig = prompt("*É obrigatório o título. Digite um:\n")
        titulo =  tit_obrig
    }
    for (let o = dados_venc; o === null; o = dados_venc){
        const dados_obrig = prompt("*É obrigatório a data de vencimento. Digite um:\n")
        dados_venc =  dados_obrig
    }
    for (let f = prioridade; f === null; f = prioridade){
        const prio_obrig = prompt("*É obrigatório a prioridade. Digite um:\n")
        prioridade = prio_obrig
    }
    tarefas.push({TITULO:titulo,DESCRICAO:descricao,DATA_VENC:dados_venc,PRIORIDADE:prioridade,STATUS:"Pendente"});
    console.log("Tarefa adicionada com sucesso!")
    console.table(tarefas)
}

export function listar (){
    console.log("Suas tarefas são:")
    console.table(tarefas)
    const opcao = prompt("Como você deseja listar suas tarefas?\nOrdenar ou filtrar:\n")
    if (opcao === "Ordenar"){
        const op = prompt("Escolha como você irá ordenar as tarefas:\n1 - Por dados de vencimento, 2 - por prioridade ou 3 - Dados de criação.")
        if (op == 1){
            
        }
    }
    const exibicao = prompt("Escolha o filtro que deseja listar as suas tarefas:\n 1 - Filtrar por status (pendente/concluído);\n 2 - Filtrar por prioridade;\n3 - Filtrar por dados de vencimento.\n")
    if (exibicao == 1){
        console.log("Tarefas pendentes:")
        console.table(tarefas);
        console.log("Tarefas concluídas:")
        console.table(tarefas_concluidas);
    }
    else if (exibicao == 2){
        const baixa = tarefas.filter(tarefa => tarefa.PRIORIDADE === 'Baixa');
        console.log("Tarefas de baixa prioridade:")
        console.table(baixa);
        const media = tarefas.filter(tarefa => tarefa.PRIORIDADE === 'Media');
        console.log("Tarefas de média prioridade:")
        console.table(media);
        const alta = tarefas.filter(tarefa => tarefa.PRIORIDADE === 'Alta');
        console.log("Tarefas de alta prioridade:")
        console.table(alta);
        
    }
    else{
        const dia = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um dia');
        console.log("Tarefas que vencem em um dia:")
        console.table(dia);
        const semana = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Uma semana');
        console.log("Tarefas que vencem em uma semana:")
        console.table(semana);
        const mes = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um mes');
        console.log("Tarefas que vencem em um mês:")
        console.table(mes);
        const bimestre = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um bimestre');
        console.log("Tarefas que vencem em um bimestre:")
        console.table(bimestre);
        const semestre = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um semestre');
        console.log("Tarefas que vencem em um semestre:")
        console.table(semestre);
        const ano = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um ano');
        console.log("Tarefas que vencem em um ano:")
        console.table(ano);
        
    }
}

export function editar(){
        const titulopesq = prompt("Digite o título da tarefa que deseja editar:\n")

        for (const n of tarefas){
            if (n.TITULO == titulopesq){
                const titulo_novo = prompt("Digite um novo título para a tarefa:\n");
                n.TITULO = titulo_novo
                const descricao_nova = prompt("Digite uma nova descrição para a tarefa:\n");
                n.DESCRICAO = descricao_nova
                const data_de_venc_nova = prompt("Digite uma nova data de vencimento:\n(Um dia, Uma semana, Um mes, Um bimestre, Um semestre, Um ano)\n");
                n.DATA_VENC = data_de_venc_nova
                const prioridade_nova = prompt("Digite uma nova prioridade:\n(Baixa, Media ou Alta)\n");
                n.PRIORIDADE = prioridade_nova
                console.log("\nTarefa editada.")
                console.table(tarefas)
            }
}  
}

export function remover (){
    const remov = prompt("Digite a tarefa que deseja remover: ");
    const decision = prompt("Deseja realmente remover essa tarefa?\nDigite S para sim ou N para não:\n")
    if (decision == "S"){
            console.log("As tarefas removidas são:\n")
            console.table(tarefas.splice(tarefas[remov.TITULO],1))
            console.log("As tarefas restantes são:\n")
            console.table(tarefas)
        }
    else {
            console.log("\nSuas tarefas são:\n")
            console.table(tarefas)
        }
   
}

export function marcar(){
    const statuspesq = prompt("Digite o título da tarefa pendente:\n");
    let index = tarefas.findIndex(obj => obj.TITULO === statuspesq);

    if (index !== -1) {
        let objetoRemovido = tarefas.splice(index, 1)[0];
        tarefas_concluidas.push(objetoRemovido);
        let objeto = tarefas_concluidas.find(prop => prop.STATUS === "Pendente");

        if (objeto) {
        objeto.STATUS = '\u2713';
        
    }
    console.log("As tarefas concluídas são:")
    console.table(tarefas_concluidas)
}}

export function pesquisar(){
    const escolha = prompt("Escolha a forma de pesquisar:\n(1 para pesquisa por título ou 2 para pesquisa por descrição)\n")
    if (escolha == 1){
        const pesquisa_tit = prompt("Digite o título da tarefa que deseja pesquisar:\n");
    
        for (const b of tarefas){
            if (b.TITULO == pesquisa_tit){
                console.table({TITULO:b.TITULO, DESCRICAO:b.DESCRICAO, DATA_VENC:b.DATA_VENC, PRIORIDADE:b.PRIORIDADE})
            }
        }
    }
    else{
        const pesquisa_des = prompt("Digite a descrição da tarefa que deseja pesquisar:\n");
        for (const p of tarefas){
            if (p.DESCRICAO == pesquisa_des){
                console.table({TITULO:b.TITULO, DESCRICAO:b.DESCRICAO, DATA_VENC:b.DATA_VENC, PRIORIDADE:b.PRIORIDADE})
            }
        }
    
    }
    
    
}

export function resumo(){
    const quant_tarefas = tarefas.length;
    const quant_tarefas_conc = tarefas_concluidas.length;
    const result = quant_tarefas+quant_tarefas_conc
    console.log(`O número total de tarefas é ${result}.`)
    console.log(`O número de tarefas pendentes é ${quant_tarefas}.`)
    console.log(`O número total de tarefas concluídas é ${quant_tarefas_conc}.`)
    const dia = tarefas.filter(tarefa => tarefa.DATA_VENC === 'Um dia');
    console.log("Próximas tarefas a vencer:")
    console.table(dia);
}