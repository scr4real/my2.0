-- 1. Volta o preço ao que era antes (divide pelo aumento de 40%)
UPDATE produtos SET preco = preco / 1.40;

-- 2. Aplica o aumento correto de 10%
UPDATE produtos SET preco = preco * 1.10;

-- 3. Deixa o visual profissional com .90
UPDATE produtos SET preco = ROUND(preco) - 0.10;
