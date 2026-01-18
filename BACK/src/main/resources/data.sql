-- ==================================================================================
-- ARQUIVO: BACK/src/main/resources/data.sql
-- ==================================================================================

-- 1. LIMPEZA DE DADOS (ORDEM CRUCIAL PARA EVITAR ERRO 502)
DELETE FROM itens_pedido;
DELETE FROM pagamentos;
DELETE FROM pedido_aviso;
DELETE FROM pedidos;
DELETE FROM enderecos; -- Essencial para liberar a exclusão de usuários
DELETE FROM produtos;
DELETE FROM categorias;
DELETE FROM marcas;
DELETE FROM _usuario;

-- 2. INSERÇÃO DE MARCAS
INSERT INTO marcas (id, nome) VALUES 
(1, 'Nike'), 
(2, 'Air Jordan'), 
(3, 'Adidas'), 
(4, 'Bape'), 
(5, 'Asics'),
(6, 'New Balance'), 
(7, 'Puma'), 
(8, 'Timberland'), 
(9, 'Crocs'),
(10, 'Louis Vuitton'), 
(11, 'Dior'), 
(12, 'Yeezy');

-- 3. INSERÇÃO DE CATEGORIAS
INSERT INTO categorias (id, nome) VALUES 
(1, 'Air Max 95'), 
(2, 'Air Max DN'), 
(3, 'Air Max TN'), 
(4, 'Dunk'), 
(5, 'Jordan'), 
(6, 'Outros'), 
(7, 'Acessórios'), 
(8, 'Casual'), 
(9, 'Corrida'), 
(10, 'Botas'), 
(11, 'Chuteiras'), 
(12, 'Sandálias'),
(13, 'Adidas Campus'), 
(14, 'Air Force'),     
(15, 'Air Jordan 11'),
(16, 'Air Max 97'),
(17, 'Air Max 90'),
(18, 'Asics Gel NYC'),
(19, 'Asics Kayano 14'),
(20, 'Bape Sta'),
(21, 'Air Force CPFM'),
(22, 'Crocs Bape'),
(23, 'Crocs McQueen'),
(24, 'Dior B30'),
(26, 'Air Max DN8'),
(27, 'Air Max Drift'),
(28, 'Nike Dunk'),
(29, 'Nike Nocta Glide'),
(30, 'Air Jordan 4'),
(31, 'LV Trainer'),
(32, 'New Balance 530'),
(33, 'New Balance 740'),
(34, 'New Balance 1000'),
(35, 'New Balance 9060'),
(36, 'Nike Vomero 5'),
(37, 'Nocta Hot Step 2'),
(38, 'Nike P-6000'),
(39, 'Puma 180'),
(40, 'Nike Shox'),
(41, 'Yeezy Slide'),
(42, 'Puma Suede'),
(43, 'Air Max TN3');

-- 4. USUÁRIO ADMIN
INSERT INTO _usuario (nome, email, cpf, telefone, senha, role) VALUES 
('Vinicius Admin', 
 'vinicius.biancolini.tds24@gmail.com', 
 '000.000.000-00', 
 '11999999999', 
 '$2a$10$C0iH.HkG8Nh73C57GC7oT.jxzLawZbas/miJPJVP2qhTcpbZI0soq', 
 'ROLE_ADMIN');

-- ==================================================================================
-- 5. INSERÇÃO DOS PRODUTOS
-- ==================================================================================

