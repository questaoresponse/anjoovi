UPDATE post_video p 
LEFT JOIN (
    SELECT 
        id,
        JSON_SET(
            d, 
            '$.o', UNIX_TIMESTAMP(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))),
            '$.a', 
            CASE 
                WHEN JSON_CONTAINS_PATH(d, 'one', '$.a') THEN UNIX_TIMESTAMP(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')))
                ELSE JSON_EXTRACT(d, '$.a') -- Não usar JSON_UNQUOTE aqui
            END
        ) AS d 
    FROM post_video
) AS r ON p.id = r.id  
SET p.d = CASE 
    WHEN JSON_UNQUOTE(JSON_EXTRACT(r.d, '$.a'))!='null' THEN JSON_SET(r.d,'$.a',CAST(JSON_EXTRACT(r.d, '$.a') AS DECIMAL))
    ELSE JSON_REMOVE(r.d, '$.a') 
END;
