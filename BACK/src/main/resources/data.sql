-- ==================================================================================
-- JAPA UNIVERSE - DATABASE COMPLETO (TÊNIS + ROUPAS COM -35% APLICADO NO PREÇO)
-- ==================================================================================

-- 1. MARCAS
INSERT IGNORE INTO marcas (id, nome) VALUES 
(1, 'Nike'), (2, 'Air Jordan'), (3, 'Adidas'), (4, 'Bape'), (5, 'Asics'),
(6, 'New Balance'), (7, 'Puma'), (8, 'Timberland'), (9, 'Crocs'),
(10, 'Louis Vuitton'), (11, 'Dior'), (12, 'Yeezy'), (13, 'Corteiz'), 
(14, 'Trapstar'), (15, 'Syna World'), (16, 'Arc''teryx'), (17, 'Denim Tears'), 
(18, 'The North Face'), (19, 'Ralph Lauren');

-- 2. CATEGORIAS
INSERT IGNORE INTO categorias (id, nome) VALUES 
(1, 'Air Max 95'), (2, 'Air Max DN'), (3, 'Air Max TN'), (4, 'Dunk'), (5, 'Jordan'), 
(6, 'Outros'), (7, 'Acessórios'), (8, 'Casual'), (9, 'Corrida'), (10, 'Botas'), 
(11, 'Chuteiras'), (12, 'Sandálias'), (13, 'Adidas Campus'), (14, 'Air Force'),
(15, 'Air Jordan 11'), (16, 'Air Max 97'), (17, 'Air Max 90'), (18, 'Asics Gel NYC'),
(19, 'Asics Kayano 14'), (20, 'Bape Sta'), (21, 'Air Force CPFM'), (22, 'Crocs Bape'),
(23, 'Crocs McQueen'), (24, 'Dior B30'), (26, 'Air Max DN8'), (27, 'Air Max Drift'),
(28, 'Nike Dunk'), (29, 'Nike Nocta Glide'), (30, 'Air Jordan 4'), (31, 'LV Trainer'),
(32, 'New Balance 530'), (33, 'New Balance 740'), (34, 'New Balance 1000'), (35, 'New Balance 9060'),
(36, 'Nike Vomero 5'), (37, 'Nocta Hot Step 2'), (38, 'Nike P-6000'), (39, 'Puma 180'),
(40, 'Nike Shox'), (41, 'Yeezy Slide'), (42, 'Puma Suede'), (43, 'Air Max TN3'), (44, 'Nocta Hot Step 1'),
(45, 'Camisetas'), (46, 'Blusas'), (47, 'Conjuntos');

-- 3. USUÁRIO ADMIN
INSERT IGNORE INTO _usuario (id, nome, email, cpf, telefone, senha, role) VALUES 
(1, 'Vinicius Admin', 'vinicius.biancolini.tds24@gmail.com', '000.000.000-00', '11999999999', '$2a$10$C0iH.HkG8Nh73C57GC7oT.jxzLawZbas/miJPJVP2qhTcpbZI0soq', 'ROLE_ADMIN');

-- 4. CUPONS
INSERT IGNORE INTO cupons (id, codigo, desconto, tipo_desconto, data_validade) 
VALUES (1, 'SANT26', 10.00, 'PERCENTUAL', '2030-12-31');

-- ==================================================================================
-- 5. PRODUTOS - LOTE CALÇADOS (PREÇOS MANTIDOS)
-- ==================================================================================

-- AIR MAX 95
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 95 Triple Black', 'Tanque de guerra. Totalmente preto, esse pisante é pra quem quer discrição e agressividade no mesmo kit.', '/uploads/95/1.webp', 439.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Midnight Navy', 'O degradê cinza com azul marinho é sacanagem. Traz aquela vibe OG de quem entende do corre.', '/uploads/95/2.webp', 439.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Anatomy of Air', 'Inspirado na fibra muscular humana. Texturas e cores únicas pra quem coleciona relíquia.', '/uploads/95/3.webp', 439.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Royal', 'Preto com detalhes em azul royal. Aquele detalhe que brilha quando bate a luz do flash.', '/uploads/95/4.webp', 379.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Pink Foam', 'Contraste do preto pesado com rosa suave. Pra quem tem personalidade forte.', '/uploads/95/5.webp', 379.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Olive Green', 'Pegada militar tática. Verde oliva que combina demais com cargo pants.', '/uploads/95/6.webp', 379.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Stadium Green', 'Cinza com verde estádio. Visual clean e esportivo clássico dos anos 90.', '/uploads/95/7.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Solar Red', 'O detalhe vermelho solar acende o tênis. Base cinza clássica.', '/uploads/95/8.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Cool Grey', 'O cinza mais respeitado da cena. Versátil demais.', '/uploads/95/9.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Earth', 'Tons terrosos com preto. Pegada outdoor robusta.', '/uploads/95/10.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Summit White', 'Branco gelo, limpo e perigoso. Eleva qualquer outfit básico.', '/uploads/95/11.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Racer Blue', 'Cinza rasgado pelo azul racer. Uma das combinações mais icônicas.', '/uploads/95/12.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Oreo', 'Preto e branco, o famoso Oreo. Não tem erro, combina com tudo.', '/uploads/95/13.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Sequoia', 'Verde musgo militar. Estética de batalha. Visual underground.', '/uploads/95/14.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Total Orange', 'Laranja que queima. Presença absurda. Chave demais.', '/uploads/95/15.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Dark Grey', 'Cinza chumbo com detalhes sutis. Low-profile.', '/uploads/95/16.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Khaki', 'Tons de areia e cáqui. Visual deserto insano.', '/uploads/95/17.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Anthracite', 'Quase preto, mas com profundidade. Sofisticação pro pisante.', '/uploads/95/18.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Grey Red', 'Cinza com vermelho varsity. Esportivo na veia.', '/uploads/95/19.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Blue Sole', 'Preto no cabedal com a sola azul translúcida. Muito style.', '/uploads/95/20.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 White Ice', 'Branco com solado ice. A pureza em forma de tênis.', '/uploads/95/21.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Tour Yellow', 'Cinza e amarelo. Chama atenção na medida certa.', '/uploads/95/22.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Utility Green', 'Verde utilitário com preto. Parece equipamento tático.', '/uploads/95/23.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Gold', 'Preto com dourado. A combination da vitória.', '/uploads/95/24.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Wolf Grey', 'Cinza lobo clássico. Pau pra toda obra.', '/uploads/95/25.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Royal Low', 'Mais uma variação do preto e azul, focada no contraste forte.', '/uploads/95/26.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Essential Brown', 'Tons de marrom e verde oliva. Fica muito chique no pé.', '/uploads/95/27.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 White Essential', 'Branco básico com construção premium.', '/uploads/95/28.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG Neon', 'O PAI DE TODOS. A cor original de 1995. História pura.', '/uploads/95/29.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Bred', 'Preto e vermelho. A colorway mais famosa do basquete.', '/uploads/95/30.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Dark Grey Black', 'Degradê escuro. Discreto, perfeito pro dia a dia.', '/uploads/95/31.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Grey Volt', 'Uma variação moderna do Neon OG. Energia vibrante.', '/uploads/95/32.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Navy Blue', 'Azul marinho total. Sóbrio e elegante.', '/uploads/95/33.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Triple White', 'Detalhes full white. Um visual clean e moderno.', '/uploads/95/34.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Pink Foam V2', 'Rosa suave com detalhes em branco. Estilo minimalista.', '/uploads/95/35.webp', 351.00, 1, 10, 1, 'AM95');