-- --- LOTE 1: AIR MAX 95 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 95', 'Design anatômico lendário e amortecimento visível. Estilo Midnight Navy.', '/uploads/95/1.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Camadas de conforto e estilo urbano agressivo. Edição Dark Grey Green.', '/uploads/95/2.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Inspirado na anatomia humana, conforto premium. Cor Anatomy of Air.', '/uploads/95/3.png', 1249.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'O essencial do dia a dia com durabilidade máxima. Edição Black Grey.', '/uploads/95/4.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Visual all-black imponente para qualquer ocasião. Edição Triple Black.', '/uploads/95/5.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Limpo, clássico e sofisticado. O Pure Platinum combina com tudo.', '/uploads/95/6.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Detalhes em turquesa que destacam o visual. Edição Grey Turquoise.', '/uploads/95/7.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Cores vibrantes para quem tem atitude. Edição Solar Red.', '/uploads/95/8.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Degradê icônico que marcou época. Edição Crystal Blue.', '/uploads/95/9.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Versatilidade e conforto para o corre diário. Edição Black Essential.', '/uploads/95/10.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Clean e fresco. O Triple White é indispensável na coleção.', '/uploads/95/11.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Contraste perfeito entre preto e azul real. Edição Black Royal.', '/uploads/95/12.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'A combinação Oreo preto e branco que nunca falha. Estilo garantido.', '/uploads/95/13.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Tons terrosos e militares para um look robusto. Edição Rough Green.', '/uploads/95/14.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Destaque-se com detalhes em laranja vibrante. Edição Total Orange.', '/uploads/95/15.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Estilo esportivo com toque moderno. Edição Dark Grey Orange.', '/uploads/95/16.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Cores neutras para um visual sofisticado. Edição Neutral Olive.', '/uploads/95/17.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Sombrio e elegante. O tom Anthracite traz exclusividade.', '/uploads/95/18.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'A energia do vermelho varsity no design clássico. Edição Grey Red.', '/uploads/95/19.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Sola azul marcante para um visual único. Edição Black Blue.', '/uploads/95/20.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Branco gelo premium para um look impecável. Edição Summit White.', '/uploads/95/21.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'O contraste urbano do cinza com amarelo. Edição Dark Grey Yellow.', '/uploads/95/22.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Conexão com a natureza e estilo urbano. Edição Sequoia Green.', '/uploads/95/23.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Impacto visual imediato com preto e amarelo. Edição Tour Yellow.', '/uploads/95/24.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'O cinza clássico que combina com qualquer outfit. Edição Cool Grey.', '/uploads/95/25.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Elegância esportiva em preto e azul. Edição Black Royal.', '/uploads/95/26.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Acabamento em couro premium para durabilidade extra. Triple Black.', '/uploads/95/27.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'A base perfeita para o seu estilo. Edição White Essential.', '/uploads/95/28.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG', 'O original que iniciou a lenda. Edição Neon Yellow Clássica.', '/uploads/95/29.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'A combinação Bred lendária da Nike. Preto e Vermelho.', '/uploads/95/30.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Tons de cinza lobo para um visual clean. Edição Wolf Grey.', '/uploads/95/31.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Detalhes em verde lima que acendem o visual. Edição Grey Volt.', '/uploads/95/32.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Profundidade e estilo. Edição Navy Blue (Azul Marinho).', '/uploads/95/33.png', 1149.90, 1, 10, 1, 'AM95');

-- --- LOTE 2: ADIDAS CAMPUS ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Adidas Campus 00s', 'Vibe skate anos 2000 com camurça premium. Edição Pink Strata.', '/uploads/adidascampus/1.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Estilo autêntico e silhueta robusta. Edição Purple.', '/uploads/adidascampus/2.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Neutro e estiloso, vai com tudo. Edição Beige Black.', '/uploads/adidascampus/3.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Clássico repaginado. Branco e Verde atemporal.', '/uploads/adidascampus/4.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Clean e sofisticado. Edição Crystal White.', '/uploads/adidascampus/5.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'O contraste preto e branco que define o estilo urbano. White Black.', '/uploads/adidascampus/6.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Atitude pura. Edição Core Black.', '/uploads/adidascampus/7.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Tom diferenciado para quem tem personalidade. Edição Olive Green.', '/uploads/adidascampus/8.png', 699.90, 13, 10, 3, 'CAMPUS');

-- --- LOTE 3: AIR FORCE 1 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1', 'O tênis mais icônico do mundo. Branco total, impecável. Triple White.', '/uploads/airforce/1.png', 799.90, 14, 15, 1, 'AF1'),
('Nike Air Force 1', 'Essencial e durável. O clássico preto total. Triple Black.', '/uploads/airforce/2.png', 799.90, 14, 15, 1, 'AF1');

