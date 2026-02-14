-- ==================================================================================
-- ARQUIVO: BACK/src/main/resources/data.sql
-- VERSÃO: ARQUIVO COMENTADO PARA BLOQUEIO DE EXECUÇÃO (MODO SEGURO)
-- ==================================================================================

-- ESTE ARQUIVO FOI COMENTADO PARA EVITAR QUE O RAILWAY REINICIE O BANCO DE DADOS.
-- NOVOS PRODUTOS DEVEM SER CADASTRADOS VIA PAINEL ADMIN OU SQL DIRETO.

-- -- 1. MARCAS
-- INSERT IGNORE INTO marcas (id, nome) VALUES 
-- (1, 'Nike'), (2, 'Air Jordan'), (3, 'Adidas'), (4, 'Bape'), (5, 'Asics'),
-- (6, 'New Balance'), (7, 'Puma'), (8, 'Timberland'), (9, 'Crocs'),
-- (10, 'Louis Vuitton'), (11, 'Dior'), (12, 'Yeezy');

-- -- 2. CATEGORIAS (Corrigido sem caracteres invisíveis)
-- INSERT IGNORE INTO categorias (id, nome) VALUES 
-- (1, 'Air Max 95'), (2, 'Air Max DN'), (3, 'Air Max TN'), (4, 'Dunk'), (5, 'Jordan'), 
-- (6, 'Outros'), (7, 'Acessórios'), (8, 'Casual'), (9, 'Corrida'), (10, 'Botas'), 
-- (11, 'Chuteiras'), (12, 'Sandálias'), (13, 'Adidas Campus'), (14, 'Air Force'),
-- (15, 'Air Jordan 11'), (16, 'Air Max 97'), (17, 'Air Max 90'), (18, 'Asics Gel NYC'),
-- (19, 'Asics Kayano 14'), (20, 'Bape Sta'), (21, 'Air Force CPFM'), (22, 'Crocs Bape'),
-- (23, 'Crocs McQueen'), (24, 'Dior B30'), (26, 'Air Max DN8'), (27, 'Air Max Drift'),
-- (28, 'Nike Dunk'), (29, 'Nike Nocta Glide'), (30, 'Air Jordan 4'), (31, 'LV Trainer'),
-- (32, 'New Balance 530'), (33, 'New Balance 740'), (34, 'New Balance 1000'), (35, 'New Balance 9060'),
-- (36, 'Nike Vomero 5'), (37, 'Nocta Hot Step 2'), (38, 'Nike P-6000'), (39, 'Puma 180'),
-- (40, 'Nike Shox'), (41, 'Yeezy Slide'), (42, 'Puma Suede'), (43, 'Air Max TN3'), (44, 'Nocta Hot Step 1');

-- -- 3. USUÁRIO ADMIN
-- INSERT IGNORE INTO _usuario (id, nome, email, cpf, telefone, senha, role) VALUES 
-- (1, 'Vinicius Admin', 'vinicius.biancolini.tds24@gmail.com', '000.000.000-00', '11999999999', '$2a$10$C0iH.HkG8Nh73C57GC7oT.jxzLawZbas/miJPJVP2qhTcpbZI0soq', 'ROLE_ADMIN');

-- -- 4. CUPONS
-- INSERT IGNORE INTO cupons (id, codigo, desconto, tipo_desconto, data_validade) 
-- VALUES (1, 'SANT26', 10.00, 'PERCENTUAL', '2030-12-31');

-- -- 5. PRODUTOS (Sem IGNORE para garantir limpeza no modo 'create')

