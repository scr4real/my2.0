-- ==================================================================================
-- ARQUIVO: BACK/src/main/resources/data.sql
-- ==================================================================================

-- 1. LIMPEZA DE DADOS
DELETE FROM itens_pedido;
DELETE FROM pagamentos;
DELETE FROM pedido_aviso;
DELETE FROM pedidos;
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
(25, 'Air Max DN'),
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
(39, 'Puma 180'),      -- NOVO
(40, 'Nike Shox'),     -- NOVO
(41, 'Yeezy Slide'),   -- NOVO
(42, 'Puma Suede'),    -- NOVO
(43, 'Air Max TN3');   -- NOVO

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
('Nike Air Max 95', 'Midnight Navy / Roxo e Azul Escuro', '/uploads/95/1.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Dark Grey Green / Cinza Escuro e Verde', '/uploads/95/2.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Anatomy of Air / Vermelho, Rosa e Bege', '/uploads/95/3.png', 1249.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Grey Essential / Preto e Cinza', '/uploads/95/4.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Triple Black / Totalmente Preto', '/uploads/95/5.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Pure Platinum / Branco e Cinza Claro', '/uploads/95/6.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Grey Turquoise / Cinza com Detalhe Turquesa', '/uploads/95/7.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Solar Red / Cinza e Vermelho Solar', '/uploads/95/8.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Crystal Blue / Degradê Cinza e Azul', '/uploads/95/9.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Essential / Preto Básico', '/uploads/95/10.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Triple White / Totalmente Branco', '/uploads/95/11.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Royal Blue / Preto e Azul Real', '/uploads/95/12.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Oreo / Preto, Branco e Cinza', '/uploads/95/13.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Rough Green / Verde Militar', '/uploads/95/14.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'White Total Orange / Branco e Laranja', '/uploads/95/15.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Dark Grey Orange / Cinza Escuro e Laranja', '/uploads/95/16.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Neutral Olive / Cinza e Oliva', '/uploads/95/17.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Anthracite / Preto Carvão', '/uploads/95/18.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Grey Varsity Red / Cinza e Vermelho', '/uploads/95/19.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Blue / Preto com Sola Azul', '/uploads/95/20.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Summit White / Branco Gelo', '/uploads/95/21.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Dark Grey Yellow / Cinza e Amarelo', '/uploads/95/22.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Sequoia Green / Cinza e Verde Musgo', '/uploads/95/23.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Tour Yellow / Preto e Amarelo', '/uploads/95/24.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Cool Grey / Cinza Clássico', '/uploads/95/25.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Royal / Preto e Azul', '/uploads/95/26.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Triple Black Leather / Preto Couro Premium', '/uploads/95/27.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'White Essential / Branco Básico', '/uploads/95/28.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG', 'Neon Yellow / Cinza e Neon Clássico', '/uploads/95/29.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Bred / Preto e Vermelho', '/uploads/95/30.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Wolf Grey / Cinza Lobo', '/uploads/95/31.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Grey Volt / Cinza e Verde Lima', '/uploads/95/32.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Navy Blue / Azul Marinho', '/uploads/95/33.png', 1149.90, 1, 10, 1, 'AM95');

-- --- LOTE 2: ADIDAS CAMPUS ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Adidas Campus 00s', 'Pink Strata / Rosa e Branco', '/uploads/adidascampus/1.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Purple / Roxo e Preto', '/uploads/adidascampus/2.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Beige Black / Bege e Preto', '/uploads/adidascampus/3.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'White Green / Branco e Verde', '/uploads/adidascampus/4.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Crystal White / Bege Claro', '/uploads/adidascampus/5.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'White Black / Branco e Preto', '/uploads/adidascampus/6.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Core Black / Preto e Branco', '/uploads/adidascampus/7.png', 699.90, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s', 'Olive Green / Verde Oliva', '/uploads/adidascampus/8.png', 699.90, 13, 10, 3, 'CAMPUS');