-- --- LOTE 4: AIR JORDAN 11 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 11 Retro', 'Verniz brilhante e luxo nas quadras. Edição Jubilee.', '/uploads/airjordan11/1.png', 1599.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Versão baixa com o brilho clássico do verniz. Black White.', '/uploads/airjordan11/2.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'O graal dos sneakers. Elegância absoluta. Edição Concord.', '/uploads/airjordan11/3.png', 1699.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'O visual Concord em silhueta low. Estilo e conforto.', '/uploads/airjordan11/4.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'A cor dos campeões. Preto e vermelho lendário. Edição Bred.', '/uploads/airjordan11/5.png', 1699.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Atitude Bred em cano baixo. Perfeito para o verão.', '/uploads/airjordan11/6.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'Branco e vermelho vibrante. Destaque total. Edição Cherry.', '/uploads/airjordan11/7.png', 1599.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Frescor e estilo icônico. Edição Cherry Low.', '/uploads/airjordan11/8.png', 1399.90, 15, 5, 2, 'AJ11');

-- --- LOTE 5: AIR MAX 97 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 97', 'Linhas futuristas inspiradas na água. Edição Black White.', '/uploads/airmax97/1.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Tom suave e design aerodinâmico. Edição White Bone.', '/uploads/airmax97/2.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Visual stealth elegante. Edição Triple Black.', '/uploads/airmax97/3.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Inspirado nos trens-bala japoneses. O original Silver Bullet.', '/uploads/airmax97/4.png', 1199.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Frescor e leveza no visual. Edição Light Blue.', '/uploads/airmax97/5.png', 1099.90, 16, 8, 1, 'AM97');

-- --- LOTE 6: AIR MAX 90 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 90', 'O ícone que definiu uma era. Edição Maroon.', '/uploads/airmax90/1.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'A cor mais famosa do AM90. Clássico Infrared.', '/uploads/airmax90/2.png', 1099.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Detalhes em azul laser vibrante. Edição Laser Blue.', '/uploads/airmax90/3.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Energia e conforto em cada passo. Edição Hyper Turquoise.', '/uploads/airmax90/4.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Cores retrô para um visual autêntico. Edição Grape.', '/uploads/airmax90/5.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Puro e atemporal. Edição Triple White.', '/uploads/airmax90/6.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Contraste clássico e versátil. Edição Black White.', '/uploads/airmax90/7.png', 999.90, 17, 10, 1, 'AM90');

-- --- LOTE 7: ASICS GEL NYC ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Asics Gel-NYC', 'Estilo urbano com performance de corrida. Edição Cream Grey.', '/uploads/asycsnyc/1.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Tecnologia GEL para conforto o dia todo. Edição Light Blue.', '/uploads/asycsnyc/2.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Visual clean com toques esportivos. Edição White Blue.', '/uploads/asycsnyc/3.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Moderno e sofisticado. Edição Black Graphite.', '/uploads/asycsnyc/4.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Detalhes em azul real que impressionam. Edição White Royal.', '/uploads/asycsnyc/5.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Tons de terra premium. Edição Oatmeal.', '/uploads/asycsnyc/6.png', 1399.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Futurista e retrô ao mesmo tempo. Edição Silver Cream.', '/uploads/asycsnyc/7.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Sóbrio e estiloso. Edição Navy Grey.', '/uploads/asycsnyc/8.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Tons frios para um look diferenciado. Edição Glacier Grey.', '/uploads/asycsnyc/9.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Profundo e elegante. Edição Midnight Navy.', '/uploads/asycsnyc/10.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Detalhes em verde para quem gosta de cor. Edição White Green.', '/uploads/asycsnyc/11.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Brilho metálico premium. Edição Pure Silver.', '/uploads/asycsnyc/12.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Combinação luxuosa de preto e creme. Edição Black Cream.', '/uploads/asycsnyc/13.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Tom escuro e misterioso. Edição Obsidian.', '/uploads/asycsnyc/14.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Suavidade e estilo. Edição Pink Cream.', '/uploads/asycsnyc/15.png', 1399.90, 18, 5, 5, 'GELNYC');