-- -- --- LOTE 1: AIR MAX 95 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max 95 Triple Black', 'Tanque de guerra. Totalmente preto, esse pisante é pra quem quer discrição e agressividade no mesmo kit.', '/uploads/95/1.webp', 439.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Midnight Navy', 'O degradê cinza com azul marinho é sacanagem. Traz aquela vibe OG de quem entende do corre.', '/uploads/95/2.webp', 439.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Anatomy of Air', 'Inspirado na fibra muscular humana. Texturas e cores únicas pra quem coleciona relíquia.', '/uploads/95/3.webp', 439.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Black Royal', 'Preto com detalhes em azul royal. Aquele detalhe que brilha quando bate a luz do flash.', '/uploads/95/4.webp', 379.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Pink Foam', 'Contraste do preto pesado com rosa suave. Pra quem tem personalidade forte.', '/uploads/95/5.webp', 379.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Olive Green', 'Pegada militar tática. Verde oliva que combina demais com cargo pants.', '/uploads/95/6.webp', 379.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Stadium Green', 'Cinza com verde estádio. Visual clean e esportivo clássico dos anos 90.', '/uploads/95/7.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Solar Red', 'O detalhe vermelho solar acende o tênis. Base cinza clássica.', '/uploads/95/8.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Cool Grey', 'O cinza mais respeitado da cena. Versátil demais.', '/uploads/95/9.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Black Earth', 'Tons terrosos com preto. Pegada outdoor robusta.', '/uploads/95/10.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Summit White', 'Branco gelo, limpo e perigoso. Eleva qualquer outfit básico.', '/uploads/95/11.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Racer Blue', 'Cinza rasgado pelo azul racer. Uma das combinações mais icônicas.', '/uploads/95/12.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Oreo', 'Preto e branco, o famoso Oreo. Não tem erro, combina com tudo.', '/uploads/95/13.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Sequoia', 'Verde musgo militar. Estética de batalha. Visual underground.', '/uploads/95/14.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Total Orange', 'Laranja que queima. Presença absurda. Chave demais.', '/uploads/95/15.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Dark Grey', 'Cinza chumbo com detalhes sutis. Low-profile.', '/uploads/95/16.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Khaki', 'Tons de areia e cáqui. Visual deserto insano.', '/uploads/95/17.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Anthracite', 'Quase preto, mas com profundidade. Sofisticação pro pisante.', '/uploads/95/18.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Grey Red', 'Cinza com vermelho varsity. Esportivo na veia.', '/uploads/95/19.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Black Blue Sole', 'Preto no cabedal com a sola azul translúcida. Muito style.', '/uploads/95/20.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 White Ice', 'Branco com solado ice. A pureza em forma de tênis.', '/uploads/95/21.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Tour Yellow', 'Cinza e amarelo. Chama atenção na medida certa.', '/uploads/95/22.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Utility Green', 'Verde utilitário com preto. Parece equipamento tático.', '/uploads/95/23.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Black Gold', 'Preto com dourado. A combinação da vitória.', '/uploads/95/24.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Wolf Grey', 'Cinza lobo clássico. Pau pra toda obra.', '/uploads/95/25.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Black Royal Low', 'Mais uma variação do preto e azul, focada no contraste forte.', '/uploads/95/26.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Essential Brown', 'Tons de marrom e verde oliva. Fica muito chique no pé.', '/uploads/95/27.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 White Essential', 'Branco básico com construção premium.', '/uploads/95/28.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 OG Neon', 'O PAI DE TODOS. A cor original de 1995. História pura.', '/uploads/95/29.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Bred', 'Preto e vermelho. A colorway mais famosa do basquete.', '/uploads/95/30.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Dark Grey Black', 'Degradê escuro. Discreto, perfeito pro dia a dia.', '/uploads/95/31.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Grey Volt', 'Uma variação moderna do Neon OG. Energia vibrante.', '/uploads/95/32.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Navy Blue', 'Azul marinho total. Sóbrio e elegante.', '/uploads/95/33.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Triple White', 'Detalhes full white. Um visual clean e moderno.', '/uploads/95/34.webp', 351.00, 1, 10, 1, 'AM95'),
-- ('Nike Air Max 95 Pink Foam V2', 'Rosa suave com detalhes em branco. Estilo minimalista.', '/uploads/95/35.webp', 351.00, 1, 10, 1, 'AM95');

-- -- --- LOTE 2: ADIDAS CAMPUS ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Adidas Campus 00s Black White', 'O hype do momento. Vibe skate anos 2000.', '/uploads/adidascampus/1.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Olive Strata', 'Camurça premium verde oliva. Estética chunky.', '/uploads/adidascampus/2.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Crystal White', 'Sola preta, cabedal branco off-white.', '/uploads/adidascampus/3.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Wonder White', 'Tom bege bem claro. Clean e luxo despojado.', '/uploads/adidascampus/4.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Grey Gum', 'Cinza com solado preto. Neutro e estiloso.', '/uploads/adidascampus/5.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Dark Green', 'Verde escuro com listras creme. Visual universitário.', '/uploads/adidascampus/6.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Pink Strata', 'Rosa queimado pra quem tem personalidade.', '/uploads/adidascampus/7.webp', 325.00, 13, 10, 3, 'CAMPUS'),
-- ('Adidas Campus 00s Ambient Sky', 'Roxo elétrico com listras pretas.', '/uploads/adidascampus/8.webp', 325.00, 13, 10, 3, 'CAMPUS');

-- -- --- LOTE 3: AIR FORCE 1 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Force 1 Triple Black', 'A lenda das ruas. AF1 todo preto é atitude.', '/uploads/airforce/1.webp', 258.00, 14, 15, 1, 'AF1'),
-- ('Nike Air Force 1 Triple White', 'O tênis mais icônico da história. Branco no branco.', '/uploads/airforce/2.webp', 258.00, 14, 15, 1, 'AF1'),
-- ('Nike Air Force 1 x CPFM Black', 'Colab insana. Letras gigantes "AIR". Preto total.', '/uploads/cpfm/1.webp', 468.00, 21, 2, 1, 'CPFM'),
-- ('Nike Air Force 1 x CPFM White', 'A versão branca da colab. Letreiro "AIR" refletivo.', '/uploads/cpfm/2.webp', 468.00, 21, 2, 1, 'CPFM');

