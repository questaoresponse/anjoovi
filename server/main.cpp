#include <iostream>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <cstring>

#define PORT 8080

int main() {
    // Criação do socket
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        std::cerr << "Falha ao criar o socket" << std::endl;
        return -1;
    }

    // Definição do endereço e porta para escutar
    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;  // Aceitar conexões de qualquer endereço
    address.sin_port = htons(PORT);

    // Vincula o socket a um endereço e porta
    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        std::cerr << "Falha ao vincular o socket ao endereço" << std::endl;
        close(server_fd);
        return -1;
    }

    // Coloca o servidor para escutar conexões
    if (listen(server_fd, 3) < 0) {
        std::cerr << "Falha ao escutar conexões" << std::endl;
        close(server_fd);
        return -1;
    }

    std::cout << "Servidor escutando na porta " << PORT << "..." << std::endl;

    // Aceita uma conexão de cliente
    int new_socket;
    struct sockaddr_in client_address;
    socklen_t addr_len = sizeof(client_address);

    new_socket = accept(server_fd, (struct sockaddr*)&client_address, &addr_len);
    if (new_socket < 0) {
        std::cerr << "Falha ao aceitar a conexão" << std::endl;
        close(server_fd);
        return -1;
    }

    std::cout << "Nova conexão de: " << inet_ntoa(client_address.sin_addr) << std::endl;

    // Envia uma mensagem para o cliente
    const char* message = "Olá, cliente!";
    send(new_socket, message, strlen(message), 0);

    // Fecha o socket
    close(new_socket);
    close(server_fd);

    return 0;
}