-- --- LOTE 8: ASICS KAYANO 14 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES
('Asics Gel-Kayano 14', 'O retorno da lenda da corrida. Edição Cream Silver.', '/uploads/asycskayano/1.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Design técnico e visual anos 2000. Edição White Blue.', '/uploads/asycskayano/2.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Estética metálica inconfundível. Edição Silver Cream.', '/uploads/asycskayano/3.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Minimalismo com performance. Edição White Black.', '/uploads/asycskayano/4.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Toque feminino com alta tecnologia. Edição White Pink.', '/uploads/asycskayano/5.png', 1499.90, 19, 5, 5, 'KAYANO14'),

-- --- LOTE 9: BAPE STA ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('A Bathing Ape Bape Sta', 'O ícone do streetwear japonês. Edição White Black Star.', '/uploads/bapesta/1.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Exclusividade e design premium. Edição Grey White.', '/uploads/bapesta/2.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Cor vibrante para destacar o look. Edição Orange White.', '/uploads/bapesta/3.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Detalhes em verde clássico Bape. Edição Green White.', '/uploads/bapesta/4.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Contraste forte e marcante. Edição Black White.', '/uploads/bapesta/5.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Azul intenso e couro envernizado. Edição Blue White.', '/uploads/bapesta/6.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'O camuflado clássico da Bape. Edição Black Camo.', '/uploads/bapesta/7.png', 2199.90, 20, 3, 4, 'BAPE');

-- --- LOTE 10: AIR FORCE CPFM ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1 x CPFM', 'Colaboração exclusiva com letreiro lateral. Edição Black.', '/uploads/cpfm/1.png', 2499.90, 21, 2, 1, 'CPFM'),
('Nike Air Force 1 x CPFM', 'Design artístico e ousado. Edição White.', '/uploads/cpfm/2.png', 2499.90, 21, 2, 1, 'CPFM');

-- --- LOTE 11: CROCS BAPE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs x Bape', 'Conforto Crocs com camuflagem Bape. Edição Green Camo.', '/uploads/crocsbape/1.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Estilo furtivo e exclusivo. Edição Black Camo.', '/uploads/crocsbape/2.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Destaque-se com o camuflado rosa. Edição Pink Camo.', '/uploads/crocsbape/3.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Visual único e confortável. Edição Blue Camo.', '/uploads/crocsbape/4.png', 599.90, 22, 10, 9, 'CROCS');

-- --- LOTE 12: CROCS MCQUEEN ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs Cars Lightning McQueen', 'Katchau! Edição limitada Relâmpago McQueen com luzes.', '/uploads/crocsmaqueen/1.png', 499.90, 23, 10, 9, 'MCQUEEN'),
('Crocs Cars Mater', 'O gancho mais famoso de Radiator Springs. Edição Mate.', '/uploads/crocsmaqueen/2.png', 499.90, 23, 10, 9, 'MCQUEEN');

-- --- LOTE 13: DIOR B30 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Dior B30', 'O ápice do luxo esportivo. Edição Black White.', '/uploads/diorb30/1.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Sofisticação em cada detalhe. Edição Triple Black.', '/uploads/diorb30/2.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Design contemporâneo da alta costura. Edição White Grey.', '/uploads/diorb30/3.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Materiais refletivos de alta tecnologia. Edição Grey Reflective.', '/uploads/diorb30/4.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Pureza e elegância Dior. Edição White Mesh.', '/uploads/diorb30/5.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Exclusividade em tom marinho. Edição Navy Blue.', '/uploads/diorb30/6.png', 5999.90, 24, 2, 11, 'B30');

-- --- LOTE 14: AIR MAX DN (ID 2) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN', 'A nova era do Air. Tecnologia Dynamic Air. Edição Sail.', '/uploads/dn/1.png', 1299.90, 2, 8, 1, 'DN'),
('Nike Air Max DN', 'Visual futurista e conforto surreal. Edição Volt.', '/uploads/dn/2.png', 1299.90, 2, 8, 1, 'DN'),
('Nike Air Max DN', 'Design moderno e agressivo. Edição Black Anthracite.', '/uploads/dn/3.png', 1299.90, 2, 8, 1, 'DN'),
('Nike Air Max DN', 'Estética clean com tecnologia de ponta. Edição Pure Platinum.', '/uploads/dn/4.png', 1299.90, 2, 8, 1, 'DN'),
('Nike Air Max DN', 'O equilíbrio perfeito. Edição Black White.', '/uploads/dn/5.png', 1299.90, 2, 8, 1, 'DN'),
('Nike Air Max DN', 'Colaboração exclusiva e limitada. Edição Supreme Black.', '/uploads/dn/6.png', 1599.90, 2, 5, 1, 'DN'),
('Nike Air Max DN', 'Cores vibrantes do futuro. Edição Hyper Violet.', '/uploads/dn/7.png', 1299.90, 2, 8, 1, 'DN');

-- --- LOTE 15: AIR MAX DN8 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN8', 'Evolução máxima do amortecimento. Edição Blue Void.', '/uploads/dn8/1.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Sombrio e tecnológico. Edição Black Grey.', '/uploads/dn8/2.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Profundidade e elegância. Edição Midnight Navy.', '/uploads/dn8/3.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Visual limpo e moderno. Edição White Blue.', '/uploads/dn8/4.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Detalhes em neon que chamam atenção. Edição White Volt.', '/uploads/dn8/5.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Contraste esportivo dinâmico. Edição Grey Orange.', '/uploads/dn8/6.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Clássico repaginado para o futuro. Edição White Black.', '/uploads/dn8/7.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Cores do pôr do sol. Edição Sunset.', '/uploads/dn8/8.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Energia pura em cada passo. Edição Volt Black.', '/uploads/dn8/9.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Estilo robusto e moderno. Edição Black Green.', '/uploads/dn8/10.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Tons neutros com atitude. Edição Grey Green.', '/uploads/dn8/11.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Leveza visual e conforto. Edição Light Grey.', '/uploads/dn8/12.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Sofisticação urbana. Edição Tan.', '/uploads/dn8/13.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Estampa exclusiva e ousada. Edição White Pattern.', '/uploads/dn8/14.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Visual gráfico impactante. Edição Black Pattern.', '/uploads/dn8/15.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Discrição e tecnologia. Edição Anthracite.', '/uploads/dn8/16.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Toque de cor vibrante. Edição Black Pink.', '/uploads/dn8/17.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Estilo marcante e moderno. Edição Pink Black.', '/uploads/dn8/18.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Agressividade e performance. Edição Black Red.', '/uploads/dn8/19.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Destaque-se na multidão. Edição Pink Red.', '/uploads/dn8/20.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Força e impacto visual. Edição Red Black.', '/uploads/dn8/21.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Cor única e diferenciada. Edição Purple.', '/uploads/dn8/22.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Inspirado no militarismo urbano. Edição Olive.', '/uploads/dn8/23.png', 1399.90, 26, 6, 1, 'DN8');

-- --- LOTE 16: AIR MAX DRIFT ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max Plus Drift', 'A evolução agressiva do TN. Edição Light Blue.', '/uploads/drift/1.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Visual imponente e estruturado. Edição Black.', '/uploads/drift/2.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Design futurista em tons frios. Edição Grey Blue.', '/uploads/drift/3.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Velocidade e estilo. Edição Red Black.', '/uploads/drift/4.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'O contraste Panda numa silhueta moderna. Preto e Branco.', '/uploads/drift/5.png', 1199.90, 27, 8, 1, 'DRIFT');

