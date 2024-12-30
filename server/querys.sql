SELECT * FROM (
            (
                SELECT 
                (SELECT CASE 
                    WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                    ELSE 'false' 
                END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $n1
                'p' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,subtitulo,texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                (
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END + 
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado & 1=0 AND privado & 4=0 AND views_id!=?
            )
            UNION
            (
                SELECT 
                (SELECT CASE 
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                        ELSE 'false' 
                    END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $i1
                'i' AS tipo,acessos,p.usuario,NULL AS titulo,descricao,NULL AS subtitulo,NULL AS texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                (
                    CASE WHEN LOWER(descricao) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END +
                    CASE WHEN LOWER(descricao) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post_imagem p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0 AND views_id!=?
            )
            UNION
            (
                SELECT 
                (SELECT CASE 
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                        ELSE 'false' 
                    END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $m1
                'm' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,NULL AS subtitulo,NULL AS texto,imagem,arquivo,duration,zip,d,views_id,id,
                (
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END +
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post_musica p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0 AND views_id!=?
            )
            UNION
            (
                SELECT 
                (SELECT CASE 
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                        ELSE 'false' 
                    END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $t1
                't' AS tipo,acessos,p.usuario,NULL AS titulo,NULL AS descricao,NULL AS subtitulo,texto,'' AS imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                (
                    CASE WHEN LOWER(texto) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END +
                    CASE WHEN LOWER(texto) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0 AND views_id!=?
            )
            UNION
            (
                SELECT 
                (SELECT CASE 
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                        ELSE 'false' 
                    END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $v1
                'v' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,NULL AS subtitulo,texto,JSON_ARRAY(video,imagem) AS imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                (
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END +
                    CASE WHEN LOWER(titulo) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post_video p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0 AND views_id!=?
            )
            UNION
            (
                SELECT 
                (SELECT CASE 
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                        ELSE 'false' 
                    END 
                AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
                $pd1
                'pd' AS tipo,acessos,p.usuario,NULL AS titulo,descricao,NULL AS subtitulo,NULL AS texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                (
                    CASE WHEN LOWER(descricao) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1)),'%')) THEN 1 ELSE 0 END +
                    CASE WHEN LOWER(descricao) LIKE(CONCAT('%',LOWER((SELECT texto FROM historico WHERE usuario=? ORDER BY id DESC LIMIT 1 OFFSET 1)),'%')) THEN 0.5 ELSE 0 END
                ) AS accuracy FROM post_product p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0 AND views_id!=?
            )
            ) AS ranked ORDER BY accuracy DESC LIMIT 