-- --- LOTE 3: AIR FORCE 1 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1', 'Triple White / Todo Branco', '/uploads/airforce/1.png', 799.90, 14, 15, 1, 'AF1'),
('Nike Air Force 1', 'Triple Black / Todo Preto', '/uploads/airforce/2.png', 799.90, 14, 15, 1, 'AF1');

-- --- LOTE 4: AIR JORDAN 11 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 11 Retro', 'Jubilee / Preto e Branco Alto', '/uploads/airjordan11/1.png', 1599.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Black White / Preto Verniz Baixo', '/uploads/airjordan11/2.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'Concord / Branco e Preto Alto', '/uploads/airjordan11/3.png', 1699.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Concord / Branco e Preto Baixo', '/uploads/airjordan11/4.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'Bred / Preto e Vermelho Alto', '/uploads/airjordan11/5.png', 1699.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Bred / Preto e Vermelho Baixo', '/uploads/airjordan11/6.png', 1399.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Retro', 'Cherry / Branco e Vermelho Alto', '/uploads/airjordan11/7.png', 1599.90, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low', 'Cherry / Branco e Vermelho Baixo', '/uploads/airjordan11/8.png', 1399.90, 15, 5, 2, 'AJ11');

-- --- LOTE 5: AIR MAX 97 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 97', 'Black White / Preto e Branco', '/uploads/airmax97/1.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'White Bone / Branco Osso', '/uploads/airmax97/3.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Triple Black / Totalmente Preto', '/uploads/airmax97/4.png', 1099.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Silver Bullet / Prata e Vermelho', '/uploads/airmax97/5.png', 1199.90, 16, 8, 1, 'AM97'),
('Nike Air Max 97', 'Light Blue / Azul Claro e Branco', '/uploads/airmax97/6.png', 1099.90, 16, 8, 1, 'AM97');

-- --- LOTE 6: AIR MAX 90 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 90', 'Maroon / Branco e Vinho', '/uploads/airmax90/9.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Infrared / Branco, Preto e Vermelho', '/uploads/airmax90/10.png', 1099.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Laser Blue / Branco e Azul Laser', '/uploads/airmax90/11.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Hyper Turquoise / Branco e Turquesa', '/uploads/airmax90/12.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Grape / Branco, Roxo e Verde', '/uploads/airmax90/14.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Triple White / Totalmente Branco', '/uploads/airmax90/15.png', 999.90, 17, 10, 1, 'AM90'),
('Nike Air Max 90', 'Black White / Preto e Branco', '/uploads/airmax90/16.png', 999.90, 17, 10, 1, 'AM90');

-- --- LOTE 7: ASICS GEL NYC ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Asics Gel-NYC', 'Cream Grey / Creme e Cinza', '/uploads/asycsnyc/1.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Light Blue / Azul Claro e Prata', '/uploads/asycsnyc/2.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'White Blue / Branco e Azul', '/uploads/asycsnyc/3.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Black Graphite / Preto Grafite', '/uploads/asycsnyc/4.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'White Royal / Branco e Azul Real', '/uploads/asycsnyc/5.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Oatmeal / Bege e Cinza', '/uploads/asycsnyc/6.png', 1399.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Silver Cream / Prata e Creme', '/uploads/asycsnyc/7.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Navy Grey / Azul Marinho e Cinza', '/uploads/asycsnyc/8.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Glacier Grey / Cinza Glacial', '/uploads/asycsnyc/9.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Midnight Navy / Azul Marinho', '/uploads/asycsnyc/10.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'White Green / Branco e Verde', '/uploads/asycsnyc/11.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Pure Silver / Prata Puro', '/uploads/asycsnyc/12.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Black Cream / Preto e Creme', '/uploads/asycsnyc/13.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Obsidian / Azul Obsidiana', '/uploads/asycsnyc/14.png', 1299.90, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC', 'Pink Cream / Rosa e Creme', '/uploads/asycsnyc/15.png', 1399.90, 18, 5, 5, 'GELNYC');