-- -- --- LOTE 4: AIR JORDAN 11 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Air Jordan 11 Jubilee', 'Edição de 25 anos. Preto com detalhes prateados.', '/uploads/airjordan11/1.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Low Barons', 'Inspirado no beisebol. Preto camuflado no verniz.', '/uploads/airjordan11/2.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Concord', 'O Graal. Branco e preto verniz, solado gelo.', '/uploads/airjordan11/3.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Low Concord', 'Elegância do Concord em versão baixa.', '/uploads/airjordan11/4.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Bred', 'Preto e Vermelho. Agressivo e histórico.', '/uploads/airjordan11/5.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Low Bred', 'Atitude Bred em cano curto.', '/uploads/airjordan11/6.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Cherry', 'Branco com verniz vermelho cereja.', '/uploads/airjordan11/7.webp', 325.00, 15, 5, 2, 'AJ11'),
-- ('Air Jordan 11 Low Cherry', 'Versão low do Cherry. Fresco e vibrante.', '/uploads/airjordan11/8.webp', 325.00, 15, 5, 2, 'AJ11');

-- -- --- LOTE 5: AIR MAX 97 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max 97 Have a Nike Day', 'Tons pastéis e detalhes divertidos. Vibe positiva.', '/uploads/airmax97/1.webp', 325.00, 16, 8, 1, 'AM97'),
-- ('Nike Air Max 97 Silver Bullet', 'O original. Prateado refletivo que brilha no flash.', '/uploads/airmax97/2.webp', 325.00, 16, 8, 1, 'AM97'),
-- ('Nike Air Max 97 Black Metallic', 'Futurista e stealth. Conforto garantido.', '/uploads/airmax97/3.webp', 325.00, 16, 8, 1, 'AM97'),
-- ('Nike Air Max 97 Black White', 'Preto clássico com entressola branca.', '/uploads/airmax97/4.webp', 325.00, 16, 8, 1, 'AM97'),
-- ('Nike Air Max 97 White Wolf Grey', 'Branco com cinza lobo. Clean ao extremo.', '/uploads/airmax97/5.webp', 325.00, 16, 8, 1, 'AM97');

-- -- --- LOTE 6: AIR MAX 90 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max 90 Iron Grey', 'Cinza ferro com detalhes vermelhos.', '/uploads/airmax90/1.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Infrared', 'A cor que definiu uma era. História nos pés.', '/uploads/airmax90/2.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Laser Blue', 'Esportivo e estiloso, vibe anos 90.', '/uploads/airmax90/3.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Hyper Turquoise', 'Turquesa vibrante nos detalhes. Perfeito pro verão.', '/uploads/airmax90/4.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Grape', 'Roxo e verde água. Vibe retrô forte.', '/uploads/airmax90/5.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Triple White', 'Branco total. Couro liso. A definição de clean.', '/uploads/airmax90/6.webp', 325.00, 17, 10, 1, 'AM90'),
-- ('Nike Air Max 90 Black White', 'Preto com swoosh branco. Tênis de batalha.', '/uploads/airmax90/7.webp', 325.00, 17, 10, 1, 'AM90');

-- -- --- LOTE 7: ASICS GEL NYC ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Asics Gel-NYC Pink Cream', 'Rosa e creme. Estética dad shoe de luxo.', '/uploads/asycsnyc/1.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Black Clay', 'Preto com tons de argila. Sombrio e sofisticado.', '/uploads/asycsnyc/2.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Navy Blue', 'Azul marinho com cinza. Visual técnico.', '/uploads/asycsnyc/3.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Grey Red', 'Esportivo clássico repaginado pra rua.', '/uploads/asycsnyc/4.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC White Teal', 'Branco com detalhes verde água. Fresco e clean.', '/uploads/asycsnyc/5.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Dolphin Blue', 'Futurista e retrô. Estética Y2K runner.', '/uploads/asycsnyc/6.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Graphite Grey', 'Cinza grafite monstro. Rei da versatilidade.', '/uploads/asycsnyc/7.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Midnight', 'Azul escuro e preto. Visual noturno.', '/uploads/asycsnyc/8.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Oatmeal', 'Tons de aveia e creme. Sofisticado e confortável.', '/uploads/asycsnyc/9.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC White Royal', 'Branco com azul royal forte. Esportivo.', '/uploads/asycsnyc/10.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Pure Silver', 'Prata puro. Estética metálica anos 2000.', '/uploads/asycsnyc/11.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Black Phantom', 'Preto fantasma. Visual stealth ninja.', '/uploads/asycsnyc/12.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC White Cloud', 'Branco nuvem. Parece que você está flutuando.', '/uploads/asycsnyc/13.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Sky Blue', 'Azul céu com marrom. Exclusivo.', '/uploads/asycsnyc/14.webp', 377.00, 18, 5, 5, 'GELNYC'),
-- ('Asics Gel-NYC Concrete', 'Inspirado no concreto de Nova York.', '/uploads/asycsnyc/15.webp', 377.00, 18, 5, 5, 'GELNYC');