-- ADIDAS CAMPUS
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Adidas Campus 00s Black White', 'O hype do momento. Vibe skate anos 2000.', '/uploads/adidascampus/1.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Olive Strata', 'Camurça premium verde oliva. Estética chunky.', '/uploads/adidascampus/2.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Crystal White', 'Sola preta, cabedal branco off-white.', '/uploads/adidascampus/3.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Wonder White', 'Tom bege bem claro. Clean e luxo despojado.', '/uploads/adidascampus/4.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Grey Gum', 'Cinza com solado preto. Neutro e estiloso.', '/uploads/adidascampus/5.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Dark Green', 'Verde escuro com listras creme. Visual universitário.', '/uploads/adidascampus/6.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Pink Strata', 'Rosa queimado pra quem tem personalidade.', '/uploads/adidascampus/7.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Ambient Sky', 'Roxo elétrico com listras pretas.', '/uploads/adidascampus/8.webp', 325.00, 13, 10, 3, 'CAMPUS');

-- AIR FORCE 1
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1 Triple Black', 'A lenda das ruas. AF1 todo preto é atitude.', '/uploads/airforce/1.webp', 258.00, 14, 15, 1, 'AF1'),
('Nike Air Force 1 Triple White', 'O tênis mais icônico da história. Branco no branco.', '/uploads/airforce/2.webp', 258.00, 14, 15, 1, 'AF1'),
('Nike Air Force 1 x CPFM Black', 'Colab insana. Letras gigantes "AIR". Preto total.', '/uploads/cpfm/1.webp', 468.00, 21, 2, 1, 'CPFM'),
('Nike Air Force 1 x CPFM White', 'A versão branca da colab. Letreiro "AIR" refletivo.', '/uploads/cpfm/2.webp', 468.00, 21, 2, 1, 'CPFM');

-- AIR JORDAN 11
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 11 Jubilee', 'Edição de 25 anos. Preto com detalhes prateados.', '/uploads/airjordan11/1.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Barons', 'Inspirado no beisebol. Preto camuflado no verniz.', '/uploads/airjordan11/2.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Concord', 'O Graal. Branco e preto verniz, solado gelo.', '/uploads/airjordan11/3.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Concord', 'Elegância do Concord em versão baixa.', '/uploads/airjordan11/4.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Bred', 'Preto e Vermelho. Agressivo e histórico.', '/uploads/airjordan11/5.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Bred', 'Atitude Bred em cano curto.', '/uploads/airjordan11/6.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Cherry', 'Branco com verniz vermelho cereja.', '/uploads/airjordan11/7.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Cherry', 'Versão low do Cherry. Fresco e vibrante.', '/uploads/airjordan11/8.webp', 325.00, 15, 5, 2, 'AJ11');

-- AIR MAX 97
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 97 Have a Nike Day', 'Tons pastéis e detalhes divertidos. Vibe positiva.', '/uploads/airmax97/1.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Silver Bullet', 'O original. Prateado refletivo que brilha no flash.', '/uploads/airmax97/2.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Black Metallic', 'Futurista e stealth. Conforto garantido.', '/uploads/airmax97/3.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Black White', 'Preto clássico com entressola branca.', '/uploads/airmax97/4.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 White Wolf Grey', 'Branco com cinza lobo. Clean ao extremo.', '/uploads/airmax97/5.webp', 325.00, 16, 8, 1, 'AM97');

-- AIR MAX 90
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 90 Iron Grey', 'Cinza ferro com detalhes vermelhos.', '/uploads/airmax90/1.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Infrared', 'A cor que definiu uma era. História nos pés.', '/uploads/airmax90/2.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Laser Blue', 'Esportivo e estiloso, vibe anos 90.', '/uploads/airmax90/3.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Hyper Turquoise', 'Turquesa vibrante nos detalhes. Perfeito pro verão.', '/uploads/airmax90/4.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Grape', 'Roxo e verde água. Vibe retrô forte.', '/uploads/airmax90/5.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Triple White', 'Branco total. Couro liso. A definição de clean.', '/uploads/airmax90/6.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Black White', 'Preto com swoosh branco. Tênis de batalha.', '/uploads/airmax90/7.webp', 325.00, 17, 10, 1, 'AM90');

-- ASICS GEL NYC
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Asics Gel-NYC Pink Cream', 'Rosa e creme. Estética dad shoe de luxo.', '/uploads/asycsnyc/1.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Black Clay', 'Preto com tons de argila. Sombrio e sofisticado.', '/uploads/asycsnyc/2.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Navy Blue', 'Azul marinho com cinza. Visual técnico.', '/uploads/asycsnyc/3.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Grey Red', 'Esportivo clássico repaginado pra rua.', '/uploads/asycsnyc/4.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Teal', 'Branco com detalhes verde água. Fresco e clean.', '/uploads/asycsnyc/10.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Dolphin Blue', 'Futurista e retrô. Estética Y2K runner.', '/uploads/asycsnyc/6.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Graphite Grey', 'Cinza grafite monstro. Rei da versatilidade.', '/uploads/asycsnyc/7.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Midnight', 'Azul escuro e preto. Visual noturno.', '/uploads/asycsnyc/8.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Oatmeal', 'Tons de aveia e creme. Sofisticado e confortável.', '/uploads/asycsnyc/9.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Royal', 'Branco com azul royal forte. Esportivo.', '/uploads/asycsnyc/10.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Pure Silver', 'Prata puro. Estética metálica anos 2000.', '/uploads/asycsnyc/11.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Black Phantom', 'Preto fantasma. Visual stealth ninja.', '/uploads/asycsnyc/12.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Cloud', 'Branco nuvem. Parece que você está flutuando.', '/uploads/asycsnyc/13.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Sky Blue', 'Azul céu com marrom. Exclusivo.', '/uploads/asycsnyc/14.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Concrete', 'Inspirado no concreto de Nova York.', '/uploads/asycsnyc/15.webp', 377.00, 18, 5, 5, 'GELNYC');