-- --- LOTE 8: ASICS KAYANO 14 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Asics Gel-Kayano 14', 'Cream Silver / Creme e Prata', '/uploads/asycskayano/17.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'White Blue / Branco e Azul', '/uploads/asycskayano/18.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Silver Cream / Prata', '/uploads/asycskayano/19.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'White Black / Branco e Preto', '/uploads/asycskayano/20.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'White Pink / Branco e Rosa', '/uploads/asycskayano/21.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Metallic Silver / Prata Metálico', '/uploads/asycskayano/23.png', 1499.90, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14', 'Black Silver / Preto e Prata', '/uploads/asycskayano/29.png', 1499.90, 19, 5, 5, 'KAYANO14');

-- --- LOTE 9: BAPE STA ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('A Bathing Ape Bape Sta', 'White Black Star / Branco e Estrela Preta', '/uploads/bapesta/16.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Grey White / Cinza e Branco', '/uploads/bapesta/17.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Orange White / Laranja e Branco', '/uploads/bapesta/18.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Green White / Verde e Branco', '/uploads/bapesta/19.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Black White / Preto e Branco', '/uploads/bapesta/20.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Blue White / Azul e Branco', '/uploads/bapesta/21.png', 1999.90, 20, 3, 4, 'BAPE'),
('A Bathing Ape Bape Sta', 'Black Camo / Preto e Camuflado', '/uploads/bapesta/22.png', 2199.90, 20, 3, 4, 'BAPE');

-- --- LOTE 10: AIR FORCE CPFM ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1 x CPFM', 'Black / Preto com Letras', '/uploads/cpfm/1.png', 2499.90, 21, 2, 1, 'CPFM'),
('Nike Air Force 1 x CPFM', 'White / Branco com Letras', '/uploads/cpfm/2.png', 2499.90, 21, 2, 1, 'CPFM');

-- --- LOTE 11: CROCS BAPE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs x Bape', 'Green Camo / Verde Camuflado', '/uploads/crocsbape/3.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Black Camo / Preto Camuflado', '/uploads/crocsbape/4.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Pink Camo / Rosa Camuflado', '/uploads/crocsbape/5.png', 599.90, 22, 10, 9, 'CROCS'),
('Crocs x Bape', 'Blue Camo / Azul Camuflado', '/uploads/crocsbape/6.png', 599.90, 22, 10, 9, 'CROCS');

-- --- LOTE 12: CROCS MCQUEEN ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs Cars Lightning McQueen', 'Classic Red / Vermelho Relâmpago McQueen', '/uploads/crocsmaqueen/7.png', 499.90, 23, 10, 9, 'MCQUEEN'),
('Crocs Cars Mater', 'Mater Brown / Marrom Mate', '/uploads/crocsmaqueen/8.png', 499.90, 23, 10, 9, 'MCQUEEN');

-- --- LOTE 13: DIOR B30 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Dior B30', 'Black White / Preto e Branco', '/uploads/diorb30/9.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Triple Black / Totalmente Preto', '/uploads/diorb30/10.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'White Grey / Branco e Cinza', '/uploads/diorb30/11.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Grey Reflective / Cinza Refletivo', '/uploads/diorb30/12.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'White Mesh / Branco', '/uploads/diorb30/13.png', 5999.90, 24, 2, 11, 'B30'),
('Dior B30', 'Navy Blue / Azul Marinho', '/uploads/diorb30/14.png', 5999.90, 24, 2, 11, 'B30');