-- -- --- LOTE 8: ASICS KAYANO 14 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES
-- ('Asics Gel-Kayano 14 Cream Green', 'Base creme com detalhes metálicos esverdeados. Hype absoluto.', '/uploads/asycskayano/1.webp', 403.00, 19, 5, 5, 'KAYANO14'),
-- ('Asics Gel-Kayano 14 Cream Black', 'Mesh creme com sobreposições pretas e prateadas.', '/uploads/asycskayano/2.webp', 403.00, 19, 5, 5, 'KAYANO14'),
-- ('Asics Gel-Kayano 14 White Pink', 'Mistura delicadeza com agressividade runner.', '/uploads/asycskayano/3.webp', 403.00, 19, 5, 5, 'KAYANO14'),
-- ('Asics Gel-Kayano 14 White Blue', 'Branco, prata e azul bebê. Fresh e limpo.', '/uploads/asycskayano/4.webp', 403.00, 19, 5, 5, 'KAYANO14'),
-- ('Asics Gel-Kayano 14 Black Silver', 'O visual noturno do Kayano. Rápido e agressivo.', '/uploads/asycskayano/5.webp', 403.00, 19, 5, 5, 'KAYANO14');

-- -- --- LOTE 9: BAPE STA ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Bape Sta Black Patent', 'Ícone japonês em couro envernizado preto e cinza.', '/uploads/bapesta/1.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta Blue Patent', 'Azul celeste envernizado. Vibrante.', '/uploads/bapesta/2.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta Green Patent', 'Verde bandeira brilhante. Visual que para o trânsito.', '/uploads/bapesta/3.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta Black White', 'Preto e branco clássico com verniz Bape.', '/uploads/bapesta/4.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta Orange Patent', 'Laranja mecânica. Cor cítrica forte.', '/uploads/bapesta/5.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta Grey Patent', 'Cinza e branco envernizado. Streetwear nível máximo.', '/uploads/bapesta/6.webp', 364.00, 20, 3, 4, 'BAPE'),
-- ('Bape Sta White Black', 'Branco com estrela preta. Simples e direto.', '/uploads/bapesta/7.webp', 364.00, 20, 3, 4, 'BAPE');

-- -- --- LOTE 10: CROCS BAPE ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Crocs x Bape Green Camo', 'Conforto Crocs com hype Bape.', '/uploads/crocsbape/1.webp', 266.00, 22, 10, 9, 'CROCS'),
-- ('Crocs x Bape Black Camo', 'Camuflagem escura e discreta.', '/uploads/crocsbape/2.webp', 266.00, 22, 10, 9, 'CROCS'),
-- ('Crocs x Bape Pink Camo', 'Camuflagem rosa. Colab exclusiva.', '/uploads/crocsbape/3.webp', 266.00, 22, 10, 9, 'CROCS'),
-- ('Crocs x Bape Blue Camo', 'Tons de azul na camuflagem Bape.', '/uploads/crocsbape/4.webp', 266.00, 22, 10, 9, 'CROCS');

-- -- --- LOTE 11: CROCS MCQUEEN ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Crocs Lightning McQueen', 'Katchau! Acende luz ao andar. Edição de colecionador.', '/uploads/crocsmaqueen/1.webp', 254.00, 23, 10, 9, 'MCQUEEN'),
-- ('Crocs Mater', 'O Mate chegou pra rebocar seu estilo.', '/uploads/crocsmaqueen/2.webp', 254.00, 23, 10, 9, 'MCQUEEN');

-- -- --- LOTE 12: DIOR B30 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Dior B30 White Grey', 'Ápice do luxo esportivo. Logo CD refletivo.', '/uploads/diorb30/1.webp', 351.00, 24, 2, 11, 'B30'),
-- ('Dior B30 Blue Grey', 'Azul marinho e cinza. Sofisticado e exclusivo.', '/uploads/diorb30/2.webp', 351.00, 24, 2, 11, 'B30'),
-- ('Dior B30 Mint Grey', 'Detalhes em verde menta suave. Luxo discreto.', '/uploads/diorb30/3.webp', 351.00, 24, 2, 11, 'B30'),
-- ('Dior B30 White Black', 'O clássico panda da alta moda.', '/uploads/diorb30/4.webp', 351.00, 24, 2, 11, 'B30'),
-- ('Dior B30 Black White', 'Preto predominante com detalhes brancos.', '/uploads/diorb30/5.webp', 351.00, 24, 2, 11, 'B30'),
-- ('Dior B30 Triple Black', 'Todo preto. O mais procurado.', '/uploads/diorb30/6.webp', 351.00, 24, 2, 11, 'B30');

-- -- --- LOTE 13: AIR MAX DN ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max DN Black Violet', 'Nova era do Air. Tecnologia Dynamic Air.', '/uploads/dn/1.webp', 370.00, 2, 8, 1, 'DN'),
-- ('Nike Air Max DN Supreme', 'Colaboração exclusiva. Logo Supreme na lateral.', '/uploads/dn/2.webp', 370.00, 2, 5, 1, 'DN'),
-- ('Nike Air Max DN Panda', 'Equilíbrio perfeito entre futuro e clássico.', '/uploads/dn/3.webp', 370.00, 2, 8, 1, 'DN'),
-- ('Nike Air Max DN Triple Black', 'Design moderno e agressivo. Stealth.', '/uploads/dn/4.webp', 370.00, 2, 8, 1, 'DN'),
-- ('Nike Air Max DN Platinum', 'Prata e branco. Parece nave espacial.', '/uploads/dn/5.webp', 370.00, 2, 8, 1, 'DN'),
-- ('Nike Air Max DN Volt', 'Cor Volt pra chocar e chamar atenção.', '/uploads/dn/6.webp', 370.00, 2, 8, 1, 'DN'),
-- ('Nike Air Max DN Sail', 'Tom off-white. Elegante e fácil de combinar.', '/uploads/dn/7.webp', 370.00, 2, 8, 1, 'DN');

