const tarefas = [];
const tarefas_concluidas = [];

/*FUNÇÃO ADICIONAR*/
export function adicionar(){
    console.log("Os campos marcados com * são obrigatórios!")
    let titulo = prompt("*Digite o título da tarefa que deseja adicionar:\n");
    const descricao = prompt("Digite uma breve descrição da tarefa que deseja adicionar:\n");
    let dados_venc = prompt("*Digite uma data de vencimento no formato xx/xx/xxxx:\n");
    let separa = dados_venc.split('/')
    let dataConvertida = new Date(separa[2], separa[1]-1, separa[0]);
    // let dataBrasilia = dataConvertida.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    let data_criacao = prompt("Digite a data que esta tarefa está sendo criada no formato xx/xx/xxxx:\n")
    let separa_um = data_criacao.split('/')
    let dataConvertida_um = new Date(separa_um[2], separa_um[1]-1, separa_um[0]);
    let prioridade = prompt("*Digite o nível de importância da tarefa que deseja adicionar:\n (Baixa, Media ou Alta)\n");

/*DESTAQUE DA OBRIGATORIEDADE DOS CAMPOS*/
    for (let i = titulo; i === null; i = titulo){
        const tit_obrig = prompt("*É obrigatório o título. Digite um:\n")
        titulo =  tit_obrig
    }
    for (let o = dados_venc; o === null; o = dados_venc){
        const dados_obrig = prompt("*É obrigatório a data de vencimento. Digite uma:\n")
        dados_venc =  dados_obrig
    }
    for (let f = prioridade; f === null; f = prioridade){
        const prio_obrig = prompt("*É obrigatório a prioridade. Digite uma:\n")
        prioridade = prio_obrig
    }
/*FIM DAS FUNÇÕES DE OBRIGATORIEDADE DOS CAMPOS*/
    tarefas.push({TITULO:titulo,DESCRICAO:descricao,DATA_VENC:dataConvertida,PRIORIDADE:prioridade,STATUS:"Pendente",DATA_CRIACAO:dataConvertida_um});
    console.log("Tarefa adicionada com sucesso!")
    console.table(tarefas)
    return dataConvertida;
}

/*FUNÇÃO LISTAR*/
export function listar (){
    console.log("Suas tarefas são:")
    console.table(tarefas)
    const opcao = prompt("Como você deseja listar suas tarefas?\nOrdenar ou filtrar:\n")
    if (opcao === "Ordenar"){
        const op = prompt("Escolha como você irá ordenar as tarefas:\n1 - Por dados de vencimento, 2 - por prioridade ou 3 - Dados de criação.")
        if (op == 1){
            const ordem_data = tarefas.sort((a, b) => a.DATA_VENC - b.DATA_VENC);
            console.table(ordem_data)
            }
        else if (op == 2){
            const valor_priori = { "Alta": 1, "Media": 2, "Baixa": 3 };            
            const ordem_prioridade = tarefas.sort((a,b) => valor_priori[a.PRIORIDADE] - valor_priori[(b.PRIORIDADE)]);
            console.table(ordem_prioridade)
        }
        else if (op == 3){
            const ordem_data_cria = tarefas.sort((a, b) => a.DATA_CRIACAO - b.DATA_CRIACAO);
            console.table(ordem_data_cria)
        }
    }
    else{
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
    else if (exibicao == 3){
        const data_hj = prompt("Qual a data atual?\nDigite a data no formato xx/xx/xxxx:\n");
        let separa_dois = data_hj.split('/')
        let data_separada = new Date(separa_dois[2], separa_dois[1]-1, separa_dois[0]);
        for (const l of tarefas){
            if(data_separada < l.DATA_VENC){
                const data_venc = []
                data_venc.push(l)
                console.log('Data da tarefa que ainda vai vencer:')
                console.table(data_venc)
            } 
            else if (data_separada > l.DATA_VENC){
                const data_venceu = []
                data_venceu.push(l)
                console.log('Data da tarefa que já venceu:')
                console.table(data_venceu)
            }
            else if (data_separada = l.DATA_VENC){
                const data_igual = []
                data_igual.push(l)
                console.log('A data é hoje!')
                console.table(data_igual)
            }
        }
        }
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