-- ASICS KAYANO 14
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES
('Asics Gel-Kayano 14 Cream Green', 'Base creme com detalhes metálicos esverdeados. Hype absoluto.', '/uploads/asycskayano/1.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 Cream Black', 'Mesh creme com sobreposições pretas e prateadas.', '/uploads/asycskayano/2.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 White Pink', 'Mistura delicadeza com agressividade runner.', '/uploads/asycskayano/3.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 White Blue', 'Branco, prata e azul bebê. Fresh e limpo.', '/uploads/asycskayano/4.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 Black Silver', 'O visual noturno do Kayano. Rápido e agressivo.', '/uploads/asycskayano/5.webp', 403.00, 19, 5, 5, 'KAYANO14');

-- BAPE STA
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Bape Sta Black Patent', 'Ícone japonês em couro envernizado preto e cinza.', '/uploads/bapesta/1.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Blue Patent', 'Azul celeste envernizado. Vibrante.', '/uploads/bapesta/2.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Green Patent', 'Verde bandeira brilhante. Visual que para o trânsito.', '/uploads/bapesta/3.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Black White', 'Preto e branco clássico com verniz Bape.', '/uploads/bapesta/4.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Orange Patent', 'Laranja mecânica. Cor cítrica forte.', '/uploads/bapesta/5.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Grey Patent', 'Cinza e branco envernizado. Streetwear nível máximo.', '/uploads/bapesta/6.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta White Black', 'Branco com estrela preta. Simples e direto.', '/uploads/bapesta/7.webp', 364.00, 20, 3, 4, 'BAPE');

-- CROCS BAPE
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs x Bape Green Camo', 'Conforto Crocs com hype Bape.', '/uploads/crocsbape/1.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Black Camo', 'Camuflagem escura e discreta.', '/uploads/crocsbape/2.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Pink Camo', 'Camuflagem rosa. Colab exclusiva.', '/uploads/crocsbape/3.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Blue Camo', 'Tons de azul na camuflagem Bape.', '/uploads/crocsbape/4.webp', 266.00, 22, 10, 9, 'CROCS');

-- CROCS MCQUEEN
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs Lightning McQueen', 'Katchau! Acende luz ao andar. Edição de colecionador.', '/uploads/crocsmaqueen/1.webp', 254.00, 23, 10, 9, 'MCQUEEN'),
('Crocs Mater', 'O Mate chegou pra rebocar seu estilo.', '/uploads/crocsmaqueen/2.webp', 254.00, 23, 10, 9, 'MCQUEEN');

-- DIOR B30
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Dior B30 White Grey', 'Ápice do luxo esportivo. Logo CD refletivo.', '/uploads/diorb30/1.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Blue Grey', 'Azul marinho e cinza. Sofisticado e exclusivo.', '/uploads/diorb30/2.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Mint Grey', 'Detalhes em verde menta suave. Luxo discreto.', '/uploads/diorb30/3.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 White Black', 'O clássico panda da alta moda.', '/uploads/diorb30/4.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Black White', 'Preto predominante com detalhes brancos.', '/uploads/diorb30/5.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Triple Black', 'Todo preto. O mais procurado.', '/uploads/diorb30/6.webp', 351.00, 24, 2, 11, 'B30');

-- AIR MAX DN
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN Black Violet', 'Nova era do Air. Tecnologia Dynamic Air.', '/uploads/dn/1.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Supreme', 'Colaboração exclusiva. Logo Supreme na lateral.', '/uploads/dn/2.webp', 370.00, 2, 5, 1, 'DN'),
('Nike Air Max DN Panda', 'Equilíbrio perfeito entre futuro e clássico.', '/uploads/dn/3.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Triple Black', 'Design moderno e agressivo. Stealth.', '/uploads/dn/4.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Platinum', 'Prata e branco. Parece nave espacial.', '/uploads/dn/5.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Volt', 'Cor Volt pra chocar e chamar atenção.', '/uploads/dn/6.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Sail', 'Tom off-white. Elegante e fácil de combinar.', '/uploads/dn/7.webp', 370.00, 2, 8, 1, 'DN');

-- AIR MAX DN8
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN8 Blue Void', 'Evolução máxima: 8 tubos. Azul profundo.', '/uploads/dn8/1.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Grey', 'Sombrio e futurista. Visual stealth.', '/uploads/dn8/2.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Midnight', 'Azul meia-noite com detalhes pretos.', '/uploads/dn8/3.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Blue', 'Branco com detalhes azuis elétricos.', '/uploads/dn8/4.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Volt', 'Detalhes neon que chamam atenção.', '/uploads/dn8/5.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Grey Orange', 'Contraste esportivo dinâmico.', '/uploads/dn8/6.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Panda', 'Clássico repaginado pro futuro.', '/uploads/dn8/7.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Sunset', 'Degradê quente que destaca no pé.', '/uploads/dn8/8.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Volt Black', 'Energia pura em cada passo.', '/uploads/dn8/9.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Green', 'Preto e verde neon.', '/uploads/dn8/10.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Grey Green', 'Cinza com detalhes verdes.', '/uploads/dn8/11.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Light Grey', 'Cinza claro futurista.', '/uploads/dn8/12.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Tan', 'Sofisticação urbana em tons de bege.', '/uploads/dn8/13.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Pattern', 'Branco com gráficos ousados.', '/uploads/dn8/14.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Pattern', 'Visual gráfico impactante.', '/uploads/dn8/15.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Anthracite', 'Cinza escuro quase preto.', '/uploads/dn8/16.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Pink', 'Rosa choque nos detalhes.', '/uploads/dn8/17.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Pink Black', 'Rosa predominante e moderno.', '/uploads/dn8/18.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Red', 'Agressividade e performance.', '/uploads/dn8/19.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Pink Red', 'Mistura quente de rosa e vermelho.', '/uploads/dn8/20.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Red Black', 'Força e impacto visual.', '/uploads/dn8/21.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Purple', 'Cor única: Roxo metálico.', '/uploads/dn8/22.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Olive', 'Verde oliva tático.', '/uploads/dn8/23.webp', 377.00, 26, 6, 1, 'DN8');

-- AIR MAX DRIFT
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max Plus Drift Phantom', 'Branco fantasma com estrutura preta.', '/uploads/drift/1.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Sunset', 'O clássico degradê do pôr do sol.', '/uploads/drift/2.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Midnight', 'Azul e cinza numa combinação noturna.', '/uploads/drift/3.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Glacier', 'Tons de gelo e azul claro.', '/uploads/drift/4.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Triple Black', 'Todo preto, parece uma armadura no pé.', '/uploads/drift/5.webp', 348.00, 27, 8, 1, 'DRIFT');

-- NIKE DUNK
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Dunk Low Panda', 'O fenômeno. O tênis mais versátil da atualidade.', '/uploads/dunk/1.webp', 286.00, 28, 15, 1, 'DUNK'),
('Nike Dunk Low Gym Red', 'Vermelho universitário e branco.', '/uploads/dunk/2.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Black White', 'Outra variação do clássico preto e branco.', '/uploads/dunk/3.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Kentucky', 'Azul royal e branco. Clássico demais.', '/uploads/dunk/4.webp', 286.00, 28, 8, 1, 'DUNK'),
('Nike Dunk Low Grey Fog', 'Cinza claro e branco. Elegância no streetwear.', '/uploads/dunk/5.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Shadow', 'Preto, cinza e branco. Combinação neutra.', '/uploads/dunk/6.webp', 286.00, 28, 10, 1, 'DUNK');