-- --- LOTE 17: NIKE DUNK ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Dunk Low', 'Colaboração lendária Travis Scott. Edição Limitada.', '/uploads/dunk/1.png', 2999.90, 28, 2, 1, 'DUNK'),
('Nike Dunk Low', 'Neutro e fácil de combinar. Edição Grey Fog.', '/uploads/dunk/2.png', 899.90, 28, 10, 1, 'DUNK'),
('Nike Dunk Low', 'O essencial do dia a dia. Edição Grey White.', '/uploads/dunk/3.png', 899.90, 28, 10, 1, 'DUNK'),
('Nike Dunk Low', 'Homenagem às cores universitárias. Edição University Blue.', '/uploads/dunk/4.png', 999.90, 28, 8, 1, 'DUNK'),
('Nike Dunk Low', 'O fenômeno das ruas. O clássico Panda Preto e Branco.', '/uploads/dunk/5.png', 999.90, 28, 15, 1, 'DUNK'),
('Nike Dunk Low', 'Vermelho vibrante e estilo retro. Edição Gym Red.', '/uploads/dunk/6.png', 899.90, 28, 8, 1, 'DUNK'),

-- --- LOTE 18: NIKE NOCTA GLIDE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Glide', 'Inspirado no basquete dos anos 90 por Drake. Edição White Grey.', '/uploads/glide/1.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Design fluido e detalhes premium. Edição Black White.', '/uploads/glide/2.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Visual limpo e futurista. Edição Triple White.', '/uploads/glide/3.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Acabamento cromado exclusivo. Edição Black Chrome.', '/uploads/glide/4.png', 1199.90, 29, 5, 1, 'GLIDE');

