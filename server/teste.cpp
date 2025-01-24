#include <iostream>

extern "C" {
    __attribute__((visibility("default"))) const char* saudacao() {
        return "Olá do PHP em C++!";
    }
}