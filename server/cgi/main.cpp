#include <iostream>
#include <thread>
#include <string>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>

void handle_client(int client_fd) {
    // Buffer para ler dados da requisição HTTP
    char buffer[1024];
    ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
    
    if (bytes_read < 0) {
        std::cerr << "Erro ao ler dados da requisição" << std::endl;
        close(client_fd);
        return;
    }

    // Garantir que a resposta seja formatada corretamente
    buffer[bytes_read] = '\0'; // Garantir o fim da string

    // Verificar se a requisição é um GET (de forma simples)
    std::string request(buffer);
    if (request.find("GET") == 0) {
        // Responder com um cabeçalho HTTP básico e mensagem
        const char* response = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nOi! Conexão fechada.";
        send(client_fd, response, strlen(response), 0);
    } else {
        // Se não for um GET, responder com um erro
        const char* response = "HTTP/1.1 405 Method Not Allowed\r\nContent-Type: text/plain\r\n\r\nMétodo não permitido.";
        send(client_fd, response, strlen(response), 0);
    }

    // Fechar a conexão com o cliente
    close(client_fd);
}

int main() {
    // Criar o socket do servidor
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        std::cerr << "Erro ao criar o socket" << std::endl;
        return 1;
    }

    // Definir o endereço e a porta para o servidor
    sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_port = htons(1123);  // Porta TCP 8080
    address.sin_addr.s_addr = INADDR_ANY;  // Aceitar conexões de qualquer IP

    // Vincular o socket ao endereço e à porta
    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        std::cerr << "Erro ao vincular o socket ao endereço" << std::endl;
        return 1;
    }

    // Colocar o servidor em modo de escuta
    if (listen(server_fd, 5) < 0) {
        std::cerr << "Erro ao escutar no socket" << std::endl;
        return 1;
    }

    std::cout << "Servidor HTTP aguardando conexões na porta 8080..." << std::endl;

    // Loop para aceitar conexões e processar múltiplos clientes
    while (true) {
        sockaddr_in client_address;
        socklen_t client_addr_len = sizeof(client_address);
        int client_fd = accept(server_fd, (struct sockaddr*)&client_address, &client_addr_len);
        if (client_fd < 0) {
            std::cerr << "Erro ao aceitar a conexão" << std::endl;
            continue; // Ignorar o erro e tentar aceitar outra conexão
        }

        std::cout << "Conexão estabelecida com " << inet_ntoa(client_address.sin_addr) << std::endl;

        // Criar uma thread para tratar o cliente
        std::thread client_thread(handle_client, client_fd);
        client_thread.detach(); // Detach para continuar aceitando outras conexões
    }

    // Fechar o socket do servidor (nunca será alcançado no exemplo atual)
    close(server_fd);

    return 0;
}