-- --- LOTE 19: AIR JORDAN 4 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 4 Retro', 'O mais desejado de todos. Edição Black Cat.', '/uploads/jordan4/1.png', 1899.90, 30, 3, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Versatilidade e história. Edição Military Black.', '/uploads/jordan4/2.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Amarelo vibrante que marca presença. Edição Lightning.', '/uploads/jordan4/3.png', 1499.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Detalhes metálicos em roxo. Edição Metallic Purple.', '/uploads/jordan4/4.png', 1499.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'O clássico reinventado em couro. Edição Bred Reimagined.', '/uploads/jordan4/5.png', 1699.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Contraste poderoso. Edição Thunder.', '/uploads/jordan4/6.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Vermelho intenso e atitude. Edição Red Thunder.', '/uploads/jordan4/7.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Otimizado para o skate, estilo para a vida. Edição Pine Green SB.', '/uploads/jordan4/8.png', 1799.90, 30, 3, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Um ícone de 1989 está de volta. Edição Military Blue.', '/uploads/jordan4/9.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'A cor original de Michael Jordan. Edição Fire Red.', '/uploads/jordan4/10.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Clean com detalhes salpicados. Edição White Oreo.', '/uploads/jordan4/11.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Camurça premium em azul universitário. Edição University Blue.', '/uploads/jordan4/12.png', 1699.90, 30, 5, 2, 'AJ4');

-- --- LOTE 20: LV TRAINER ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('LV Trainer', 'Luxo e streetwear por Virgil Abloh. Edição Black Denim.', '/uploads/lvtrainer/1.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Sofisticação em azul claro. Edição Light Blue.', '/uploads/lvtrainer/2.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Elegância atemporal. Edição Navy Blue.', '/uploads/lvtrainer/3.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Preto absoluto e discreto. Edição Noir.', '/uploads/lvtrainer/4.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Toque de cor icônico da maison. Edição Green.', '/uploads/lvtrainer/5.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'A pureza do design LV. Edição White.', '/uploads/lvtrainer/6.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Monograma clássico em relevo. Edição Black Monogram.', '/uploads/lvtrainer/7.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Combinação sóbria e moderna. Edição Black Grey.', '/uploads/lvtrainer/8.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'O charme do denim de luxo. Edição Blue Denim.', '/uploads/lvtrainer/9.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Neutro e extremamente chique. Edição Grey White.', '/uploads/lvtrainer/10.png', 4999.90, 31, 2, 10, 'LV');

-- --- LOTE 21: NEW BALANCE 530 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 530', 'O queridinho do estilo retro running. Edição White Green.', '/uploads/nb530/1.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'Conforto leve e visual clássico. Edição Black White.', '/uploads/nb530/2.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'Detalhes em azul para um look fresh. Edição White Blue.', '/uploads/nb530/3.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'Brilho sutil e elegância. Edição White Silver.', '/uploads/nb530/4.png', 799.90, 32, 10, 6, 'NB530');

-- --- LOTE 22: NEW BALANCE 740 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 740', 'Estética Y2K com performance moderna. Edição Black Silver.', '/uploads/nb740/1.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'Visual limpo com toque esportivo. Edição White Green.', '/uploads/nb740/2.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'Futurista e ousado. Edição Silver Metallic.', '/uploads/nb740/3.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'Clássico e versátil. Edição White Blue.', '/uploads/nb740/4.png', 899.90, 33, 8, 6, 'NB740');