-- --- LOTE 14: AIR MAX DN ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN', 'Sail / Branco Creme', '/uploads/dn/1.png', 1299.90, 25, 8, 1, 'DN'),
('Nike Air Max DN', 'Volt / Verde Neon', '/uploads/dn/2.png', 1299.90, 25, 8, 1, 'DN'),
('Nike Air Max DN', 'Black Anthracite / Preto', '/uploads/dn/3.png', 1299.90, 25, 8, 1, 'DN'),
('Nike Air Max DN', 'Pure Platinum / Prata', '/uploads/dn/4.png', 1299.90, 25, 8, 1, 'DN'),
('Nike Air Max DN', 'Black White / Preto e Branco', '/uploads/dn/5.png', 1299.90, 25, 8, 1, 'DN'),
('Nike Air Max DN', 'Supreme Black / Preto Supreme', '/uploads/dn/6.png', 1599.90, 25, 5, 1, 'DN'),
('Nike Air Max DN', 'Hyper Violet / Preto e Roxo', '/uploads/dn/7.png', 1299.90, 25, 8, 1, 'DN');

-- --- LOTE 15: AIR MAX DN8 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN8', 'Blue Void / Azul e Preto', '/uploads/dn8/8.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Black Grey / Preto e Cinza', '/uploads/dn8/9.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Midnight Navy / Azul Escuro', '/uploads/dn8/10.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'White Blue / Branco e Azul', '/uploads/dn8/11.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'White Volt / Branco e Verde', '/uploads/dn8/12.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Grey Orange / Cinza e Laranja', '/uploads/dn8/13.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'White Black / Branco e Preto', '/uploads/dn8/14.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Sunset / Laranja e Roxo', '/uploads/dn8/15.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Volt Black / Verde e Preto', '/uploads/dn8/16.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Black Green / Preto e Verde', '/uploads/dn8/17.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Grey Green / Cinza e Verde', '/uploads/dn8/18.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Light Grey / Cinza Claro', '/uploads/dn8/19.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Tan / Bege', '/uploads/dn8/20.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'White Black Pattern / Branco Estampado', '/uploads/dn8/21.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Black White Pattern / Preto Estampado', '/uploads/dn8/22.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Anthracite / Cinza Escuro', '/uploads/dn8/23.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Black Pink / Preto e Rosa', '/uploads/dn8/24.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Pink Black / Rosa e Preto', '/uploads/dn8/25.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Black Red / Preto e Vermelho', '/uploads/dn8/26.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Pink Red / Rosa Choque', '/uploads/dn8/27.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Red Black / Vermelho e Preto', '/uploads/dn8/28.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Purple / Roxo', '/uploads/dn8/29.png', 1399.90, 26, 6, 1, 'DN8'),
('Nike Air Max DN8', 'Olive / Verde Oliva', '/uploads/dn8/30.png', 1399.90, 26, 6, 1, 'DN8');

-- --- LOTE 16: AIR MAX DRIFT ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max Plus Drift', 'Light Blue / Azul Claro', '/uploads/drift/1.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Black / Preto', '/uploads/drift/2.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Grey Blue / Cinza e Azul', '/uploads/drift/3.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Red Black / Vermelho e Preto', '/uploads/drift/4.png', 1199.90, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift', 'Panda / Preto e Branco', '/uploads/drift/5.png', 1199.90, 27, 8, 1, 'DRIFT');

-- --- LOTE 17: NIKE DUNK ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Dunk Low', 'Travis Scott / Bege e Xadrez', '/uploads/dunk/10.png', 2999.90, 28, 2, 1, 'DUNK'),
('Nike Dunk Low', 'Grey Fog / Cinza e Branco', '/uploads/dunk/11.png', 899.90, 28, 10, 1, 'DUNK'),
('Nike Dunk Low', 'Grey White / Cinza Escuro', '/uploads/dunk/12.png', 899.90, 28, 10, 1, 'DUNK'),
('Nike Dunk Low', 'University Blue / Azul e Branco', '/uploads/dunk/13.png', 999.90, 28, 8, 1, 'DUNK'),
('Nike Dunk Low', 'Panda / Preto e Branco', '/uploads/dunk/14.png', 999.90, 28, 15, 1, 'DUNK'),
('Nike Dunk Low', 'Gym Red / Vermelho e Branco', '/uploads/dunk/15.png', 899.90, 28, 8, 1, 'DUNK'),
('Nike Dunk Low', 'Reverse Panda / Branco e Preto', '/uploads/dunk/16.png', 899.90, 28, 10, 1, 'DUNK');

