#include <cmath>
#include <cstdint>
#include <iostream>
#include <fstream>
#include <cstring>
#include <winsock2.h>  // Para o Winsock no Windows
#include <ws2tcpip.h>  // Para funções de rede no Windows
#include <time.h>

#define SERVER_IP "162.240.151.36"
#define SERVER_PORT 8080      // Porta do servidor
#define BUFFER_SIZE 4096      // Tamanho do buffer

// Função para obter o timestamp
uint64_t get_timestamp() {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return (uint64_t)(tv.tv_sec) * 1000 + (tv.tv_usec / 1000);
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        if (argc == 1) {
            std::cout << "No path specified" << std::endl;
        } else {
            std::cout << "No path to send specified for this path" << std::endl;
        }
        return 0;
    }
    if (strlen(argv[1]) > 31) {
        std::cout << "The length of filepath \"" << argv[1] << "\" might be 31, but is " << strlen(argv[1]) << std::endl;
        return 0;
    }
    if (strlen(argv[2]) > 31) {
        std::cout << "The length of filepath \"" << argv[2] << "\" might be 31, but is " << strlen(argv[2]) << std::endl;
        return 0;
    }
    uint64_t id = get_timestamp();
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];
    std::ifstream file(argv[1], std::ios::binary);
    std::size_t file_length = file.tellg();
    if (!file.is_open()) {
        std::cerr << "Error opening file!" << std::endl;
        return -1;
    }

    // Inicializar o Winsock
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        std::cerr << "WSAStartup failed!" << std::endl;
        return -1;
    }

    // Criar socket UDP
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        std::cerr << "Error creating socket!" << std::endl;
        WSACleanup();
        return -1;
    }

    // Configurar o endereço do servidor
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(SERVER_PORT);
    if (inet_pton(AF_INET, SERVER_IP, &server_addr.sin_addr) <= 0) {
        std::cerr << "Error configuring IP address" << std::endl;
        closesocket(sockfd);
        WSACleanup();
        return -1;
    }

    int bytes_send = 0;
    uint32_t pack_index = 0;

    bool isFirstIteration = true;
    // Enviar o conteúdo do arquivo para o servidor
    while (file.read(buffer + (isFirstIteration ? 45 : 13), BUFFER_SIZE - (isFirstIteration ? 45 : 13)) || file.gcount() > 0) {
        int bytes_read = file.gcount();  // Número de bytes lidos
        if (isFirstIteration) {
            // First pack
            uint8_t state = 2;
            if (bytes_read < file_length) {
                // First and unique path
                state = state | 4;
                std::cout << state << std::endl;
            }
            std::memcpy(buffer, static_cast<const void*>(&state), 1);
            std::memcpy(buffer + 1, static_cast<const void*>(&pack_index), 4);
            std::memcpy(buffer + 5, static_cast<const void*>(&id), 8);
            std::memset(buffer + 13, ' ', 32);
            std::memcpy(buffer + 13, argv[2], strlen(argv[2]) + 1);
            bytes_read += 45;
            isFirstIteration = false;
        } else {
            bytes_read += 13;
            // 0 is the last pack and 1 is sending pack
            uint16_t state = bytes_read < BUFFER_SIZE ? 0 : 1;
            std::memcpy(buffer, static_cast<const void*>(&state), 1);
            std::memcpy(buffer + 1, static_cast<const void*>(&pack_index), 4);
            std::memcpy(buffer + 5, static_cast<const void*>(&id), 8);
        }
        if (sendto(sockfd, buffer, bytes_read, 0, (struct sockaddr*)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
            std::cerr << "Error sending data!" << std::endl;
            closesocket(sockfd);
            WSACleanup();
            return -1;
        }
        bytes_send += bytes_read;
        pack_index++;
    }

    // Fechar o arquivo e o socket
    file.close();
    closesocket(sockfd);
    WSACleanup();
}
