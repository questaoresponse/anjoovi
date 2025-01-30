#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>

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

    // Daemon executando por 10 segundos
    printf("Daemon executando por 10 segundos...\n");
    
    sleep(10);  // Dorme por 10 segundos de forma eficiente

    printf("10 segundos se passaram. Finalizando...\n");

    // O processo filho termina após 10 segundos
    exit(0);
}