-- --- LOTE 18: NIKE NOCTA GLIDE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Glide', 'White Grey / Branco e Cinza', '/uploads/glide/6.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Black White / Preto e Branco', '/uploads/glide/7.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Triple White / Totalmente Branco', '/uploads/glide/8.png', 1199.90, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide', 'Black Chrome / Preto com Sola Branca', '/uploads/glide/9.png', 1199.90, 29, 5, 1, 'GLIDE');

-- --- LOTE 19: AIR JORDAN 4 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 4 Retro', 'Black Cat / Totalmente Preto', '/uploads/jordan4/17.png', 1899.90, 30, 3, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Military Black / Branco e Preto', '/uploads/jordan4/18.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Lightning / Amarelo e Preto', '/uploads/jordan4/19.png', 1499.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Metallic Purple / Branco e Roxo', '/uploads/jordan4/20.png', 1499.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Bred Reimagined / Preto e Vermelho Couro', '/uploads/jordan4/21.png', 1699.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Thunder / Preto e Amarelo', '/uploads/jordan4/22.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Red Thunder / Preto e Vermelho', '/uploads/jordan4/23.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Pine Green SB / Branco e Verde', '/uploads/jordan4/24.png', 1799.90, 30, 3, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Military Blue / Branco e Azul', '/uploads/jordan4/25.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'Fire Red / Branco e Vermelho', '/uploads/jordan4/26.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'White Oreo / Branco e Cinza', '/uploads/jordan4/27.png', 1599.90, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Retro', 'University Blue / Azul Camurça', '/uploads/jordan4/28.png', 1699.90, 30, 5, 2, 'AJ4');

-- --- LOTE 20: LV TRAINER ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('LV Trainer', 'Black White Denim / Preto e Jeans', '/uploads/lvtrainer/6.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Light Blue / Azul Claro', '/uploads/lvtrainer/7.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Navy Blue / Azul Marinho', '/uploads/lvtrainer/8.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Noir / Preto Total', '/uploads/lvtrainer/9.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Green / Branco e Verde', '/uploads/lvtrainer/10.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'White / Branco Total', '/uploads/lvtrainer/11.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Black Monogram / Preto Monograma', '/uploads/lvtrainer/12.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Black Grey / Preto e Cinza', '/uploads/lvtrainer/13.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Blue Denim / Jeans Azul', '/uploads/lvtrainer/14.png', 4999.90, 31, 2, 10, 'LV'),
('LV Trainer', 'Grey White / Cinza e Branco', '/uploads/lvtrainer/15.png', 4999.90, 31, 2, 10, 'LV');

-- --- LOTE 21: NEW BALANCE 530 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 530', 'White Green / Branco e Verde', '/uploads/nb530/16.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'Black White / Preto e Branco', '/uploads/nb530/17.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'White Blue / Branco e Azul', '/uploads/nb530/18.png', 799.90, 32, 10, 6, 'NB530'),
('New Balance 530', 'White Silver / Branco e Prata', '/uploads/nb530/19.png', 799.90, 32, 10, 6, 'NB530');

-- --- LOTE 22: NEW BALANCE 740 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 740', 'Black Silver / Preto e Prata', '/uploads/nb740/20.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'White Green / Branco e Verde', '/uploads/nb740/21.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'Silver Metallic / Prata Metálico', '/uploads/nb740/22.png', 899.90, 33, 8, 6, 'NB740'),
('New Balance 740', 'White Blue / Branco e Azul', '/uploads/nb740/23.png', 899.90, 33, 8, 6, 'NB740');

-- --- LOTE 23: NEW BALANCE 1000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 1000', 'Angora Moonrock / Creme e Cinza', '/uploads/nb1000/24.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Silver Metallic / Prata', '/uploads/nb1000/25.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Black Ice / Preto Brilhante', '/uploads/nb1000/26.png', 1099.90, 34, 6, 6, 'NB1000'),
('New Balance 1000', 'Real Pink Brown / Preto e Rosa', '/uploads/nb1000/27.png', 1099.90, 34, 6, 6, 'NB1000');

-- --- LOTE 24: NEW BALANCE 9060 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 9060', 'Black Red / Preto e Vermelho', '/uploads/nb9060/29.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Black Castlerock / Preto e Cinza', '/uploads/nb9060/30.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Oreo / Branco e Preto', '/uploads/nb9060/31.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Sea Salt Grey / Cinza e Bege', '/uploads/nb9060/32.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Driftwood / Bege Escuro', '/uploads/nb9060/33.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Navy / Azul Marinho', '/uploads/nb9060/34.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Blue Haze / Azul Claro', '/uploads/nb9060/35.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Black White / Preto e Branco', '/uploads/nb9060/36.png', 1199.90, 35, 8, 6, 'NB9060'),
('New Balance 9060', 'Quartz Grey / Cinza Quartzo', '/uploads/nb9060/37.png', 1199.90, 35, 8, 6, 'NB9060');

-- --- LOTE 25: NIKE VOMERO 5 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Zoom Vomero 5', 'Cobblestone / Cinza Pedra', '/uploads/nikevomero/19.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Supersonic / Branco e Preto', '/uploads/nikevomero/20.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Iron Ore / Cinza e Prata', '/uploads/nikevomero/21.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Triple Black / Totalmente Preto', '/uploads/nikevomero/22.png', 1099.90, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5', 'Photon Dust / Branco Gelo', '/uploads/nikevomero/23.png', 1099.90, 36, 10, 1, 'VOMERO');