-- NIKE NOCTA GLIDE
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Glide White', 'Drake Collection. Branco com detalhes cromados.', '/uploads/glide/1.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Black', 'Preto com fibra de carbono. Design único Nocta.', '/uploads/glide/2.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Triple White', 'Todo branco, impecável.', '/uploads/glide/3.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Black Chrome', 'Preto com detalhes cromados brilhantes.', '/uploads/glide/4.webp', 403.00, 29, 5, 1, 'GLIDE');

-- AIR JORDAN 4
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 4 Metallic Purple', 'Branco couro premium com detalhes roxos.', '/uploads/jordan4/1.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Black Canvas', 'Lona preta resistente e camurça.', '/uploads/jordan4/2.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Thunder', 'Preto e amarelo vibrante.', '/uploads/jordan4/3.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Red Thunder', 'Agressividade e estilo em cada detalhe.', '/uploads/jordan4/4.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Seafoam', 'Branco com detalhes em verde suave.', '/uploads/jordan4/5.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Military Blue', 'Ícone de 1989. Branco, cinza e azul militar.', '/uploads/jordan4/6.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Sail Gold', 'Tom off-white com detalhes dourados.', '/uploads/jordan4/7.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Fire Red', 'A cor original de Michael Jordan.', '/uploads/jordan4/8.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 University Blue', 'Camurça azul claro premium.', '/uploads/jordan4/9.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Lightning', 'Amarelo total. Clássico relançado.', '/uploads/jordan4/10.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Midnight Navy', 'Branco com azul marinho e respingos cinza.', '/uploads/jordan4/11.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Black Cat', 'O rei dos Jordan 4. Preto total, nubuck.', '/uploads/jordan4/12.webp', 466.00, 30, 3, 2, 'AJ4');

-- LV TRAINER
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('LV Trainer Grey White', 'Design Virgil Abloh. Cinza e branco luxo.', '/uploads/lvtrainer/1.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Blue Monogram', 'Jeans azul com monograma LV.', '/uploads/lvtrainer/2.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Black Denim', 'Jeans preto monogramado. Discreto.', '/uploads/lvtrainer/3.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Triple Black', 'Todo preto, materiais variados.', '/uploads/lvtrainer/4.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer White', 'Branco total. Pureza do design LV.', '/uploads/lvtrainer/5.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Green', 'Branco com verde. Famoso na coleção.', '/uploads/lvtrainer/6.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Black Yellow', 'Preto com detalhes amarelos neon.', '/uploads/lvtrainer/7.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Navy', 'Azul marinho e branco. Atemporal.', '/uploads/lvtrainer/8.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Light Blue', 'Azul bebê com branco. Fresco.', '/uploads/lvtrainer/9.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Panda', 'Preto e branco. Versão luxo.', '/uploads/lvtrainer/10.webp', 468.00, 31, 2, 10, 'LV');

-- NEW BALANCE 530
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 530 White Green', 'Branco com detalhes verdes. Retro running.', '/uploads/nb530/1.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 Black White', 'Visual clássico que combina com tudo.', '/uploads/nb530/2.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 White Blue', 'Branco com azul marinho. Fresh.', '/uploads/nb530/3.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 Silver', 'Prata metálico. Tendência Y2K.', '/uploads/nb530/4.webp', 312.00, 32, 10, 6, 'NB530');

-- NEW BALANCE 740
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 740 Black Silver', 'Preto com prata. Estética técnica.', '/uploads/nb740/1.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 White Green', 'Visual limpo com toque esportivo.', '/uploads/nb740/2.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 Silver', 'Futurista e ousado. Prata total.', '/uploads/nb740/3.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 White Blue', 'Clássico e versátil. Branco e azul.', '/uploads/nb740/4.webp', 377.00, 33, 8, 6, 'NB740');

-- NEW BALANCE 1000
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 1000 Angora', 'Design inovador e texturas premium.', '/uploads/nb1000/1.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Silver', 'Visual técnico em prata. Futurista.', '/uploads/nb1000/2.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Black Ice', 'Sofisticação em preto degradê.', '/uploads/nb1000/3.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Pink', 'Rosa e marrom. Diferenciado.', '/uploads/nb1000/4.webp', 312.00, 34, 6, 6, 'NB1000');

-- NEW BALANCE 9060
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 9060 Sea Salt', 'Bege claro (Sal Marinho). Luxo casual.', '/uploads/nb9060/1.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Castlerock', 'Cinza e preto. O modelo do momento.', '/uploads/nb9060/2.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Blue Haze', 'Suavidade em tons pastéis de azul.', '/uploads/nb9060/3.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Navy', 'Azul profundo e sofisticado.', '/uploads/nb9060/4.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Driftwood', 'Estilo orgânico e natural.', '/uploads/nb9060/5.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Quartz', 'Tons minerais únicos. Cinza quartzo.', '/uploads/nb9060/6.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Black White', 'Preto com sola branca. Essencial.', '/uploads/nb9060/7.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Oreo', 'Contraste perfeito preto e branco.', '/uploads/nb9060/8.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Black Red', 'Design agressivo. Preto e vermelho.', '/uploads/nb9060/9.webp', 416.00, 35, 8, 6, 'NB9060');

-- NIKE VOMERO 5
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Zoom Vomero 5 Cobblestone', 'Dad Shoe com conforto máximo.', '/uploads/nikevomero/1.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Supersonic', 'Visual rápido. Tech runner.', '/uploads/nikevomero/2.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Iron Ore', 'Tons metálicos. Cinza ferro.', '/uploads/nikevomero/3.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Triple Black', 'Discreto e tecnológico. Ninja.', '/uploads/nikevomero/4.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Photon Dust', 'Branco gelo que eleva o look.', '/uploads/nikevomero/5.webp', 416.00, 36, 10, 1, 'VOMERO');

-- NOCTA HOT STEP 2
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nocta Hot Step 2 Black', 'Evolução Drake. Detalhes refletivos.', '/uploads/noctahotstep/1.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 Orange', 'Laranja total. Presença vibrante.', '/uploads/noctahotstep/2.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 White', 'Design clean e futurista. Branco total.', '/uploads/noctahotstep/3.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 Eggplant', 'Roxo berinjela metálico. Exclusivo.', '/uploads/noctahotstep/4.webp', 429.00, 37, 5, 1, 'HOTSTEP');

