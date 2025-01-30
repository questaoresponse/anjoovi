#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <time.h>

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
    // Cria uma nova sessão e torna o processo líder dessa sessão
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
    time_t start_time = time(NULL);

    while (1) {
        // Verifica se 10 segundos se passaram
        if (difftime(time(NULL), start_time) >= 10) {
            printf("Daemon executado por 10 segundos. Finalizando...\n");
            break;  // Sai do loop após 10 segundos
        }

        // Você pode adicionar o que o daemon faria aqui, se necessário.
    }

    // O processo filho termina após 10 segundos
    exit(0);
}
