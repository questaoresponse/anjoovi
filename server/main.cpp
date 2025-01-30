// main.cpp
#include <iostream>
#include <dlfcn.h>  // Biblioteca para carregar bibliotecas compartilhadas

int main() {
    // Carrega a biblioteca compartilhada
    void* handle = dlopen("./main.so", RTLD_LAZY);
    if (!handle) {
        std::cerr << "Erro ao carregar a biblioteca: " << dlerror() << std::endl;
        return 1;
    }

    // Limpa os erros antes de carregar a função
    dlerror();

    // Obtém o endereço da função saudacao
    void (*saudacao)() = (void(*)())dlsym(handle, "saudacao");
    const char* error = dlerror();
    if (error != nullptr) {
        std::cerr << "Erro ao encontrar a função saudacao: " << error << std::endl;
        dlclose(handle);
        return 1;
    }
    std::cout << "eita_main" << std::endl;

    // Chama a função da biblioteca
    saudacao();

    // Libera a biblioteca compartilhada
    dlclose(handle);

    return 0;
}