-- NIKE P-6000
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike P-6000 Black', 'Estilo corrida anos 2000. Nostalgia.', '/uploads/p6000/1.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Red', 'Branco com vermelho. Clássico runner.', '/uploads/p6000/2.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Gold', 'Detalhes dourados. Branco premium.', '/uploads/p6000/3.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Silver', 'Metálico clássico Y2K.', '/uploads/p6000/4.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Blue', 'Azul clássico e versátil.', '/uploads/p6000/5.webp', 377.00, 38, 12, 1, 'P6000');

-- PUMA 180
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma-180 Grey', 'Estilo skate chunky anos 90.', '/uploads/puma180/1.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 White', 'Visual limpo e volumoso.', '/uploads/puma180/2.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Dark', 'Cinza escuro. Robusto.', '/uploads/puma180/3.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Blue', 'Detalhes azuis suaves. Retro skate.', '/uploads/puma180/4.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Chocolate', 'Marrom diferenciado. Único.', '/uploads/puma180/5.webp', 364.00, 39, 8, 7, 'PUMA180');

-- NIKE SHOX TL
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Shox TL White', 'O famoso 12 molas. Branco e prata.', '/uploads/shox/1.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Black', 'Preto total. Vilão style.', '/uploads/shox/2.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Silver', 'Futurismo puro. Prata metálico.', '/uploads/shox/3.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Panda', 'Contraste clássico das molas.', '/uploads/shox/4.webp', 364.00, 40, 5, 1, 'SHOX');

-- YEEZY SLIDE
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Yeezy Slide Slate', 'Conforto minimalista. Cinza escuro.', '/uploads/slide/1.webp', 255.00, 41, 20, 12, 'SLIDE'),
('Yeezy Slide Bone', 'Estilo orgânico cor osso.', '/uploads/slide/2.webp', 255.00, 41, 20, 12, 'SLIDE');

-- PUMA SUEDE XL
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma Suede XL Green', 'Verde com cadarço fat.', '/uploads/suede/1.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Maroon', 'Vinho vibe anos 2000.', '/uploads/suede/2.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Black Gum', 'Sola gum e camurça preta.', '/uploads/suede/3.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Black', 'Visual all-black robusto.', '/uploads/suede/4.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL White', 'Branco e preto. Clássico.', '/uploads/suede/5.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Red', 'Energia vermelha.', '/uploads/suede/6.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Blue', 'Azul real vibrante.', '/uploads/suede/7.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Panda', 'Preto e branco invertido.', '/uploads/suede/8.webp', 325.00, 42, 10, 7, 'SUEDE');

-- TIMBERLAND
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Timberland Chocolate', 'Marrom escuro. Indestrutível.', '/uploads/timbis/1.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Black', 'Preto nobuck. Pesada.', '/uploads/timbis/2.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Olive', 'Verde oliva militar.', '/uploads/timbis/3.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Wheat', 'O ícone de Nova York. Amarelo trigo.', '/uploads/timbis/4.webp', 359.00, 10, 5, 8, 'TIMBERLAND');

-- AIR MAX TN (TN1)
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Max TN Black Blue', 'O Tubarão original. Preto e azul.', '/uploads/tn1/1.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Tiger', 'Degradê agressivo laranja. Tigre.', '/uploads/tn1/2.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Grey', 'Cinza e preto. Combina com tudo.', '/uploads/tn1/3.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Black Swoosh', 'Simples e chave.', '/uploads/tn1/4.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Purple', 'Roxo elétrico. Voltage Purple.', '/uploads/tn1/5.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Hyper Blue', 'Lenda viva original de 98.', '/uploads/tn1/6.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN France', 'Estampa xadrez. Exclusivo.', '/uploads/tn1/7.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Glacier', 'Fresco e impactante. Azul gelo.', '/uploads/tn1/8.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN White', 'Limpo e futurista. Branco total.', '/uploads/tn1/9.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Triple Black', 'O verdadeiro tubarão preto.', '/uploads/tn1/10.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Deadpool', 'Vermelho e preto intenso.', '/uploads/tn1/11.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Sunset', 'Degradê pôr do sol inconfundível.', '/uploads/tn1/12.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Celtics', 'Branco com verde e dourado. Raro.', '/uploads/tn1/13.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Royal', 'Branco e azul real.', '/uploads/tn1/14.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Orange', 'Contraste forte preto e laranja.', '/uploads/tn1/15.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Grape', 'Roxo clássico e atemporal.', '/uploads/tn1/16.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Sky', 'Azul céu vibrante com branco.', '/uploads/tn1/17.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Red', 'Branco com detalhes vermelhos.', '/uploads/tn1/18.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Silver', 'Brilho prata metálico.', '/uploads/tn1/19.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Aqua', 'Turquesa que se destaca no pé.', '/uploads/tn1/20.webp', 299.00, 3, 8, 1, 'TN');

-- AIR MAX TN3
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Max TN3 Blue', 'Preto e azul. Velocidade.', '/uploads/tn3/1.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 White Blue', 'Design rápido e futurista.', '/uploads/tn3/2.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 White', 'Branco total. Linhas agressivas.', '/uploads/tn3/3.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 Red', 'Preto e vermelho poderoso.', '/uploads/tn3/4.webp', 341.00, 43, 6, 1, 'TN3');

-- ==================================================================================
-- 6. PRODUTOS - LOTE ROUPAS (TODAS COM -35%)
-- ==================================================================================

-- ARC'TERYX (Categoria 46) | Preço original 549.90 -> 357.43 | 499.00 -> 324.35 | 450.00 -> 292.50 | 699.00 -> 454.35
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Arc''teryx Beta AR Jacket Graphite', 'Cor: Graphite. O "All Rounder" da marca. Casaco técnico ultra resistente com GORE-TEX Pro.', '/uploads/arcteryx/1.webp', 357.43, 46, 10, 16, 'ARC-BETA-AR'),
('Arc''teryx Beta LT Jacket Black', 'Cor: Black. Proteção GORE-TEX leve (Lightweight) e durável em um design minimalista.', '/uploads/arcteryx/2.webp', 324.35, 46, 8, 16, 'ARC-BETA-LT'),
('Arc''teryx Beta Jacket Ether', 'Cor: Ether (Azul Bebê). Casaco versátil e silencioso com tecnologia GORE-TEX C-KNIT™.', '/uploads/arcteryx/3.webp', 292.50, 46, 12, 16, 'ARC-BETA-ETH'),
('Arc''teryx Alpha SV Jacket White', 'Cor: White. O modelo topo de linha para condições extremas (Severe). Construído com GORE-TEX Pro 100D.', '/uploads/arcteryx/4.webp', 454.35, 46, 5, 16, 'ARC-ALPHA-SV');