-- --- LOTE 23: NEW BALANCE 1000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 1000', 'Design inovador e texturas premium. Edição Angora.', '/uploads/nb1000/1.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Visual técnico e moderno. Edição Silver Metallic.', '/uploads/nb1000/2.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Brilho e sofisticação. Edição Black Ice.', '/uploads/nb1000/3.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Combinação de cores única. Edição Pink Brown.', '/uploads/nb1000/4.png', 1099.90, 34, 6, 6, 'NB1000');

-- --- LOTE 24: NEW BALANCE 9060 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 9060', 'Sola volumosa e design agressivo. Edição Black Red.', '/uploads/nb9060/1.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Futurismo e conforto extremo. Edição Black Castlerock.', '/uploads/nb9060/2.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'O contraste perfeito. Edição Oreo.', '/uploads/nb9060/3.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Tons neutros e elegantes. Edição Sea Salt.', '/uploads/nb9060/4.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Estilo orgânico e natural. Edição Driftwood.', '/uploads/nb9060/5.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Azul profundo e sofisticado. Edição Navy.', '/uploads/nb9060/6.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Suavidade em tons pastéis. Edição Blue Haze.', '/uploads/nb9060/7.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Essencial e moderno. Edição Black White.', '/uploads/nb9060/8.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Tons minerais únicos. Edição Quartz Grey.', '/uploads/nb9060/9.png', 1199.90, 35, 8, 6, 'NB9060');

-- --- LOTE 25: NIKE VOMERO 5 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Zoom Vomero 5', 'A tendência Dad Shoe com conforto máximo. Edição Cobblestone.', '/uploads/nikevomero/1.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Visual rápido e moderno. Edição Supersonic.', '/uploads/nikevomero/2.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Tons metálicos e malha respirável. Edição Iron Ore.', '/uploads/nikevomero/3.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Discreto e cheio de tecnologia. Edição Triple Black.', '/uploads/nikevomero/4.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'O branco gelo que eleva qualquer look. Edição Photon Dust.', '/uploads/nikevomero/5.png', 1099.90, 36, 10, 1, 'VOMERO');

-- --- LOTE 26: NOCTA HOT STEP 2 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Hot Step 2', 'A evolução da parceria com Drake. Edição Black.', '/uploads/noctahotstep/1.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'Cor vibrante que rouba a cena. Edição Total Orange.', '/uploads/noctahotstep/2.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'Design clean e futurista. Edição White.', '/uploads/noctahotstep/3.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'Tom exclusivo e sofisticado. Edição Eggplant.', '/uploads/noctahotstep/4.png', 1399.90, 37, 5, 1, 'HOTSTEP');

-- --- LOTE 27: NIKE P-6000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike P-6000', 'Estilo de corrida dos anos 2000. Edição Black.', '/uploads/p6000/1.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'Visual esportivo retrô. Edição White Red.', '/uploads/p6000/2.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'Detalhes dourados para um toque premium. Edição White Gold.', '/uploads/p6000/3.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'A era de prata da corrida. Edição Metallic Silver.', '/uploads/p6000/4.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'Azul clássico e versátil. Edição Blue Silver.', '/uploads/p6000/5.png', 899.90, 38, 12, 1, 'P6000');

-- --- LOTE 28: PUMA 180 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma-180', 'Estilo skate chunky dos anos 90. Edição Cordura Grey.', '/uploads/puma180/1.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Visual limpo e volumoso. Edição White Grey.', '/uploads/puma180/2.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Sombrio e estiloso. Edição Dark Grey.', '/uploads/puma180/3.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Detalhes suaves em azul. Edição White Blue.', '/uploads/puma180/4.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Tons quentes e diferenciados. Edição Chocolate.', '/uploads/puma180/5.png', 799.90, 39, 8, 7, 'PUMA180');

-- --- LOTE 29: NIKE SHOX TL ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Shox TL', 'O retorno das 12 molas. Impacto visual White Silver.', '/uploads/shox/1.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'Agressivo e mecânico. Edição Triple Black.', '/uploads/shox/2.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'Futurismo puro. Edição Metallic Silver.', '/uploads/shox/3.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'O contraste clássico das molas. Edição White Black.', '/uploads/shox/4.png', 1199.90, 40, 5, 1, 'SHOX');