-- -- --- LOTE 14: AIR MAX DN8 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max DN8 Blue Void', 'Evolução máxima: 8 tubos. Azul profundo.', '/uploads/dn8/1.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Black Grey', 'Sombrio e futurista. Visual stealth.', '/uploads/dn8/2.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Midnight', 'Azul meia-noite com detalhes pretos.', '/uploads/dn8/3.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 White Blue', 'Branco com detalhes azuis elétricos.', '/uploads/dn8/4.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 White Volt', 'Detalhes neon que chamam atenção.', '/uploads/dn8/5.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Grey Orange', 'Contraste esportivo dinâmico.', '/uploads/dn8/6.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Panda', 'Clássico repaginado pro futuro.', '/uploads/dn8/7.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Sunset', 'Degradê quente que destaca no pé.', '/uploads/dn8/8.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Volt Black', 'Energia pura em cada passo.', '/uploads/dn8/9.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Black Green', 'Preto e verde neon.', '/uploads/dn8/10.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Grey Green', 'Cinza com detalhes verdes.', '/uploads/dn8/11.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Light Grey', 'Cinza claro futurista.', '/uploads/dn8/12.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Tan', 'Sofisticação urbana em tons de bege.', '/uploads/dn8/13.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 White Pattern', 'Branco com gráficos ousados.', '/uploads/dn8/14.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Black Pattern', 'Visual gráfico impactante.', '/uploads/dn8/15.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Anthracite', 'Cinza escuro quase preto.', '/uploads/dn8/16.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Black Pink', 'Rosa choque nos detalhes.', '/uploads/dn8/17.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Pink Black', 'Rosa predominante e moderno.', '/uploads/dn8/18.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Black Red', 'Agressividade e performance.', '/uploads/dn8/19.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Pink Red', 'Mistura quente de rosa e vermelho.', '/uploads/dn8/20.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Red Black', 'Força e impacto visual.', '/uploads/dn8/21.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Purple', 'Cor única: Roxo metálico.', '/uploads/dn8/22.webp', 377.00, 26, 6, 1, 'DN8'),
-- ('Nike Air Max DN8 Olive', 'Verde oliva tático.', '/uploads/dn8/23.webp', 377.00, 26, 6, 1, 'DN8');

-- -- --- LOTE 15: AIR MAX DRIFT ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Air Max Plus Drift Phantom', 'Branco fantasma com estrutura preta.', '/uploads/drift/1.webp', 348.00, 27, 8, 1, 'DRIFT'),
-- ('Nike Air Max Plus Drift Sunset', 'O clássico degradê do pôr do sol.', '/uploads/drift/2.webp', 348.00, 27, 8, 1, 'DRIFT'),
-- ('Nike Air Max Plus Drift Midnight', 'Azul e cinza numa combinação noturna.', '/uploads/drift/3.webp', 348.00, 27, 8, 1, 'DRIFT'),
-- ('Nike Air Max Plus Drift Glacier', 'Tons de gelo e azul claro.', '/uploads/drift/4.webp', 348.00, 27, 8, 1, 'DRIFT'),
-- ('Nike Air Max Plus Drift Triple Black', 'Todo preto, parece uma armadura no pé.', '/uploads/drift/5.webp', 348.00, 27, 8, 1, 'DRIFT');

-- -- --- LOTE 16: NIKE DUNK ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Dunk Low Panda', 'O fenômeno. O tênis mais versátil da atualidade.', '/uploads/dunk/1.webp', 286.00, 28, 15, 1, 'DUNK'),
-- ('Nike Dunk Low Gym Red', 'Vermelho universitário e branco.', '/uploads/dunk/2.webp', 286.00, 28, 10, 1, 'DUNK'),
-- ('Nike Dunk Low Black White', 'Outra variação do clássico preto e branco.', '/uploads/dunk/3.webp', 286.00, 28, 10, 1, 'DUNK'),
-- ('Nike Dunk Low Kentucky', 'Azul royal e branco. Clássico demais.', '/uploads/dunk/4.webp', 286.00, 28, 8, 1, 'DUNK'),
-- ('Nike Dunk Low Grey Fog', 'Cinza claro e branco. Elegância no streetwear.', '/uploads/dunk/5.webp', 286.00, 28, 10, 1, 'DUNK'),
-- ('Nike Dunk Low Shadow', 'Preto, cinza e branco. Combinação neutra.', '/uploads/dunk/6.webp', 286.00, 28, 10, 1, 'DUNK');

