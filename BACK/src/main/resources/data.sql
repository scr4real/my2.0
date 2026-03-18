-- 1. Remove produtos duplicados baseando-se no nome
DELETE p1 FROM produtos p1
INNER JOIN produtos p2 
WHERE p1.id > p2.id AND p1.nome = p2.nome;

-- 2. Garante que o modo de inicialização não cause loops (opcional, mas seguro)
SET FOREIGN_KEY_CHECKS = 1;
