#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstring>

int main(int argc, char* argv[]) {
    // Verificar se há argumentos passados
    if (argc < 2) {
        std::cerr << "Uso: " << argv[0] << " <argumento>" << std::endl;
        return 1;
    }

    // Criar a URL base para a requisição GET
    std::string base_url = "https://www.anjoovi.com/teste.php?command=";

     // Substituir os espaços por '%20' e '+' por '%2B' antes de codificar
    std::string argument = argv[1];
    for (size_t i = 0; i < argument.length(); i++) {
        if (argument[i] == ' ') {
            argument[i] = '%';  // Substitui espaço por '%'
            argument.insert(i + 1, "20");  // Adiciona '20' após o '%'
        } else if (argument[i] == '+') {
            argument[i] = '%';  // Substitui '+' por '%'
            argument.insert(i + 1, "2B");  // Adiciona '2B' após o '%'
        }
    }
    const char* arg = argument.c_str();
    
    CURL* curl = curl_easy_init();

    char* encoded_param = curl_easy_escape(curl, arg, strlen(arg));
    if (!encoded_param) {
        std::cerr << "Erro ao codificar o argumento!" << std::endl;
        return 1;
    }

    // Montar a URL final com o argumento codificado
    std::string url = base_url + encoded_param;
    curl_free(encoded_param);
    if(curl) {
        // Definir a URL que será acessada
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

        // Realizar a requisição GET
        CURLcode res = curl_easy_perform(curl);
        
        // Verificar se a requisição foi bem-sucedida
        if(res != CURLE_OK) {
            std::cerr << "Erro na requisição: " << curl_easy_strerror(res) << std::endl;
        } else {
            std::cout << "Requisição GET realizada com sucesso!" << std::endl;
        }

        // Limpar os recursos do libcurl
        curl_easy_cleanup(curl);
    } else {
        std::cerr << "Falha ao inicializar o libcurl!" << std::endl;
        return 1;
    }

    return 0;
}