-- -- --- LOTE 17: NIKE NOCTA GLIDE ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Nocta Glide White', 'Drake Collection. Branco com detalhes cromados.', '/uploads/glide/1.webp', 403.00, 29, 5, 1, 'GLIDE'),
-- ('Nike Nocta Glide Black', 'Preto com fibra de carbono. Design único Nocta.', '/uploads/glide/2.webp', 403.00, 29, 5, 1, 'GLIDE'),
-- ('Nike Nocta Glide Triple White', 'Todo branco, impecável.', '/uploads/glide/3.webp', 403.00, 29, 5, 1, 'GLIDE'),
-- ('Nike Nocta Glide Black Chrome', 'Preto com detalhes cromados brilhantes.', '/uploads/glide/4.webp', 403.00, 29, 5, 1, 'GLIDE');

-- -- --- LOTE 18: AIR JORDAN 4 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Air Jordan 4 Metallic Purple', 'Branco couro premium com detalhes roxos.', '/uploads/jordan4/1.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Black Canvas', 'Lona preta resistente e camurça.', '/uploads/jordan4/2.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Thunder', 'Preto e amarelo vibrante.', '/uploads/jordan4/3.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Red Thunder', 'Agressividade e estilo em cada detalhe.', '/uploads/jordan4/4.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Seafoam', 'Branco com detalhes em verde suave.', '/uploads/jordan4/5.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Military Blue', 'Ícone de 1989. Branco, cinza e azul militar.', '/uploads/jordan4/6.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Sail Gold', 'Tom off-white com detalhes dourados.', '/uploads/jordan4/7.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Fire Red', 'A cor original de Michael Jordan.', '/uploads/jordan4/8.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 University Blue', 'Camurça azul claro premium.', '/uploads/jordan4/9.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Lightning', 'Amarelo total. Clássico relançado.', '/uploads/jordan4/10.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Midnight Navy', 'Branco com azul marinho e respingos cinza.', '/uploads/jordan4/11.webp', 466.00, 30, 5, 2, 'AJ4'),
-- ('Air Jordan 4 Black Cat', 'O rei dos Jordan 4. Preto total, nubuck.', '/uploads/jordan4/12.webp', 466.00, 30, 3, 2, 'AJ4');

-- -- --- LOTE 19: LV TRAINER ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('LV Trainer Grey White', 'Design Virgil Abloh. Cinza e branco luxo.', '/uploads/lvtrainer/1.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Blue Monogram', 'Jeans azul com monograma LV.', '/uploads/lvtrainer/2.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Black Denim', 'Jeans preto monogramado. Discreto.', '/uploads/lvtrainer/3.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Triple Black', 'Todo preto, materiais variados.', '/uploads/lvtrainer/4.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer White', 'Branco total. Pureza do design LV.', '/uploads/lvtrainer/5.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Green', 'Branco com verde. Famoso na coleção.', '/uploads/lvtrainer/6.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Black Yellow', 'Preto com detalhes amarelos neon.', '/uploads/lvtrainer/7.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Navy', 'Azul marinho e branco. Atemporal.', '/uploads/lvtrainer/8.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Light Blue', 'Azul bebê com branco. Fresco.', '/uploads/lvtrainer/9.webp', 468.00, 31, 2, 10, 'LV'),
-- ('LV Trainer Panda', 'Preto e branco. Versão luxo.', '/uploads/lvtrainer/10.webp', 468.00, 31, 2, 10, 'LV');

-- -- --- LOTE 20: NEW BALANCE 530 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('New Balance 530 White Green', 'Branco com detalhes verdes. Retro running.', '/uploads/nb530/1.webp', 312.00, 32, 10, 6, 'NB530'),
-- ('New Balance 530 Black White', 'Visual clássico que combina com tudo.', '/uploads/nb530/2.webp', 312.00, 32, 10, 6, 'NB530'),
-- ('New Balance 530 White Blue', 'Branco com azul marinho. Fresh.', '/uploads/nb530/3.webp', 312.00, 32, 10, 6, 'NB530'),
-- ('New Balance 530 Silver', 'Prata metálico. Tendência Y2K.', '/uploads/nb530/4.webp', 312.00, 32, 10, 6, 'NB530');

-- -- --- LOTE 21: NEW BALANCE 740 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('New Balance 740 Black Silver', 'Preto com prata. Estética técnica.', '/uploads/nb740/1.webp', 377.00, 33, 8, 6, 'NB740'),
-- ('New Balance 740 White Green', 'Visual limpo com toque esportivo.', '/uploads/nb740/2.webp', 377.00, 33, 8, 6, 'NB740'),
-- ('New Balance 740 Silver', 'Futurista e ousado. Prata total.', '/uploads/nb740/3.webp', 377.00, 33, 8, 6, 'NB740'),
-- ('New Balance 740 White Blue', 'Clássico e versátil. Branco e azul.', '/uploads/nb740/4.webp', 377.00, 33, 8, 6, 'NB740');

-- -- --- LOTE 22: NEW BALANCE 1000 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('New Balance 1000 Angora', 'Design inovador e texturas premium.', '/uploads/nb1000/1.webp', 312.00, 34, 6, 6, 'NB1000'),
-- ('New Balance 1000 Silver', 'Visual técnico em prata. Futurista.', '/uploads/nb1000/2.webp', 312.00, 34, 6, 6, 'NB1000'),
-- ('New Balance 1000 Black Ice', 'Sofisticação em preto degradê.', '/uploads/nb1000/3.webp', 312.00, 34, 6, 6, 'NB1000'),
-- ('New Balance 1000 Pink', 'Rosa e marrom. Diferenciado.', '/uploads/nb1000/4.webp', 312.00, 34, 6, 6, 'NB1000');

