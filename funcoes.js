const tarefas = [];
const tarefas_concluidas = [];

/*FUNÇÃO ADICIONAR*/
export function adicionar() {
  console.log("Os campos marcados com * são obrigatórios!");
  let titulo = prompt("*Digite o título da tarefa que deseja adicionar:\n");
  let descricao = prompt(
    "Digite uma breve descrição da tarefa que deseja adicionar:\n"
  );
  if (descricao == null){
    descricao = "Tarefa sem descrição"
  }
  let data_criacao = new Date();
  data_criacao.setHours(0, 0, 0, 0);
  const data_cria_convert = data_criacao.toISOString().split('T')[0];
  let dados_venc = null;
  while (dados_venc === null) {
    dados_venc = prompt(
      "*Digite uma data de vencimento no formato xx/xx/xxxx:\n"
    );
  }
  let separa = dados_venc.split("/");
  let dataConvertida = new Date(separa[2], separa[1] - 1, separa[0]);
  let date = dataConvertida.toISOString().split('T')[0];
  while (date < data_cria_convert) {
    const date_menor = prompt("*A data de vencimento precisa ser maior que a de criação. Digite uma no formato xx/xx/xxxx:\n");
    let separa_quatro = date_menor.split("/");
    let data_accept = new Date(separa_quatro[2], separa_quatro[1] - 1, separa_quatro[0]);
    const data_aceita = data_accept.toISOString().split('T')[0]
    date = data_aceita;
  }
  let prioridade = prompt(
    "*Digite o nível de importância da tarefa que deseja adicionar:\n (Baixa, Media ou Alta)\n"
  );

  /*DESTAQUE DA OBRIGATORIEDADE DOS CAMPOS*/
  for (let i = titulo; i === null; i = titulo) {
    const tit_obrig = prompt("*É obrigatório o título. Digite um:\n");
    titulo = tit_obrig;
  }
  for (let f = prioridade; f === null; f = prioridade) {
    const prio_obrig = prompt("*É obrigatório a prioridade. Digite uma:\n");
    prioridade = prio_obrig;
  }
  /*FIM DAS FUNÇÕES DE OBRIGATORIEDADE DOS CAMPOS*/
  tarefas.push({
    TITULO: titulo,
    DESCRICAO: descricao,
    DATA_VENC: date,
    PRIORIDADE: prioridade,
    STATUS: "Pendente",
    DATA_CRIACAO: data_cria_convert,
  });
  console.log("Tarefa adicionada com sucesso!");
  console.table(tarefas);
  return dataConvertida;
}

/*FUNÇÃO LISTAR*/
export function listar() {
  console.log("Suas tarefas são:");
  console.table(tarefas);
  const opcao = prompt(
    "Como você deseja listar suas tarefas?\nOrdenar ou filtrar:\n"
  );

  /*ORDENAR*/
  if (opcao === "Ordenar") {
    const op = prompt(
      "Escolha como você irá ordenar as tarefas:\n1 - Por dados de vencimento, 2 - por prioridade ou 3 - Dados de criação."
    );
    if (op == 1) {
      const ordem_data = tarefas.sort((a, b) => new Date(a.DATA_VENC) - new Date(b.DATA_VENC));
      console.table(ordem_data);
    } else if (op == 2) {
      const valor_priori = { Alta: 1, Media: 2, Baixa: 3 };
      const ordem_prioridade = tarefas.sort(
        (a, b) => valor_priori[a.PRIORIDADE] - valor_priori[b.PRIORIDADE]
      );
      console.table(ordem_prioridade);
    } else if (op == 3) {
      const ordem_data_cria = tarefas.sort(
        (a, b) => new Date(a.DATA_CRIACAO) - new Date(b.DATA_CRIACAO)
      );
      console.table(ordem_data_cria);
    }

  /*FILTRAR*/
  } else {
    const exibicao = prompt(
      "Escolha o filtro que deseja listar as suas tarefas:\n 1 - Filtrar por status (pendente/concluído);\n 2 - Filtrar por prioridade;\n3 - Filtrar por dados de vencimento.\n"
    );
    if (exibicao == 1) {
      console.log("Tarefas pendentes:");
      console.table(tarefas);
      console.log("Tarefas concluídas:");
      console.table(tarefas_concluidas);
    } else if (exibicao == 2) {
      const baixa = tarefas.filter((tarefa) => tarefa.PRIORIDADE === "Baixa");
      console.log("Tarefas de baixa prioridade:");
      console.table(baixa);
      const media = tarefas.filter((tarefa) => tarefa.PRIORIDADE === "Media");
      console.log("Tarefas de média prioridade:");
      console.table(media);
      const alta = tarefas.filter((tarefa) => tarefa.PRIORIDADE === "Alta");
      console.log("Tarefas de alta prioridade:");
      console.table(alta);
    } else if (exibicao == 3) {
      const data_hj = prompt(
        "Qual a data atual?\nDigite a data no formato xx/xx/xxxx:\n"
      );
      let separa_dois = data_hj.split("/");
      let data_separada = new Date(
        separa_dois[2],
        separa_dois[1] - 1,
        separa_dois[0]
      );
      let data_compara = data_separada.toISOString().split('T')[0];
      const data_venc = [];
      const data_venceu = [];
      const data_igual = [];
      for (const l of tarefas) {
        if (data_compara < l.DATA_VENC) {
          data_venc.push(l);
        } else if (data_compara > l.DATA_VENC) {
          data_venceu.push(l);
        } else if ((data_compara = l.DATA_VENC)) {
          data_igual.push(l);
        }
      }
      console.log("Tarefa(s) que ainda vai/vão vencer:");
      console.table(data_venc);
      console.log("Tarefa(s) que já venceu/venceram:");
      console.table(data_venceu);
      console.log("Tarefa(s) com data de vencimento para hoje:");
      console.table(data_igual);
    }
  }
}