-- CORTEIZ (Categoria 46) | Preço original 389.90 -> 253.43 | 349.90 -> 227.43
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Corteiz x CBF Brasil Track Jacket White', 'Jaqueta tática exclusiva da colaboração Corteiz e Seleção Brasileira.', '/uploads/corteiz/1.webp', 253.43, 46, 10, 13, 'CRTZ-CBF-WHT'),
('Corteiz x CBF Brasil Track Jacket Black', 'Versão Black da colaboração com a CBF. Tecido de alta resistência e acabamento premium.', '/uploads/corteiz/2.webp', 253.43, 46, 8, 13, 'CRTZ-CBF-BLK'),
('Corteiz Alcatraz Hoodie Grey', 'O clássico moletom Alcatraz na cor cinza mescla. Estampa frontal do logotipo da ilha em alta definição.', '/uploads/corteiz/3.webp', 227.43, 46, 15, 13, 'CRTZ-ALC-GRY'),
('Corteiz Alcatraz Hoodie Black', 'Moletom Corteiz Alcatraz preto. A peça mais icônica do streetwear londrino. Interior flanelado.', '/uploads/corteiz/4.webp', 227.43, 46, 12, 13, 'CRTZ-ALC-BLK');

-- DENIM TEARS (Categoria 46) | Preço original 449.90 -> 292.43
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Denim Tears Cotton Wreath Hoodie Grey', 'Moletom cinza mescla com o icônico padrão Cotton Wreath em chenille branco.', '/uploads/denim_tears/1.webp', 292.43, 46, 10, 17, 'DT-CW-GRY'),
('Denim Tears Cotton Wreath Hoodie Black', 'Versão Black do moletom Cotton Wreath. O contraste das flores brancas sobre o fundo preto garante luxo.', '/uploads/denim_tears/2.webp', 292.43, 46, 12, 17, 'DT-CW-BLK');

-- PUFFERS (Categoria 46) | Preço original 899.90 -> 584.93 | 549.90 -> 357.43
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('The North Face 1996 Retro Nuptse Black', 'Cor: Black. A jaqueta puffer mais icônica do mundo. Enchimento em penugem de ganso 700 fill.', '/uploads/puffer/1.webp', 584.93, 46, 10, 18, 'TNF-96-BLK'),
('The North Face 1996 Retro Nuptse Navy', 'Cor: Navy Blue. Design em dois tons com peitoral reforçado. Estética retrô.', '/uploads/puffer/2.webp', 584.93, 46, 8, 18, 'TNF-96-NVY'),
('Nike Sportswear Windrunner Puffer Grey', 'Cor: Grey. Jaqueta puffer com design chevron clássico. Isolamento sintético leve.', '/uploads/puffer/3.webp', 357.43, 46, 12, 1, 'NIKE-PF-GRY'),
('Nike Sportswear Windrunner Puffer Sand', 'Cor: Sand (Bege). Visual moderno em tons terrosos. Proteção térmica com tecnologia Storm-FIT.', '/uploads/puffer/4.webp', 357.43, 46, 7, 1, 'NIKE-PF-SND'),
('Nike Sportswear Windrunner Puffer Olive', 'Cor: Olive Green. Pegada tática urbana com acabamento elástico nos punhos.', '/uploads/puffer/5.webp', 357.43, 46, 10, 1, 'NIKE-PF-OLV'),
('Nike Sportswear Windrunner Puffer Black', 'Cor: Black. Versão "All Black" minimalista com o Swoosh no peito.', '/uploads/puffer/6.webp', 357.43, 46, 15, 1, 'NIKE-PF-BLK');

-- RALPH LAUREN (Categoria 46) | Preço original 329.90 -> 214.43 | 399.90 -> 259.93
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Polo Ralph Lauren Crewneck Black', 'Moletom gola careca clássico preto. Logotipo Pony bordado no peito.', '/uploads/ralph_lauren/1.webp', 214.43, 46, 10, 19, 'RL-CW-BLK'),
('Polo Ralph Lauren Crewneck Grey', 'Moletom gola careca cinza mescla. Peça versátil de alta qualidade com acabamento canelado.', '/uploads/ralph_lauren/2.webp', 214.43, 46, 12, 19, 'RL-CW-GRY'),
('Polo Ralph Lauren Crewneck White', 'Versão branca do moletom Polo Ralph Lauren. Estilo casual refinado.', '/uploads/ralph_lauren/3.webp', 214.43, 46, 8, 19, 'RL-CW-WHT'),
('Polo Ralph Lauren Zip Hoodie Black/Red', 'Moletom com fecho e capuz preto. Logotipo Pony bordado em vermelho.', '/uploads/ralph_lauren/4.webp', 259.93, 46, 10, 19, 'RL-ZIP-BLKRED'),
('Polo Ralph Lauren Zip Hoodie White', 'Hoodie com fecho branco e logotipo azul marinho. Interior levemente flanelado.', '/uploads/ralph_lauren/5.webp', 259.93, 46, 7, 19, 'RL-ZIP-WHTBLU'),
('Polo Ralph Lauren Zip Hoodie Black/White', 'Moletom com fecho preto e logotipo branco. O básico essencial e sofisticado.', '/uploads/ralph_lauren/6.webp', 259.93, 46, 15, 19, 'RL-ZIP-BLKWHT'),
('Polo Ralph Lauren Zip Hoodie Navy', 'Moletom com fecho azul marinho e logotipo vermelho. Clássico da marca.', '/uploads/ralph_lauren/7.webp', 259.93, 46, 9, 19, 'RL-ZIP-NVYRED');

-- SYNA WORLD (Categoria 46) | Preço original 399.90 -> 259.93
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Syna World Logo Hoodie Black', 'Moletom preto com logotipo grafite. Cordões brancos espessos e corte oversized.', '/uploads/syna/1.webp', 259.93, 46, 10, 15, 'SYNA-HOD-BLK'),
('Syna World Logo Hoodie Sage', 'Cor: Sage Green. Moletom com toque macio e logotipo bordado tom sobre tom.', '/uploads/syna/2.webp', 259.93, 46, 8, 15, 'SYNA-HOD-SGE'),
('Syna World Logo Hoodie Blue', 'Cor: Blue. Azul vibrante com o icônico logotipo Syna em branco.', '/uploads/syna/3.webp', 259.93, 46, 12, 15, 'SYNA-HOD-BLU'),
('Syna World Logo Hoodie Red', 'Cor: Red. Vermelho intenso com logotipo branco. Peça de destaque.', '/uploads/syna/4.webp', 259.93, 46, 7, 15, 'SYNA-HOD-RED');

