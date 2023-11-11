//Evento será apenas acionado quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    //variáveis dos elementos
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const removeTaskButton = document.getElementById("removeTask");
    const taskList = document.getElementById("taskList");

    //adiciona uma nova tarefa na lista de tarefas
    function addTask() {
        //pega o valor do input e retorna esse valor sem espaços
        const taskText = taskInput.value.trim();
        //verifica se o input tem um valor vazio - se não estiver segue a função
        if (taskText === "") return;

        //cria um novo elemento da lista
        const li = document.createElement("li");
        //cria os elementos dentro do HTML
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <button class="edit">Editar</button>
                <button class="delete">Deletar</button>
            </div>
        `;
        //adiciona o elemento criado na lista
        taskList.appendChild(li);
        //define o valor do texto como uma string vazia para a próxima entrada no input
        taskInput.value = "";

        //adicionam os dados localmente no navegador
        updateLocalStorage();
    }

    //edita o input inserido pelo usuário
    function editTask(li) {
        //seleciona o elemento span onde está o texto
        const span = li.querySelector("span");
        //seleciona o botão de edição
        const editButton = li.querySelector(".edit");
        //ao ser clicado o botão abre um prompt na tela para que o usuário edite o texto
        const newText = prompt("Editar tarefa:", span.innerText);
        //verifica se o usuário salvou
        if (newText !== null) {
            //o span do texto é atualizado pelo texto inserido no prompt
            span.innerText = newText;
            //atualiza os dados no navegador local
            updateLocalStorage();
        }
    }

    //função que deleta a task da lista
    function deleteTask(li) {
        //remove o elemento LI da lista
        li.remove();
        updateLocalStorage();
    }

    function clearTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        updateLocalStorage();
    }

    //função que atualiza os dados localmente no navegador
  /*  function updateLocalStorage() {
        // Obtém todas as tarefas da lista de tarefas
        const tasks = [];
        //obtém todos os elementos filhos da lista de tarefas
        const taskElements = taskList.children;
        
        //itera e coleta os textos de cada elemento da lista
        //i continua enquanto for menor que o número de elementos li da lista
        for (let i = 0; i < taskElements.length; i++) {
            //seleciona um elemento LI e dentro dele seleciona o span de texto e o innerText contém o texto da tarefa
            const taskText = taskElements[i].querySelector("span").innerText;
            //texto é adicionado ao array tasks da lista
            tasks.push(taskText);
        }
    
        // Armazena as tarefas no localStorage
        const tasksJSON = JSON.stringify(tasks);
        localStorage.setItem("tasks", tasksJSON);
    }*/

    //função que atualiza os dados localmente no navegador
    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map((li) => li.querySelector("span").innerText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    

    //adiciona a task a partir do clique e do enter no teclado
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    //adiiona um evento de clique ao elemento da lista de tarefas e executa as funções de editar e deletar
    taskList.addEventListener("click", (e) => {
        //se o botão clicado for o de editar chama a função editTask
        if (e.target.classList.contains("edit")) {
            editTask(e.target.parentElement.parentElement);
        //se o botão clicado for o de deletar chama a função deleteTask
        } else if (e.target.classList.contains("delete")) {
            deleteTask(e.target.parentElement.parentElement);
        }
    });

    // Adicione o ouvinte do botão "Limpar Tudo" aqui
    removeTaskButton.addEventListener("click", clearTasks);

    // Carregar tarefas do Local Storage
    //Recupera os dados armazenados no local storage, e o JSON parse converte os dados em uma matriz de tarefas
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    //loop que percorre todas as tarefas na matriz
    storedTasks.forEach((taskText) => {
        //para cada tarefa criamos um novo LI
        const li = document.createElement("li");
        //para cada tarefa criamos um novo span
        const span = document.createElement("span");
        //definimos então o conteúdo do texto span a partir do input
        span.textContent = taskText;
        
        //para cada tarefa é criado uma div que terá os botões de ação de editar e deletar
        const actions = document.createElement("div");
        actions.className = "actions";
        
        //para cada tarefa é criado o botão de editar
        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.textContent = 'Editar';
        
        //para cada tarefa é criado o botão de deletar
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Deletar";
        
        //adiciona os botões de editar e deletar como filhos do elemento actions
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        
        //adiciona o span e a div actions como filho do elemento LI
        li.appendChild(span);
        li.appendChild(actions);
        
        //adiciona o Li a lista de tarefas
        taskList.appendChild(li);
    });
});
