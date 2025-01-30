#include <iostream>
extern "C" {
    // Função simples exportada pela DLL
    void saudacao() {
        std::cout << "Olá do interior da DLL!" << std::endl;
    }
}