-- TECH FLEECE (Categoria 46) | Preço original 499.90 -> 324.93 | 599.90 -> 389.93
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Tech Fleece G2 Brown', 'Cor: Baroque Brown. Nova geração (G2) com design ergonômico e bolso tático.', '/uploads/tech_fleece/1.webp', 324.93, 46, 10, 1, 'NIKE-TF-BRW'),
('Nike Tech Fleece G2 Burgundy', 'Cor: Burgundy. Estilo moderno com fecho duplo. Isolamento térmico premium.', '/uploads/tech_fleece/2.webp', 324.93, 46, 8, 1, 'NIKE-TF-BUR'),
('Nike Tech Fleece G2 Navy', 'Cor: Midnight Navy. Versão azul marinho G2 com caimento slim fit valorizado.', '/uploads/tech_fleece/3.webp', 324.93, 46, 12, 1, 'NIKE-TF-NVY'),
('Nike Tech Fleece G2 Black', 'Cor: Black. O modelo clássico mais vendido na versão atualizada G2.', '/uploads/tech_fleece/4.webp', 324.93, 46, 20, 1, 'NIKE-TF-BLK'),
('Nike Tech Fleece G2 Heather Grey', 'Cor: Dark Grey Heather. Cinza mescla escuro com detalhes pretos. Conforto térmico.', '/uploads/tech_fleece/5.webp', 324.93, 46, 15, 1, 'NIKE-TF-DGRY'),
('Nike Tech Fleece G2 Panda', 'Cor: Grey/Black. Design "Panda" com blocos de cores contrastantes.', '/uploads/tech_fleece/6.webp', 324.93, 46, 10, 1, 'NIKE-TF-PAN'),
('Nike x Nocta Tech Fleece White', 'Colaboração Nocta (Drake). Cor: White. Design minimalista com Swoosh refletivo.', '/uploads/tech_fleece/7.webp', 389.93, 46, 5, 1, 'NOCTA-TF-WHT'),
('Nike x Nocta Tech Fleece Baby Blue', 'Colaboração Nocta. Cor: Baby Blue. Peça premium com tecido de dupla face.', '/uploads/tech_fleece/8.webp', 389.93, 46, 6, 1, 'NOCTA-TF-BBLU'),
('Nike x Nocta Tech Fleece Black', 'Colaboração Nocta. Cor: Black. Apresenta o clássico logotipo Nocta em amarelo.', '/uploads/tech_fleece/9.webp', 389.93, 46, 10, 1, 'NOCTA-TF-BLK'),
('Nike x Nocta Tech Fleece Green', 'Colaboração Nocta. Cor: Green (Verde). Design tático com a cor vibrante exclusiva.', '/uploads/tech_fleece/10.webp', 389.93, 46, 5, 1, 'NOCTA-TF-GRN'),
('Nike Tech Fleece x Syna Black/Pink', 'Colaboração exclusiva Nike e Syna World. Base preta com logotipos bordados em rosa magenta.', '/uploads/tech_fleece/11.webp', 389.93, 46, 5, 15, 'NIKE-SYNA-TF');

-- TRAPSTAR (Categoria 46) | Preço original 349.90 -> 227.43
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Trapstar Shooters Hoodie Grey', 'Moletom Trapstar London cinza. Logotipo "Shooters" frontal com gradiente azul/preto.', '/uploads/trapstar/1.webp', 227.43, 46, 10, 14, 'TRP-SHO-GRY'),
('Trapstar Shooters Hoodie Black', 'Versão Black do moletom Shooters. Acabamento premium com capuz ajustável.', '/uploads/trapstar/2.webp', 227.43, 46, 12, 14, 'TRP-SHO-BLK');