/*FUNÇÃO EDITAR*/
export function editar() {
  const titulopesq = prompt("Digite o título da tarefa que deseja editar:\n");
    if (tarefas[0].TITULO == titulopesq) {
      let titulo_novo = prompt("Digite um novo título para a tarefa:\n");
      for (let t = titulo_novo; t === null; t = titulo_novo) {
        const titu_obrig = prompt("*É obrigatório o título. Digite um:\n");
        titulo_novo = titu_obrig;
      }
      tarefas[0].TITULO = titulo_novo;
      let data_de_venc_nova = null
      while (data_de_venc_nova === null) {
        data_de_venc_nova = prompt(
          "*Digite uma data de vencimento no formato xx/xx/xxxx:\n"
        );
      }
      let data_criation = new Date();
      data_criation.setHours(0, 0, 0, 0);
      const data_criation_convert = data_criation.toISOString().split('T')[0];
      
      let separa_tres = data_de_venc_nova.split("/");
      let data_nova_convertida = new Date(separa_tres[2], separa_tres[1] - 1, separa_tres[0]);
      let data = data_nova_convertida.toISOString().split('T')[0];

      while (data < data_criation_convert) {
      let date_menor_um = prompt("*A data de vencimento precisa ser maior que a de criação. Digite uma no formato xx/xx/xxxx:\n");
      let separa_cinco = date_menor_um.split("/");
      let data_a = new Date(separa_cinco[2], separa_cinco[1] - 1, separa_cinco[0]);
      let data_aceitada = data_a.toISOString().split('T')[0]
      data = data_aceitada;
      }
      console.log(data)
      tarefas[0].DATA_VENC = data;

      let descricao_nova = prompt(
        "Digite uma nova descrição para a tarefa:\n"
      );
      if (descricao_nova == null){
        descricao_nova = "Tarefa sem descrição"
      }
      tarefas[0].DESCRICAO = descricao_nova;
      let prioridade_nova = prompt(
        "Digite uma nova prioridade:\n(Baixa, Media ou Alta)\n"
      );
      for (let h = prioridade_nova; h === null; h = prioridade_nova) {
        const prio_obrig = prompt("*É obrigatório uma prioridade. Digite uma:\n");
        prioridade_nova = prio_obrig;
      }
      tarefas[0].PRIORIDADE = prioridade_nova;
      console.log("\nTarefa editada.");
      console.table(tarefas);
    }   
}

/*FUNÇÃO REMOVER*/
export function remover() {
  const remov = prompt("Digite a tarefa que deseja remover: ");
  const decision = prompt(
    "Deseja realmente remover essa tarefa?\nDigite S para sim ou N para não:\n"
  );
  if (decision == "S") {
    console.log("As tarefas removidas são:\n");
    console.table(tarefas.splice(tarefas[remov.TITULO], 1));
    console.log("As tarefas restantes são:\n");
    console.table(tarefas);
  } else {
    console.log("\nSuas tarefas são:\n");
    console.table(tarefas);
  }
}

/*FUNÇÃO DE MARCAR COMO CONCLUÍDA UMA TAREFA*/
export function marcar() {
  const statuspesq = prompt("Digite o título da tarefa pendente:\n");
  let index = tarefas.findIndex((obj) => obj.TITULO === statuspesq);

  if (index !== -1) {
    let objetoRemovido = tarefas.splice(index, 1)[0];
    tarefas_concluidas.push(objetoRemovido);
    let objeto = tarefas_concluidas.find((prop) => prop.STATUS === "Pendente");

    if (objeto) {
      objeto.STATUS = "\u2713";
    }
    console.log("As tarefas concluídas são:");
    console.table(tarefas_concluidas);
  }
}

/*FUNÇÃO PESQUISAR*/
export function pesquisar() {
  const escolha = prompt(
    "Escolha a forma de pesquisar:\n(1 para pesquisa por título ou 2 para pesquisa por descrição)\n"
  );
  if (escolha == 1) {
    const pesquisa_tit = prompt(
      "Digite o título completo ou parcial da tarefa que deseja pesquisar:\n"
    );
    const buscaparcial_tit = tarefas.filter((pesq_tit) => pesq_tit.TITULO.includes(pesquisa_tit))
    console.table(buscaparcial_tit)     
  }
  else {
    const pesquisa_des = prompt(
      "Digite a descrição completa ou parcial da tarefa que deseja pesquisar:\n"
    );
    const buscaparcial_des = tarefas.filter((pesq_des) => pesq_des.DESCRICAO.includes(pesquisa_des))
    console.table(buscaparcial_des)     
  }
}

/*FUNÇÃO RESUMIR*/
export function resumo() {
  const quant_tarefas = tarefas.length;
  const quant_tarefas_conc = tarefas_concluidas.length;
  const result = quant_tarefas + quant_tarefas_conc;
  console.log(`O número total de tarefas é ${result}.`);
  console.log(`O número de tarefas pendentes é ${quant_tarefas}.`);
  console.log(`O número total de tarefas concluídas é ${quant_tarefas_conc}.`);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  const amanhaFormatada = amanha.toISOString().split('T')[0];
  const tarefasDeAmanha = tarefas.filter(tarefa => tarefa.DATA_VENC === amanhaFormatada);
  console.log("Tarefas que vão vencer no dia de amanhã:")
  console.table(tarefasDeAmanha)
}