-- -- --- LOTE 23: NEW BALANCE 9060 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('New Balance 9060 Sea Salt', 'Bege claro (Sal Marinho). Luxo casual.', '/uploads/nb9060/1.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Castlerock', 'Cinza e preto. O modelo do momento.', '/uploads/nb9060/2.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Blue Haze', 'Suavidade em tons pastéis de azul.', '/uploads/nb9060/3.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Navy', 'Azul profundo e sofisticado.', '/uploads/nb9060/4.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Driftwood', 'Estilo orgânico e natural.', '/uploads/nb9060/5.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Quartz', 'Tons minerais únicos. Cinza quartzo.', '/uploads/nb9060/6.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Black White', 'Preto com sola branca. Essencial.', '/uploads/nb9060/7.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Oreo', 'Contraste perfeito preto e branco.', '/uploads/nb9060/8.webp', 416.00, 35, 8, 6, 'NB9060'),
-- ('New Balance 9060 Black Red', 'Design agressivo. Preto e vermelho.', '/uploads/nb9060/9.webp', 416.00, 35, 8, 6, 'NB9060');

-- -- --- LOTE 24: NIKE VOMERO 5 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Zoom Vomero 5 Cobblestone', 'Dad Shoe com conforto máximo.', '/uploads/nikevomero/1.webp', 416.00, 36, 10, 1, 'VOMERO'),
-- ('Nike Zoom Vomero 5 Supersonic', 'Visual rápido. Tech runner.', '/uploads/nikevomero/2.webp', 416.00, 36, 10, 1, 'VOMERO'),
-- ('Nike Zoom Vomero 5 Iron Ore', 'Tons metálicos. Cinza ferro.', '/uploads/nikevomero/3.webp', 416.00, 36, 10, 1, 'VOMERO'),
-- ('Nike Zoom Vomero 5 Triple Black', 'Discreto e tecnológico. Ninja.', '/uploads/nikevomero/4.webp', 416.00, 36, 10, 1, 'VOMERO'),
-- ('Nike Zoom Vomero 5 Photon Dust', 'Branco gelo que eleva o look.', '/uploads/nikevomero/5.webp', 416.00, 36, 10, 1, 'VOMERO');

