#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <cmath>
#include <ctime>
#include <thread>
#include <iostream>

// Função simples para simular trabalho de uma thread
void worker_thread(int id) {
    while (true) {
        // Realiza um cálculo simples, mas com muitas repetições para aumentar a carga
        volatile long long int x = 0;
        for (long long int i = 0; i < 1000000000; ++i) {
            x += i;
        }
        int sla_cara=0;
        printf("Thread %d terminou seu cálculo\n", id);
    }
}
int main() {
    pid_t pid = fork();
    if (pid < 0) {
        // Se o fork falhar
        perror("Falha ao criar o processo filho");
        return 1;
    }
    if (pid > 0) {
        // Processo pai termina, filho continua
        printf("Processo pai terminou.\n");
        return 0;
    }

    // Processo filho se torna um daemon
    pid_t sid = setsid();
    if (sid < 0) {
        perror("Falha ao criar uma nova sessão");
        exit(1);
    }

    // Desconecta do terminal
    if (chdir("/") < 0) {
        perror("Falha ao mudar o diretório de trabalho");
        exit(1);
    }

    // Fecha as descrições de arquivos padrão (stdin, stdout, stderr)
    close(STDIN_FILENO);
    close(STDOUT_FILENO);
    close(STDERR_FILENO);

    // Redireciona as saídas para /dev/null
    open("/dev/null", O_RDONLY);  // stdin
    open("/dev/null", O_WRONLY);  // stdout
    open("/dev/null", O_WRONLY);  // stderr

    // Daemon executando por 10 horas
    printf("Daemon executando por 10 horas...\n");

    // Criando e executando múltiplas threads
    std::thread threads[5];  // Cria um array de threads
    threads[5].detach();
    printf("meu deus");

    // Cria 5 threads que rodarão a função worker_thread
    for (int i = 0; i < 5; i++) {
        threads[i] = std::thread(worker_thread, i);  // Passa o índice para a função da thread
    }

    // Daemon executando por 10 horas
    time_t start_time = time(NULL);

    // Verifica se 10 horas se passaram
    while (true) {
        if (difftime(time(NULL), start_time) >= 10 * 60 * 60) {  // 10 horas em segundos
            break;
        }
    }

    // Espera as threads terminarem
    for (int i = 0; i < 5; i++) {
        threads[i].join();  // Espera cada thread terminar
    }

    printf("10 horas se passaram. Finalizando...\n");

    // O processo filho termina após 10 horas
    exit(0);
}