-- --- LOTE 26: NOCTA HOT STEP 2 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Hot Step 2', 'Black / Preto Total', '/uploads/noctahotstep/15.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'Total Orange / Laranja Total', '/uploads/noctahotstep/16.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'White / Branco Total', '/uploads/noctahotstep/17.png', 1399.90, 37, 5, 1, 'HOTSTEP'),
('Nike Nocta Hot Step 2', 'Eggplant / Roxo Beringela', '/uploads/noctahotstep/18.png', 1399.90, 37, 5, 1, 'HOTSTEP');

-- --- LOTE 27: NIKE P-6000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike P-6000', 'Black / Preto', '/uploads/p6000/10.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'White Red / Branco e Vermelho', '/uploads/p6000/11.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'White Gold / Branco e Dourado', '/uploads/p6000/12.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'Metallic Silver / Prata Metálico', '/uploads/p6000/13.png', 899.90, 38, 12, 1, 'P6000'),
('Nike P-6000', 'Blue Silver / Azul e Prata', '/uploads/p6000/14.png', 899.90, 38, 12, 1, 'P6000');

-- --- LOTE 28: PUMA 180 (ID 39, Marca 7) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma-180', 'Cordura Grey / Cinza e Preto', '/uploads/puma180/5.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'White Grey / Branco e Cinza', '/uploads/puma180/6.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Dark Grey / Cinza Escuro', '/uploads/puma180/7.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'White Blue / Branco e Azul Claro', '/uploads/puma180/8.png', 799.90, 39, 8, 7, 'PUMA180'),
('Puma-180', 'Chocolate / Marrom e Rosa', '/uploads/puma180/9.png', 799.90, 39, 8, 7, 'PUMA180');

-- --- LOTE 29: NIKE SHOX TL (ID 40, Marca 1) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Shox TL', 'White Silver / Branco e Prata', '/uploads/shox/1.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'Triple Black / Totalmente Preto', '/uploads/shox/2.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'Metallic Silver / Prata Metálico', '/uploads/shox/3.png', 1199.90, 40, 5, 1, 'SHOX'),
('Nike Shox TL', 'White Black / Branco e Preto', '/uploads/shox/4.png', 1199.90, 40, 5, 1, 'SHOX');