-- -- --- LOTE 25: NOCTA HOT STEP 2 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nocta Hot Step 2 Black', 'Evolução Drake. Detalhes refletivos.', '/uploads/noctahotstep/1.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
-- ('Nocta Hot Step 2 Orange', 'Laranja total. Presença vibrante.', '/uploads/noctahotstep/2.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
-- ('Nocta Hot Step 2 White', 'Design clean e futurista. Branco total.', '/uploads/noctahotstep/3.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
-- ('Nocta Hot Step 2 Eggplant', 'Roxo berinjela metálico. Exclusivo.', '/uploads/noctahotstep/4.webp', 429.00, 37, 5, 1, 'HOTSTEP');

-- -- --- LOTE 26: NIKE P-6000 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike P-6000 Black', 'Estilo corrida anos 2000. Nostalgia.', '/uploads/p6000/1.webp', 377.00, 38, 12, 1, 'P6000'),
-- ('Nike P-6000 Red', 'Branco com vermelho. Clássico runner.', '/uploads/p6000/2.webp', 377.00, 38, 12, 1, 'P6000'),
-- ('Nike P-6000 Gold', 'Detalhes dourados. Branco premium.', '/uploads/p6000/3.webp', 377.00, 38, 12, 1, 'P6000'),
-- ('Nike P-6000 Silver', 'Metálico clássico Y2K.', '/uploads/p6000/4.webp', 377.00, 38, 12, 1, 'P6000'),
-- ('Nike P-6000 Blue', 'Azul clássico e versátil.', '/uploads/p6000/5.webp', 377.00, 38, 12, 1, 'P6000');

-- -- --- LOTE 27: PUMA 180 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Puma-180 Grey', 'Estilo skate chunky anos 90.', '/uploads/puma180/1.webp', 364.00, 39, 8, 7, 'PUMA180'),
-- ('Puma-180 White', 'Visual limpo e volumoso.', '/uploads/puma180/2.webp', 364.00, 39, 8, 7, 'PUMA180'),
-- ('Puma-180 Dark', 'Cinza escuro. Robusto.', '/uploads/puma180/3.webp', 364.00, 39, 8, 7, 'PUMA180'),
-- ('Puma-180 Blue', 'Detalhes azuis suaves. Retro skate.', '/uploads/puma180/4.webp', 364.00, 39, 8, 7, 'PUMA180'),
-- ('Puma-180 Chocolate', 'Marrom diferenciado. Único.', '/uploads/puma180/5.webp', 364.00, 39, 8, 7, 'PUMA180');

-- -- --- LOTE 28: NIKE SHOX TL ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Nike Shox TL White', 'O famoso 12 molas. Branco e prata.', '/uploads/shox/1.webp', 364.00, 40, 5, 1, 'SHOX'),
-- ('Nike Shox TL Black', 'Preto total. Vilão style.', '/uploads/shox/2.webp', 364.00, 40, 5, 1, 'SHOX'),
-- ('Nike Shox TL Silver', 'Futurismo puro. Prata metálico.', '/uploads/shox/3.webp', 364.00, 40, 5, 1, 'SHOX'),
-- ('Nike Shox TL Panda', 'Contraste clássico das molas.', '/uploads/shox/4.webp', 364.00, 40, 5, 1, 'SHOX');

-- -- --- LOTE 29: YEEZY SLIDE ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Yeezy Slide Slate', 'Conforto minimalista. Cinza escuro.', '/uploads/slide/1.webp', 255.00, 41, 20, 12, 'SLIDE'),
-- ('Yeezy Slide Bone', 'Estilo orgânico cor osso.', '/uploads/slide/2.webp', 255.00, 41, 20, 12, 'SLIDE');

-- -- --- LOTE 30: PUMA SUEDE XL ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Puma Suede XL Green', 'Verde com cadarço fat.', '/uploads/suede/1.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Maroon', 'Vinho vibe anos 2000.', '/uploads/suede/2.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Black Gum', 'Sola gum e camurça preta.', '/uploads/suede/3.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Black', 'Visual all-black robusto.', '/uploads/suede/4.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL White', 'Branco e preto. Clássico.', '/uploads/suede/5.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Red', 'Energia vermelha.', '/uploads/suede/6.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Blue', 'Azul real vibrante.', '/uploads/suede/7.webp', 325.00, 42, 10, 7, 'SUEDE'),
-- ('Puma Suede XL Panda', 'Preto e branco invertido.', '/uploads/suede/8.webp', 325.00, 42, 10, 7, 'SUEDE');

-- -- --- LOTE 31: TIMBERLAND ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Timberland Chocolate', 'Marrom escuro. Indestrutível.', '/uploads/timbis/1.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
-- ('Timberland Black', 'Preto nobuck. Pesada.', '/uploads/timbis/2.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
-- ('Timberland Olive', 'Verde oliva militar.', '/uploads/timbis/3.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
-- ('Timberland Wheat', 'O ícone de Nova York. Amarelo trigo.', '/uploads/timbis/4.webp', 359.00, 10, 5, 8, 'TIMBERLAND');

-- -- --- LOTE 32: AIR MAX TN (TN1) ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Air Max TN Black Blue', 'O Tubarão original. Preto e azul.', '/uploads/tn1/1.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Tiger', 'Degradê agressivo laranja. Tigre.', '/uploads/tn1/2.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Grey', 'Cinza e preto. Combina com tudo.', '/uploads/tn1/3.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Black Swoosh', 'Simples e chave.', '/uploads/tn1/4.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Purple', 'Roxo elétrico. Voltage Purple.', '/uploads/tn1/5.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Hyper Blue', 'Lenda viva original de 98.', '/uploads/tn1/6.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN France', 'Estampa xadrez. Exclusivo.', '/uploads/tn1/7.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Glacier', 'Fresco e impactante. Azul gelo.', '/uploads/tn1/8.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN White', 'Limpo e futurista. Branco total.', '/uploads/tn1/9.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Triple Black', 'O verdadeiro tubarão preto.', '/uploads/tn1/10.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Deadpool', 'Vermelho e preto intenso.', '/uploads/tn1/11.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Sunset', 'Degradê pôr do sol inconfundível.', '/uploads/tn1/12.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Celtics', 'Branco com verde e dourado. Raro.', '/uploads/tn1/13.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Royal', 'Branco e azul real.', '/uploads/tn1/14.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Orange', 'Contraste forte preto e laranja.', '/uploads/tn1/15.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Grape', 'Roxo clássico e atemporal.', '/uploads/tn1/16.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Sky', 'Azul céu vibrante com branco.', '/uploads/tn1/17.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Red', 'Branco com detalhes vermelhos.', '/uploads/tn1/18.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Silver', 'Brilho prata metálico.', '/uploads/tn1/19.webp', 299.00, 3, 8, 1, 'TN'),
-- ('Air Max TN Aqua', 'Turquesa que se destaca no pé.', '/uploads/tn1/20.webp', 299.00, 3, 8, 1, 'TN');

-- -- --- LOTE 33: AIR MAX TN3 ---
-- INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- ('Air Max TN3 Blue', 'Preto e azul. Velocidade.', '/uploads/tn3/1.webp', 341.00, 43, 6, 1, 'TN3'),
-- ('Air Max TN3 White Blue', 'Design rápido e futurista.', '/uploads/tn3/2.webp', 341.00, 43, 6, 1, 'TN3'),
-- ('Air Max TN3 White', 'Branco total. Linhas agressivas.', '/uploads/tn3/3.webp', 341.00, 43, 6, 1, 'TN3'),
-- ('Air Max TN3 Red', 'Preto e vermelho poderoso.', '/uploads/tn3/4.webp', 341.00, 43, 6, 1, 'TN3');