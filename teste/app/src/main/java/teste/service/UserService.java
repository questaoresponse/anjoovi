package teste.service;

import teste.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.*;

import teste.UserRowMapper;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public AbstractMap.SimpleEntry<String, Integer> initialize(String hash){
        Map<String, Object> map=new HashMap<>();
        String name="";
        int number=128;
        try {
            String sql = "SELECT usuario, cargo FROM user WHERE hash=?";
            map=jdbcTemplate.queryForObject(sql, new Object[]{hash},(rs, rowNum) -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("usuario", rs.getString("usuario"));
                    result.put("cargo", rs.getString("cargo"));
                    return result;
                });
                name=(String) map.get("usuario");
                number=Integer.parseInt((String) map.get("cargo"));
        } catch (EmptyResultDataAccessException e) {
        }
        return new AbstractMap.SimpleEntry<>(name, number);  // Retorna a tupla
    }
    public Map<String, Object> initialPage(String user, int id){
        String sql = """
            WITH history AS (
               SELECT
                   h.usuario,
                   SUBSTRING_INDEX(GROUP_CONCAT(h.texto ORDER BY h.id DESC SEPARATOR '|||'), '|||', 1) AS latest_text,
                   SUBSTRING_INDEX(SUBSTRING_INDEX(GROUP_CONCAT(h.texto ORDER BY h.id DESC SEPARATOR '|||'), '|||', 2), '|||', -1) AS second_latest_text
               FROM historico h
               GROUP BY h.usuario
           ),
           inscritos_check AS (
               SELECT
                   usuario,
                   CASE
                       WHEN inscritos LIKE ? THEN 'true'
                       ELSE 'false'
                   END AS inscrito
               FROM inscritos
           )
           SELECT
               inscrito,
               acessos,
               p.usuario,
               titulo,
               descricao,
               subtitulo,
               texto,
               imagem,
               arquivo,
               duration,
               zip,
               d,
               views_id,
               id,
               tipo,
               (
                   CASE
                       WHEN h.latest_text IS NOT NULL AND LOWER(IFNULL(IFNULL(p.titulo,p.descricao),p.texto)) LIKE LOWER(h.latest_text) THEN 1
                       ELSE 0
                   END +
                   CASE
                       WHEN h.second_latest_text IS NOT NULL AND LOWER(IFNULL(IFNULL(p.titulo,p.descricao),p.texto)) LIKE LOWER(h.second_latest_text) THEN 0.5
                       ELSE 0
                   END
               ) AS accuracy
           FROM (
               SELECT
                   p.acessos,
                   p.usuario,
                   p.titulo,
                   NULL AS descricao,
                   p.subtitulo,
                   p.texto,
                   p.imagem,
                   NULL AS arquivo,
                   NULL AS duration,
                   NULL AS zip,
                   p.d,
                   p.views_id,
                   p.id,
                   'p' AS tipo
               FROM post p
               WHERE p.privado & 5 = 0 AND p.views_id != ?
               
               UNION ALL
               
               SELECT
                   p.acessos,
                   p.usuario,
                   NULL AS titulo,
                   p.descricao,
                   NULL AS subtitulo,
                   NULL AS texto,
                   p.imagem,
                   NULL AS arquivo,
                   NULL AS duration,
                   NULL AS zip,
                   p.d,
                   p.views_id,
                   p.id,
                   'i' AS tipo
               FROM post_imagem p
               WHERE p.privado & 5 = 0 AND p.views_id != ?

               UNION ALL
               
               SELECT
                   p.acessos,
                   p.usuario,
                   p.titulo,
                   NULL AS descricao,
                   NULL AS subtitulo,
                   NULL AS texto,
                   p.imagem,
                   p.arquivo,
                   p.duration,
                   p.zip,
                   p.d,
                   p.views_id,
                   p.id,
                   'm' AS tipo
               FROM post_musica p
               WHERE p.privado & 5 = 0 AND p.views_id != ?

               UNION ALL
               
               SELECT
                   p.acessos,
                   p.usuario,
                   NULL AS titulo,
                   NULL AS descricao,
                   NULL AS subtitulo,
                   p.texto,
                   NULL AS imagem,
                   NULL AS arquivo,
                   NULL AS duration,
                   NULL AS zip,
                   p.d,
                   p.views_id,
                   p.id,
                   't' AS tipo
               FROM post_texto p
               WHERE p.privado & 7 = 0 AND p.views_id != ?

               UNION ALL
               SELECT
                   p.acessos,
                   p.usuario,
                   p.titulo,
                   NULL AS descricao,
                   NULL AS subtitulo,
                   NULL AS texto,
                   JSON_ARRAY(p.video, p.imagem) AS imagem,
                   NULL AS arquivo,
                   NULL AS duration,
                   NULL AS zip,
                   p.d,
                   p.views_id,
                   p.id,
                   'v' AS tipo
               FROM post_video p
               WHERE p.privado & 5 = 0 AND p.views_id != ?

               UNION ALL
               
               SELECT
                   p.acessos,
                   p.usuario,
                   NULL AS titulo,
                   p.descricao,
                   NULL AS subtitulo,
                   NULL AS texto,
                   p.imagem,
                   NULL AS arquivo,
                   NULL AS duration,
                   NULL AS zip,
                   p.d,
                   p.views_id,
                   p.id,
                   'pd' AS tipo
               FROM post_product p
               WHERE p.privado & 7 = 0 AND p.views_id != ?
           ) AS p
           LEFT JOIN inscritos_check i ON i.usuario = p.usuario
           LEFT JOIN history h ON h.usuario = ?
           ORDER BY accuracy DESC, p.views_id DESC
           LIMIT 48""";
        List<Map<String, Object>> result=jdbcTemplate.queryForList(sql, new Object[] {
                "%\"" + user + "\":%",
                id,
                id,
                id,
                id,
                id,
                id,
                user
        });
        Map<String, Object> response=new HashMap<>();
        response.put("result","true");
        response.put("posts",result);
        response.put("alta",new ArrayList<Map<String, Object>>());
        response.put("st",new ArrayList<Map<String, Object>>());
        return response;
    }
    public List<Map<String,Object>> findUsersByName(String name) {
        String sql = "SELECT p.id, u.id AS user_id, u.nome, u.email FROM views p LEFT JOIN user u ON p.usuario=u.usuario WHERE p.usuario LIKE ? ORDER BY p.id DESC";
        return jdbcTemplate.queryForList(sql, new Object[] { "%" + name + "%" });
    }

    // Exemplo de consulta com WHERE para buscar usuários por id
    public Map<String,Object> findUserById(Long id) {
        String sql = "SELECT * FROM user WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{id},(rs, rowNum) -> {
            Map<String, Object> result = new HashMap<>();
            result.put("id", rs.getLong("id"));
            result.put("nome", rs.getString("nome"));
            result.put("email", rs.getString("email"));
            result.put("usuario", rs.getString("usuario"));
            result.put("senha", rs.getString("senha"));
            return result;
        });
        } catch (DataAccessException e) {
            return null;  // Caso não encontre usuário
        }
    }
}
