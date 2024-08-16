import { adicionar,listar,editar,remover,marcar,pesquisar,resumo} from "./funcoes";

console.log("\nSEJA BEM VINDO AO GERENCIADOR DE TAREFAS!")
console.log("\nAqui, você poderá administrar susas tarefas de uma forma intutiva e prática!\n")
while(true){
    const opcao = prompt("\nDigite a opção:\n1 - Adicionar uma nova tarefa;\n2 - Listar tarefas;\n3 - Editar tarefa;\n4 - Remover tarefa;\n5 - Marcar tarefa como concluída;\n6 - Pesquisar tarefa;\n7 - Resumo das tarefas.\n")

    if(opcao == 1){
    adicionar()
}
    else if(opcao == 2){
    listar()
}
    else if(opcao == 3){
        editar()
}
    else if(opcao == 4){
        remover()
    }
    else if(opcao == 5){
        marcar()
    }
    else if(opcao == 6){
        pesquisar()
    }
    else if(opcao == 7){
        resumo()
    }
}
