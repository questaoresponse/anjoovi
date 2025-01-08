package teste;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CookieValue;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import teste.model.User;
import teste.service.UserService;
import teste.UserRowMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Component
public class AppRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("A aplicação está rodando...");
        // Pode adicionar uma lógica para manter a aplicação em execução
    }
}
@RestController
class PagesController {

    @GetMapping("/")
    public ResponseEntity<byte[]> serveHtml() throws IOException {
        // Caminho do arquivo HTML (pode ser qualquer caminho no seu sistema)
        File file = new File("src/main/resources/public/index.html");

        // Lê o conteúdo do arquivo HTML como um array de bytes
        byte[] fileContent = Files.readAllBytes(file.toPath());

        // Configura os cabeçalhos de resposta, incluindo o tipo MIME (text/html)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "text/html");

        // Retorna o arquivo com o código de status HTTP 200 (OK)
        return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    }
    @PostMapping("/")
    public Map<String,Object> initialPage(@CookieValue(value = "token", defaultValue = "") String cookieValue) throws IOException {
        AbstractMap.SimpleEntry<String,Integer> values=userService.initialize(cookieValue);
        String user=values.getKey();
        return userService.initialPage(user, -1);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<byte[]> serveHtml(@PathVariable("id") String id) throws IOException {
        // Caminho do arquivo HTML (pode ser qualquer caminho no seu sistema)
        File file = new File("src/main/resources/public/user.html");

        // Lê o conteúdo do arquivo HTML como um array de bytes
        byte[] fileContent = Files.readAllBytes(file.toPath());

        // Configura os cabeçalhos de resposta, incluindo o tipo MIME (text/html)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "text/html");

        // Retorna o arquivo com o código de status HTTP 200 (OK)
        return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    }
    @PostMapping("/cargo")
    public Map<String,Object> cargo(@CookieValue(value = "token", defaultValue = "") String cookieValue) {
        AbstractMap.SimpleEntry<String,Integer> values=userService.initialize(cookieValue);
        String user=values.getKey();
        Integer cargo=values.getValue();
        Map<String,Object> response=new HashMap<>();
        response.put("user",user);
        response.put("cargo",cargo);
        return response;
    }
    @PostMapping("/admin/cargo")
    public Map<String,Object> cargoAdmin(@CookieValue(value = "token", defaultValue = "") String cookieValue) {
        AbstractMap.SimpleEntry<String,Integer> values=userService.initialize(cookieValue);
        String user=values.getKey();
        Integer cargo=values.getValue();
        Map<String,Object> response=new HashMap<>();
        response.put("user",user);
        response.put("cargo",cargo);
        return response;
    }
    @GetMapping("/teste")
    public String teste() throws IOException {
        return "teste";
    }

    @Autowired
    private UserService userService;

    // Endpoint para buscar usuários por nome
    @GetMapping("/users/{name}")
    public List<Map<String,Object>> getUsersByName(@PathVariable String name) {
        return userService.findUsersByName(name);
    }

    // Endpoint para buscar usuário por ID
    @GetMapping("/api/user/{id}")
    public Map<String,Object> getUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }
}