-- ==================================================================================
-- 7. PRODUTOS - LOTE TRACKSUITS (CONJUNTOS) - Categoria 47 | Preço 449.90 -> 292.43
-- ==================================================================================
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Conjunto Treino PSG Jordan White', 'Conjunto oficial Paris Saint-Germain x Jordan. Blusa branca com calça azul marinho. Tecnologia Dri-FIT.', '/uploads/tracksuit/1.webp', 199.90, 47, 10, 1, 'TRK-PSG-WHT'),
('Conjunto Treino PSG Navy/Royal', 'Kit de treino PSG em azul marinho com detalhes em azul royal. Design tático com escudo bordado e caimento slim.', '/uploads/tracksuit/2.webp', 199.90, 47, 8, 1, 'TRK-PSG-NVY'),
('Conjunto Treino Alemanha White/Black', 'Conjunto oficial da Seleção Alemã. Blusa branca com detalhes pretos e calça técnica ajustada para performance.', '/uploads/tracksuit/3.webp', 199.90, 47, 7, 3, 'TRK-GER-WHT'),
('Conjunto Treino Atlético de Madrid Pink', 'Edição especial de treino do Atlético de Madrid na cor rosa. Estilo moderno com tecido respirável de alta intensidade.', '/uploads/tracksuit/4.webp', 199.90, 47, 5, 1, 'TRK-ATM-PNK'),
('Conjunto Treino Inter de Milão White/Blue', 'Conjunto Inter de Milão com blusa branca e calça marinho. Design elegante com o novo escudo e detalhes em azul.', '/uploads/tracksuit/5.webp', 199.90, 47, 10, 1, 'TRK-INT-WHT'),
('Conjunto Treino Liverpool Black/Red', 'Conjunto oficial do Liverpool FC. Blusa preta com detalhes em vermelho vivo e patrocínio AXA. Corte atlético.', '/uploads/tracksuit/6.webp', 199.90, 47, 9, 1, 'TRK-LFC-BLK'),
('Conjunto Treino Inter de Milão Teal', 'Versão de treino Inter de Milão em verde turquesa (Teal). Visual inovador com tecnologia antitranspirante premium.', '/uploads/tracksuit/7.webp', 199.90, 47, 6, 1, 'TRK-INT-TEA'),
('Conjunto Treino Argentina Black/Blue', 'Conjunto oficial da Seleção Argentina (AFA). Design preto com detalhes em azul celeste e as três estrelas mundiais.', '/uploads/tracksuit/8.webp', 199.90, 47, 12, 3, 'TRK-ARG-BLK'),
('Conjunto Treino Brasil Green/Yellow', 'Conjunto oficial da Seleção Brasileira. Blusa verde limão vibrante com calça azul clássica. Tecnologia de elite.', '/uploads/tracksuit/9.webp', 199.90, 47, 15, 1, 'TRK-BRA-GRN'),
('Conjunto Treino França White/Blue', 'Conjunto da Seleção Francesa (FFF). Blusa branca com calça marinho e detalhes em dourado do galo bordado.', '/uploads/tracksuit/10.webp', 199.90, 47, 8, 1, 'TRK-FRA-WHT'),
('Conjunto Treino Brasil Navy/Neon', 'Versão tática de treino do Brasil. Azul marinho com detalhes em amarelo neon. Visual drill pesado para o kit.', '/uploads/tracksuit/11.webp', 199.90, 47, 10, 1, 'TRK-BRA-NVY'),
('Conjunto Treino Alemanha Purple/Black', 'Conjunto Alemanha na cor roxa (modelo pré-jogo). Design gráfico moderno nas mangas e calça preta técnica.', '/uploads/tracksuit/12.webp', 199.90, 47, 7, 3, 'TRK-GER-PUR'),
('Conjunto Treino Arsenal Red/Grey', 'Conjunto oficial do Arsenal FC. Blusa vermelha com mangas cinzas e calça marinho. Estilo clássico dos Gunners.', '/uploads/tracksuit/13.webp', 199.90, 47, 10, 3, 'TRK-ARS-RED'),
('Conjunto Treino Arsenal White/Navy', 'Versão branca de treino do Arsenal com calça azul marinho. Logotipo bordado e tecido de alta performance.', '/uploads/tracksuit/14.webp', 199.90, 47, 8, 3, 'TRK-ARS-WHT'),
('Conjunto Treino Brasil Green Pattern', 'Conjunto Brasil com estampa gráfica em tons de verde. Design exclusivo para a linha de aquecimento da Seleção.', '/uploads/tracksuit/15.webp', 199.90, 47, 6, 1, 'TRK-BRA-PAT'),
('Conjunto Treino França Black/Blue', 'Conjunto de treino da França na cor preta com detalhes em azul royal. Escudo da FFF bordado em destaque.', '/uploads/tracksuit/16.webp', 199.90, 47, 10, 1, 'TRK-FRA-BLK'),
('Conjunto Treino França Navy/Blue', 'Versão oficial em azul marinho e azul claro da Seleção Francesa. Conforto térmico e ajuste preciso.', '/uploads/tracksuit/17.webp', 199.90, 47, 9, 1, 'TRK-FRA-NVY'),
('Conjunto Treino Itália Navy/Green', 'Conjunto oficial da Seleção Italiana (Azzurra). Azul marinho com as cores da bandeira nacional nos detalhes.', '/uploads/tracksuit/18.webp', 199.90, 47, 12, 3, 'TRK-ITA-NVY'),
('Conjunto Treino Tottenham Dark Grey', 'Conjunto oficial do Tottenham Hotspur. Blusa cinza chumbo com detalhes em azul turquesa. Design techwear.', '/uploads/tracksuit/19.webp', 199.90, 47, 7, 1, 'TRK-TOT-GRY'),
('Conjunto Treino Inter de Milão Black/Teal', 'Conjunto Inter de Milão preto com detalhes em turquesa. Visual agressivo e moderno para treinos intensos.', '/uploads/tracksuit/20.webp', 199.90, 47, 10, 1, 'TRK-INT-BLK'),
('Conjunto Treino Tottenham White/Blue', 'Versão branca de treino do Tottenham com detalhes em azul claro. Leveza e respirabilidade superior.', '/uploads/tracksuit/21.webp', 199.90, 47, 8, 1, 'TRK-TOT-WHT'),
('Conjunto Treino Brasil Black/Neon', 'Conjunto tático Brasil todo preto com detalhes em amarelo neon. O favorito para compor kits streetwear.', '/uploads/tracksuit/22.webp', 199.90, 47, 15, 1, 'TRK-BRA-BLK'),
('Conjunto Treino Manchester City Black/Red', 'Conjunto de treino do City na cor preta com detalhes em vermelho. Alta durabilidade e estilo urbano.', '/uploads/tracksuit/23.webp', 199.90, 47, 11, 7, 'TRK-MCI-BLK'),
('Conjunto Treino PSG Black/Gold', 'Edição luxo de treino do PSG em preto com detalhes dourados. Represente Paris com o kit mais chave do lote.', '/uploads/tracksuit/24.webp', 199.90, 47, 10, 1, 'TRK-PSG-GLD'),
('Conjunto Treino Franca Blue Pattern', 'Conjunto oficial de treino da Selecao Francesa com estampa grafica exclusiva em tons de azul. Tecnologia Dri-FIT de alta performance.', '/uploads/tracksuit/25.webp', 199.90, 47, 8, 1, 'TRK-FRA-PAT'),
('Conjunto Treino Chelsea Black/White', 'Kit de treino oficial do Chelsea FC. Blusa preta com ombros brancos e calca de treino ajustada. Escudo do clube bordado em destaque.', '/uploads/tracksuit/26.webp', 199.90, 47, 10, 1, 'TRK-CHE-BLK'),
('Conjunto Treino Liverpool Red/AXA', 'Conjunto Liverpool na cor vermelha vibrante com patrocinio AXA. Design focado em mobilidade e conforto termico para atletas.', '/uploads/tracksuit/27.webp', 199.90, 47, 7, 1, 'TRK-LFC-RED'),
('Conjunto Treino Brasil Mint Green', 'Edicao especial Brasil na cor verde menta. Visual moderno e leve, ideal para sessoes de treino sob o sol ou uso casual tatico.', '/uploads/tracksuit/28.webp', 199.90, 47, 6, 1, 'TRK-BRA-MNT'),
('Conjunto Treino Arsenal Navy/Blue', 'Conjunto Arsenal FC em azul marinho com detalhes em azul claro. Tecido tecnico respiravel com o escudo dos Gunners no peito.', '/uploads/tracksuit/29.webp', 199.90, 47, 9, 3, 'TRK-ARS-NVY'),
('Conjunto Treino Ajax Teal/Blue', 'Conjunto de treino oficial do Ajax. Combinacao de azul turquesa e azul royal com as iconicas listras da marca nas laterais.', '/uploads/tracksuit/30.webp', 199.90, 47, 5, 3, 'TRK-AJX-TEA'),
('Conjunto Treino Italia White/Blue', 'Kit de treino Selecao Italiana. Blusa branca com detalhes em azul e verde, representando a bandeira nacional. Alta gramatura tecnica.', '/uploads/tracksuit/31.webp', 199.90, 47, 8, 3, 'TRK-ITA-WHT'),
('Conjunto Treino Franca Navy/Cyan', 'Versao de treino da Franca em azul marinho com detalhes em ciano nas mangas. Design ergonomico para maximo rendimento.', '/uploads/tracksuit/32.webp', 199.90, 47, 10, 1, 'TRK-FRA-CYA'),
('Conjunto Treino PSG White/Black Pattern', 'Conjunto Paris Saint-Germain com blusa branca e detalhes graficos pretos nas mangas. Calca preta com logotipos em contraste.', '/uploads/tracksuit/33.webp', 199.90, 47, 12, 1, 'TRK-PSG-PAT'),
('Conjunto Treino PSG White/Red', 'Conjunto de treino PSG oficial. Blusa branca com detalhes em vermelho e patrocinio ALL. O kit classico de treinamento parisiense.', '/uploads/tracksuit/34.webp', 199.90, 47, 15, 1, 'TRK-PSG-RED'),
('Conjunto Treino Brasil Yellow/Blue', 'O iconico conjunto de treino do Brasil nas cores da bandeira. Blusa amarela vibrante e calca azul marinho. Orgulho nacional.', '/uploads/tracksuit/35.webp', 199.90, 47, 20, 1, 'TRK-BRA-YEL'),
('Conjunto Treino Arsenal Navy/Red Detail', 'Versao tatica do Arsenal em azul marinho com detalhes em vermelho nos ombros. Fechamento em ziper 1/4 e caimento profissional.', '/uploads/tracksuit/36.webp', 199.90, 47, 10, 3, 'TRK-ARS-DET');