-- --- LOTE 30: YEEZY SLIDE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Yeezy Slide', 'Conforto minimalista revolucionário. Edição Slate.', '/uploads/slide/1.png', 499.90, 41, 20, 12, 'SLIDE'),
('Yeezy Slide', 'Estilo orgânico e neutro. Edição Bone.', '/uploads/slide/2.png', 499.90, 41, 20, 12, 'SLIDE');

-- --- LOTE 31: PUMA SUEDE XL ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma Suede XL', 'O clássico agora exagerado e confortável. White Green.', '/uploads/suede/1.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Estilo retro com cadarços fat. Edição Maroon.', '/uploads/suede/2.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Sola gum clássica e camurça preta. Edição Black Gum.', '/uploads/suede/3.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Visual all-black robusto. Edição Triple Black.', '/uploads/suede/4.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Limpo e impactante. Edição White.', '/uploads/suede/5.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Energia vermelha para o seu outfit. Edição Red.', '/uploads/suede/6.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Azul real vibrante. Edição Royal Blue.', '/uploads/suede/7.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'O OG remasterizado. Edição Black White.', '/uploads/suede/8.png', 599.90, 42, 10, 7, 'SUEDE');

-- --- LOTE 32: TIMBERLAND ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Timberland 6-Inch', 'A bota amarela original à prova d''água. Edição Chocolate.', '/uploads/timbis/1.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch', 'Durabilidade e estilo urbano. Edição Black Nobuck.', '/uploads/timbis/2.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch', 'Toque militar e robusto. Edição Olive.', '/uploads/timbis/3.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch', 'O clássico absoluto. Edição Wheat Yellow.', '/uploads/timbis/4.png', 999.90, 10, 5, 8, 'TIMBERLAND');

-- --- LOTE 33: AIR MAX TN (TN1) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max TN', 'O Tubarão original com tecnologia Tuned Air. Edição Black Blue.', '/uploads/tn1/1.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Degradê agressivo laranja. Edição Tiger.', '/uploads/tn1/2.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Sóbrio e icônico. Edição Grey Black.', '/uploads/tn1/3.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Base preta com destaque branco. Edição Black Swoosh.', '/uploads/tn1/4.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Roxo elétrico que chama atenção. Edição Voltage Purple.', '/uploads/tn1/5.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'O azul clássico do TN. Edição Hyper Blue.', '/uploads/tn1/6.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Cores inspiradas na bandeira francesa. Edição France.', '/uploads/tn1/7.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Fresco e impactante. Edição Glacier Blue.', '/uploads/tn1/8.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Limpo e futurista. Edição Triple White.', '/uploads/tn1/9.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Stealth total. O mais procurado. Edição Triple Black.', '/uploads/tn1/10.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Vermelho e preto intenso. Edição Deadpool.', '/uploads/tn1/11.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Degradê pôr do sol inconfundível. Edição Sunset.', '/uploads/tn1/12.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Branco com detalhes verdes. Edição Celtics.', '/uploads/tn1/13.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Elegância esportiva. Edição White Royal.', '/uploads/tn1/14.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Contraste forte. Edição Black Orange.', '/uploads/tn1/15.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Roxo clássico e atemporal. Edição Grape.', '/uploads/tn1/16.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Azul céu vibrante. Edição Sky Blue.', '/uploads/tn1/17.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Branco com detalhes vermelhos. Edição White Red.', '/uploads/tn1/18.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Preto com brilho prata. Edição Black Silver.', '/uploads/tn1/19.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Turquesa que se destaca. Edição Aqua.', '/uploads/tn1/20.png', 1199.90, 3, 8, 1, 'TN');

-- --- LOTE 34: AIR MAX TN3 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max TN3', 'A evolução aerodinâmica do TN. Edição Black Blue.', '/uploads/tn3/1.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'Design rápido e futurista. Edição White Blue.', '/uploads/tn3/2.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'Visual clean com linhas agressivas. Edição Triple White.', '/uploads/tn3/3.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'Preto e vermelho poderoso. Edição Black Red.', '/uploads/tn3/4.png', 1299.90, 43, 6, 1, 'TN3');