-- --- LOTE 30: YEEZY SLIDE (ID 41, Marca 12) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Yeezy Slide', 'Slate / Cinza Escuro', '/uploads/slide/1.png', 499.90, 41, 20, 12, 'SLIDE'),
('Yeezy Slide', 'Bone / Bege Claro', '/uploads/slide/2.png', 499.90, 41, 20, 12, 'SLIDE');

-- --- LOTE 31: PUMA SUEDE XL (ID 42, Marca 7) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma Suede XL', 'White Green / Branco e Verde', '/uploads/suede/3.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Maroon / Vinho e Branco', '/uploads/suede/4.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Black Gum / Preto e Sola Marrom', '/uploads/suede/5.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Triple Black / Totalmente Preto', '/uploads/suede/6.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'White / Branco Total', '/uploads/suede/7.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Red / Vermelho e Branco', '/uploads/suede/8.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Royal Blue / Azul e Branco', '/uploads/suede/9.png', 599.90, 42, 10, 7, 'SUEDE'),
('Puma Suede XL', 'Black White / Preto e Branco', '/uploads/suede/10.png', 599.90, 42, 10, 7, 'SUEDE');

-- --- LOTE 32: TIMBERLAND (ID 10 "Botas", Marca 8) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Timberland 6-Inch Premium', 'Chocolate / Marrom Escuro', '/uploads/timbis/11.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch Premium', 'Black / Preto Nobuck', '/uploads/timbis/12.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch Premium', 'Olive / Verde Oliva', '/uploads/timbis/13.png', 999.90, 10, 5, 8, 'TIMBERLAND'),
('Timberland 6-Inch Premium', 'Wheat / Amarelo Tradicional', '/uploads/timbis/14.png', 999.90, 10, 5, 8, 'TIMBERLAND');

-- --- LOTE 33: AIR MAX TN (TN1) (ID 3 "Air Max TN", Marca 1) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max TN', 'Black Blue Gradient / Preto e Azul', '/uploads/tn1/21.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Tiger / Laranja e Preto', '/uploads/tn1/22.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Grey Black / Cinza e Preto', '/uploads/tn1/23.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Black White Swoosh / Preto Básico', '/uploads/tn1/24.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Voltage Purple / Roxo e Preto', '/uploads/tn1/25.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Hyper Blue / Azul e Preto', '/uploads/tn1/26.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'France / Branco, Azul e Vermelho', '/uploads/tn1/27.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Glacier Blue / Azul Claro', '/uploads/tn1/28.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Triple White / Totalmente Branco', '/uploads/tn1/29.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Triple Black / Totalmente Preto', '/uploads/tn1/30.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Deadpool / Vermelho e Preto', '/uploads/tn1/31.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Sunset / Degradê Laranja e Roxo', '/uploads/tn1/32.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Celtics / Branco e Verde', '/uploads/tn1/33.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'White Royal / Branco e Azul', '/uploads/tn1/34.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Black Orange / Preto e Laranja', '/uploads/tn1/35.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Grape / Roxo e Azul', '/uploads/tn1/36.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Sky Blue / Azul Céu', '/uploads/tn1/37.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'White Red / Branco e Vermelho', '/uploads/tn1/38.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Black Silver / Preto e Prata', '/uploads/tn1/39.png', 1199.90, 3, 8, 1, 'TN'),
('Nike Air Max TN', 'Aqua / Azul Turquesa', '/uploads/tn1/40.png', 1199.90, 3, 8, 1, 'TN');

-- --- LOTE 34: AIR MAX TN3 (ID 43, Marca 1) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max TN3', 'Black Blue / Preto e Azul', '/uploads/tn3/16.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'White Blue / Branco e Azul', '/uploads/tn3/18.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'Triple White / Totalmente Branco', '/uploads/tn3/19.png', 1299.90, 43, 6, 1, 'TN3'),
('Nike Air Max TN3', 'Black Red / Preto e Vermelho', '/uploads/tn3/20.png', 1299.90, 43, 6, 1, 'TN3');