-- ==================================================================================
-- ARQUIVO: BACK/src/main/resources/data.sql
-- VERSÃO FINAL ATUALIZADA COM PREÇOS DA LISTA E IMAGENS .WEBP
-- ==================================================================================

-- 2. INSERÇÃO DE MARCAS
INSERT INTO marcas (id, nome) VALUES 
(1, 'Nike'), (2, 'Air Jordan'), (3, 'Adidas'), (4, 'Bape'), (5, 'Asics'),
(6, 'New Balance'), (7, 'Puma'), (8, 'Timberland'), (9, 'Crocs'),
(10, 'Louis Vuitton'), (11, 'Dior'), (12, 'Yeezy');

-- 3. INSERÇÃO DE CATEGORIAS
INSERT INTO categorias (id, nome) VALUES 
(1, 'Air Max 95'), (2, 'Air Max DN'), (3, 'Air Max TN'), (4, 'Dunk'), (5, 'Jordan'), 
(6, 'Outros'), (7, 'Acessórios'), (8, 'Casual'), (9, 'Corrida'), (10, 'Botas'), 
(11, 'Chuteiras'), (12, 'Sandálias'), (13, 'Adidas Campus'), (14, 'Air Force'),      
(15, 'Air Jordan 11'), (16, 'Air Max 97'), (17, 'Air Max 90'), (18, 'Asics Gel NYC'),
(19, 'Asics Kayano 14'), (20, 'Bape Sta'), (21, 'Air Force CPFM'), (22, 'Crocs Bape'),
(23, 'Crocs McQueen'), (24, 'Dior B30'), (26, 'Air Max DN8'), (27, 'Air Max Drift'),
(28, 'Nike Dunk'), (29, 'Nike Nocta Glide'), (30, 'Air Jordan 4'), (31, 'LV Trainer'),
(32, 'New Balance 530'), (33, 'New Balance 740'), (34, 'New Balance 1000'), (35, 'New Balance 9060'),
(36, 'Nike Vomero 5'), (37, 'Nocta Hot Step 2'), (38, 'Nike P-6000'), (39, 'Puma 180'),
(40, 'Nike Shox'), (41, 'Yeezy Slide'), (42, 'Puma Suede'), (43, 'Air Max TN3'), (44, 'Nocta Hot Step 1');

-- 4. USUÁRIO ADMIN
INSERT INTO _usuario (nome, email, cpf, telefone, senha, role) VALUES 
('Vinicius Admin', 'vinicius.biancolini.tds24@gmail.com', '000.000.000-00', '11999999999', '$2a$10$C0iH.HkG8Nh73C57GC7oT.jxzLawZbas/miJPJVP2qhTcpbZI0soq', 'ROLE_ADMIN');

-- ==================================================================================
-- 5. INSERÇÃO DOS PRODUTOS (EXTENSÕES .WEBP)
-- ==================================================================================

-- --- LOTE 1: AIR MAX 95 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 95 Triple Black', 'Nike Air Max 95 Triple Black\n\nTanque de guerra. Totalmente preto, esse pisante é pra quem quer discrição e agressividade no mesmo kit. Não suja fácil e impõe respeito.', '/uploads/95/1.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Midnight Navy', 'Nike Air Max 95 Midnight Navy\n\nO degradê cinza com azul marinho é sacanagem. Traz aquela vibe OG de quem entende do corre. Elegância e rua na mesma medida.', '/uploads/95/2.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Anatomy of Air', 'Nike Air Max 95 Anatomy of Air\n\nInspirado na fibra muscular humana. Texturas e cores únicas pra quem coleciona relíquia. Esse aqui conta história no pé.', '/uploads/95/3.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Royal', 'Nike Air Max 95 Black Royal\n\nPreto com detalhes em azul royal. Aquele detalhe que brilha quando bate a luz do flash. Conforto absurdo pra bater perna o dia todo.', '/uploads/95/4.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Pink Foam', 'Nike Air Max 95 Pink Foam\n\nContraste do preto pesado com rosa suave. Pra quem tem personalidade forte e não tem medo de ousar no visual. Destaque no rolê.', '/uploads/95/5.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Olive Green', 'Nike Air Max 95 Olive Green\n\nPegada militar tática. Verde oliva que combina demais com cargo pants e techwear. Visual de quem tá pronto pra guerra do dia a dia.', '/uploads/95/6.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Stadium Green', 'Nike Air Max 95 Stadium Green\n\nCinza com verde estádio. Visual clean e esportivo clássico dos anos 90. É colocar no pé e sentir o amortecimento Air Max.', '/uploads/95/7.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Solar Red', 'Nike Air Max 95 Solar Red\n\nO detalhe vermelho solar acende o tênis. Base cinza clássica com aquele "pop" de cor que chama atenção de longe. Rápido e agressivo.', '/uploads/95/8.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Cool Grey', 'Nike Air Max 95 Cool Grey\n\nO cinza mais respeitado da cena. Versátil demais, vai do trabalho pro baile sem perder a linha. Essencial na coleção.', '/uploads/95/9.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Earth', 'Nike Air Max 95 Black Earth\n\nTons terrosos com preto. Pegada outdoor robusta, aguenta o tranco e mantém o estilo. Diferenciado dos modelos padrão.', '/uploads/95/10.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Summit White', 'Nike Air Max 95 Summit White\n\nBranco gelo, limpo e perigoso. Tem que ter cuidado onde pisa, mas o estilo compensa. Eleva qualquer outfit básico.', '/uploads/95/11.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Racer Blue', 'Nike Air Max 95 Racer Blue\n\nCinza rasgado pelo azul racer. Uma das combinações mais icônicas da silhueta 95. Respira cultura sneaker.', '/uploads/95/12.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Oreo', 'Nike Air Max 95 Oreo\n\nPreto e branco, o famoso Oreo. Não tem erro, combina com tudo. Se tá na dúvida, esse é o tiro certo pra não errar no kit.', '/uploads/95/13.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Sequoia', 'Nike Air Max 95 Sequoia\n\nVerde musgo militar. Estética de batalha. Perfeito pra quem curte um visual mais fechado e underground.', '/uploads/95/14.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Total Orange', 'Nike Air Max 95 Total Orange\n\nLaranja que queima. Presença absurda. O degradê cinza serve de base pro laranja brilhar. Chave demais.', '/uploads/95/15.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Dark Grey', 'Nike Air Max 95 Dark Grey\n\nCinza chumbo com detalhes sutis. Low-profile pra quem não quer chamar atenção indesejada, mas manter o style.', '/uploads/95/16.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Khaki', 'Nike Air Max 95 Khaki\n\nTons de areia e cáqui. Visual deserto insano com jeans ou calça preta. Sai do comum.', '/uploads/95/17.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Anthracite', 'Nike Air Max 95 Anthracite\n\nQuase preto, mas com profundidade. O Anthracite dá um ar de mistério e sofisticação pro pisante.', '/uploads/95/18.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Grey Red', 'Nike Air Max 95 Grey Red\n\nCinza com vermelho varsity. Esportivo na veia. Parece que saiu direto de um clipe de rap dos anos 90.', '/uploads/95/19.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Blue Sole', 'Nike Air Max 95 Black Blue Sole\n\nPreto no cabedal com a sola azul translúcida. O detalhe na sola faz toda a diferença andando. Muito style.', '/uploads/95/20.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 White Ice', 'Nike Air Max 95 White Ice\n\nBranco com solado ice. A pureza em forma de tênis. Mantém ele limpo e você vai ter a nave mais bonita do rolê.', '/uploads/95/21.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Tour Yellow', 'Nike Air Max 95 Tour Yellow\n\nCinza e amarelo. Lembra o clássico Neon, mas com um tom mais quente. Chama atenção na medida certa.', '/uploads/95/22.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Utility Green', 'Nike Air Max 95 Utility Green\n\nVerde utilitário com preto. Parece equipamento tático. Robustez e estilo caminhando juntos.', '/uploads/95/23.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Gold', 'Nike Air Max 95 Black Gold\n\nPreto com dourado. A combinação da vitória. Traz um ar de luxo e ostentação pro modelo esportivo.', '/uploads/95/24.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Wolf Grey', 'Nike Air Max 95 Wolf Grey\n\nCinza lobo clássico. Aquele tênis que você usa até acabar e compra outro igual. Pau pra toda obra.', '/uploads/95/25.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Black Royal Low', 'Nike Air Max 95 Black Royal Low\n\nMais uma variação do preto e azul, focada no contraste forte. Ideal pra noite.', '/uploads/95/26.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Essential Brown', 'Nike Air Max 95 Essential Brown\n\nTons de marrom e verde oliva. Colorway madura e sofisticada. Fica muito chique no pé.', '/uploads/95/27.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 White Essential', 'Nike Air Max 95 White Essential\n\nBranco básico com construção premium. O ponto de partida pra qualquer coleção de respeito.', '/uploads/95/28.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG Neon', 'Nike Air Max 95 OG Neon\n\nO PAI DE TODOS. A cor original de 1995. Cinza com o amarelo neon volt. História pura, respeito máximo nas ruas.', '/uploads/95/29.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Bred', 'Nike Air Max 95 Bred\n\nPreto e vermelho. A colorway mais famosa do basquete aplicada no ícone da corrida. Agressividade pura.', '/uploads/95/30.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Dark Grey Black', 'Nike Air Max 95 Dark Grey Black\n\nDegradê escuro. Discreto, não chama atenção, mas quem sabe, sabe. Perfeito pro dia a dia.', '/uploads/95/31.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Grey Volt', 'Nike Air Max 95 Grey Volt\n\nUma variação moderna do Neon OG. Um pouco mais clara, mas com a mesma energia vibrante.', '/uploads/95/32.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Navy Blue', 'Nike Air Max 95 Navy Blue\n\nAzul marinho total. Sóbrio e elegante. Fica incrível com jeans e calças escuras.', '/uploads/95/33.webp', 351.00, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Triple White', 'Nike Air Max 95 Triple White\n\nDetalhes full white. Um visual clean e moderno. Ideal para quem prefere o estilo minimalista.', '/uploads/95/34.webp', 351.00, 1, 10, 1, 'AM95');


-- --- LOTE 2: ADIDAS CAMPUS ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Adidas Campus 00s Black White', 'Adidas Campus 00s Black White\n\nO hype do momento. Vibe skate anos 2000, silhueta gorda e cadarço largo. O coringa que todo mundo quer.', '/uploads/adidascampus/1.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Olive Strata', 'Adidas Campus 00s Olive Strata\n\nCamurça premium nesse tom verde oliva absurdo. Foge do padrão mantendo a estética chunky.', '/uploads/adidascampus/2.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Crystal White', 'Adidas Campus 00s Crystal White\n\nSola preta, cabedal branco off-white. O reverso do clássico. Pra quem curte contraste forte.', '/uploads/adidascampus/3.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Wonder White', 'Adidas Campus 00s Wonder White\n\nTom bege bem claro, quase areia. Clean e com vibe de luxo despojado. Combina com baggy jeans.', '/uploads/adidascampus/4.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Grey Gum', 'Adidas Campus 00s Grey Gum\n\nCinza com solado preto. Combinação sóbria e urbana. Neutro, estiloso e pronto pra lixa.', '/uploads/adidascampus/5.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Dark Green', 'Adidas Campus 00s Dark Green\n\nVerde escuro com listras creme. Visual universitário clássico com a robustez do Campus. Presença.', '/uploads/adidascampus/6.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Pink Strata', 'Adidas Campus 00s Pink Strata\n\nRosa queimado pra quem tem personalidade. Não é qualquer um que segura. Diferenciado e estiloso.', '/uploads/adidascampus/7.webp', 325.00, 13, 10, 3, 'CAMPUS'),
('Adidas Campus 00s Ambient Sky', 'Adidas Campus 00s Ambient Sky\n\nRoxo elétrico com listras pretas. Colorway rara na rua. Exclusividade no pé.', '/uploads/adidascampus/8.webp', 325.00, 13, 10, 3, 'CAMPUS');

-- --- LOTE 3: AIR FORCE 1 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1 Triple Black', 'Nike Air Force 1 Triple Black\n\nA lenda das ruas. AF1 todo preto é sinônimo de atitude. Durabilidade infinita e visual que impõe presença.', '/uploads/airforce/1.webp', 258.00, 14, 15, 1, 'AF1'),
('Nike Air Force 1 Triple White', 'Nike Air Force 1 Triple White\n\nO tênis mais icônico da história. Branco no branco. Limpo, clássico e essencial pra aquele visual fresh.', '/uploads/airforce/2.webp', 258.00, 14, 15, 1, 'AF1'),
('Nike Air Force 1 x CPFM Black', 'Nike Air Force 1 x CPFM Black\n\nColab insana. Letras gigantes "AIR" inspiradas no Uptempo. Preto total, couro premium. Obra de arte no pé.', '/uploads/cpfm/1.webp', 468.00, 21, 2, 1, 'CPFM'),
('Nike Air Force 1 x CPFM White', 'Nike Air Force 1 x CPFM White\n\nA versão branca da colab mais desejada. Letreiro "AIR" com contorno refletivo. Exclusividade nível hard.', '/uploads/cpfm/2.webp', 468.00, 21, 2, 1, 'CPFM');

-- --- LOTE 4: AIR JORDAN 11 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 11 Jubilee', 'Air Jordan 11 Jubilee\n\nEdição de 25 anos. Preto com detalhes prateados e verniz brilhando mais que o futuro. Luxo puro.', '/uploads/airjordan11/1.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Barons', 'Air Jordan 11 Low Barons\n\nInspirado no beisebol. Preto camuflado no verniz. Silhueta low pra quem quer estilo com liberdade.', '/uploads/airjordan11/2.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Concord', 'Air Jordan 11 Concord\n\nO Graal. Branco e preto verniz, solado gelo. É colocar no pé e sentir o peso da história.', '/uploads/airjordan11/3.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Concord', 'Air Jordan 11 Low Concord\n\nA elegância do Concord em versão baixa. Perfeito pro verão, mantendo a classe do verniz preto.', '/uploads/airjordan11/4.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Bred', 'Air Jordan 11 Bred\n\nPreto e Vermelho. A cor do campeonato. Agressivo, histórico e indispensável. Solado vermelho translúcido icônico.', '/uploads/airjordan11/5.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Bred', 'Air Jordan 11 Low Bred\n\nAtitude Bred em cano curto. Forro interno vermelho dá aquele destaque. Um dos lows mais procurados.', '/uploads/airjordan11/6.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Cherry', 'Air Jordan 11 Cherry\n\nBranco com verniz vermelho cereja. Chama atenção de longe. Visual limpo com explosão de cor.', '/uploads/airjordan11/7.webp', 325.00, 15, 5, 2, 'AJ11'),
('Air Jordan 11 Low Cherry', 'Air Jordan 11 Low Cherry\n\nVersão low do Cherry. Fresco, vibrante e com sola gelo. Ideal pra montar aquele kit de destaque.', '/uploads/airjordan11/8.webp', 325.00, 15, 5, 2, 'AJ11');

-- --- LOTE 5: AIR MAX 97 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 97 Have a Nike Day', 'Nike Air Max 97 Have a Nike Day\n\nTons pastéis e detalhes divertidos. Vibe positiva no visual. Design ondulado clássico com toque artístico.', '/uploads/airmax97/1.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Silver Bullet', 'Nike Air Max 97 Silver Bullet\n\nO original. Inspirado nos trens-bala do Japão. Prateado refletivo que brilha no flash. Obrigatório na coleção.', '/uploads/airmax97/2.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Black Metallic', 'Nike Air Max 97 Black Metallic\n\nPreto com texturas metálicas. Visual futurista e stealth. Combina com tudo e o ar total garante conforto.', '/uploads/airmax97/3.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 Black White', 'Nike Air Max 97 Black White\n\nPreto clássico com entressola branca. Contraste que nunca sai de moda. Linhas aerodinâmicas.', '/uploads/airmax97/4.webp', 325.00, 16, 8, 1, 'AM97'),
('Nike Air Max 97 White Wolf Grey', 'Nike Air Max 97 White Wolf Grey\n\nBranco com cinza lobo. Clean ao extremo. Pra quem gosta de um visual leve e sofisticado no corre.', '/uploads/airmax97/5.webp', 325.00, 16, 8, 1, 'AM97');

-- --- LOTE 6: AIR MAX 90 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max 90 Iron Grey', 'Nike Air Max 90 Iron Grey\n\nCinza ferro com detalhes vermelhos. Combinação robusta que remete aos clássicos. Cultura sneaker pura.', '/uploads/airmax90/1.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Infrared', 'Nike Air Max 90 Infrared\n\nA cor que definiu uma era. Infrared original vibrante. História nos pés. Respeito na roda.', '/uploads/airmax90/2.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Laser Blue', 'Nike Air Max 90 Laser Blue\n\nBranco, preto e aquele azul laser rasgando. Esportivo e estiloso, vibe anos 90 com pegada atual.', '/uploads/airmax90/3.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Hyper Turquoise', 'Nike Air Max 90 Hyper Turquoise\n\nTurquesa vibrante nos detalhes. Colorway fresca, chama atenção sem ser exagerada. Perfeito pro verão.', '/uploads/airmax90/4.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Grape', 'Nike Air Max 90 Grape\n\nRoxo e verde água. Combinação lendária. Traz uma vibe retrô muito forte e diferenciada.', '/uploads/airmax90/5.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Triple White', 'Nike Air Max 90 Triple White\n\nBranco total. Couro liso. A definição de clean. Vai com terno ou bermuda. Base perfeita pro outfit.', '/uploads/airmax90/6.webp', 325.00, 17, 10, 1, 'AM90'),
('Nike Air Max 90 Black White', 'Nike Air Max 90 Black White\n\nPreto com swoosh branco. O pão com manteiga dos sneakers. Funcional e estiloso. Tênis de batalha.', '/uploads/airmax90/7.webp', 325.00, 17, 10, 1, 'AM90');

-- --- LOTE 7: ASICS GEL NYC ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Asics Gel-NYC Pink Cream', 'Asics Gel-NYC Pink Cream\n\nColorway insana. Rosa, creme e materiais premium. Estética "dad shoe" no nível de luxo urbano. Hype puro.', '/uploads/asycsnyc/1.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Black Clay', 'Asics Gel-NYC Black Clay\n\nPreto com tons de argila. Sombrio e sofisticado. Tecnologia Gel garante nuvens nos pés enquanto você destrói no look.', '/uploads/asycsnyc/2.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Navy Blue', 'Asics Gel-NYC Navy Blue\n\nAzul marinho com cinza. Visual técnico, inspirado na performance de NY. Combina com tactel ou cargo.', '/uploads/asycsnyc/3.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Grey Red', 'Asics Gel-NYC Grey Red\n\nBase cinza com detalhes vermelhos sutis. Visual esportivo clássico repaginado pra rua. Alta qualidade.', '/uploads/asycsnyc/4.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Teal', 'Asics Gel-NYC White Teal\n\nBranco com detalhes verde água. Fresco e clean. A silhueta se destaca demais nessas cores claras.', '/uploads/asycsnyc/5.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Dolphin Blue', 'Asics Gel-NYC Dolphin Blue\n\nTons de azul e cinza metálico. Futurista e retrô. Pra quem curte a estética Y2K runner.', '/uploads/asycsnyc/6.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Graphite Grey', 'Asics Gel-NYC Graphite Grey\n\nCinza grafite monstro. Não aparece sujeira e fica bem com qualquer roupa escura. Rei da versatilidade.', '/uploads/asycsnyc/7.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Midnight', 'Asics Gel-NYC Midnight\n\nAzul escuro e preto. Visual noturno, perfeito pro rolê. Mistura de camurça e mesh com textura incrível.', '/uploads/asycsnyc/8.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Oatmeal', 'Asics Gel-NYC Oatmeal\n\nTons de aveia e creme. Tendência earth tones no seu melhor. Sofisticado, limpo e super confortável.', '/uploads/asycsnyc/9.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Royal', 'Asics Gel-NYC White Royal\n\nBranco com azul royal forte. Esportivo e agressivo na medida certa. Detalhes refletivos top.', '/uploads/asycsnyc/10.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Pure Silver', 'Asics Gel-NYC Pure Silver\n\nPrata puro. A estética metálica dos anos 2000 voltou com tudo. Brilha muito e chama atenção.', '/uploads/asycsnyc/11.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Black Phantom', 'Asics Gel-NYC Black Phantom\n\nPreto fantasma. Quase todo preto com nuances de cinza. Pra quem curte visual stealth ninja.', '/uploads/asycsnyc/12.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC White Cloud', 'Asics Gel-NYC White Cloud\n\nBranco nuvem com detalhes cinza claro. Leveza visual total. Parece que você está flutuando.', '/uploads/asycsnyc/13.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Sky Blue', 'Asics Gel-NYC Sky Blue\n\nAzul céu com marrom. Combinação inusitada que funcionou demais. Exclusivo e diferenciado.', '/uploads/asycsnyc/14.webp', 377.00, 18, 5, 5, 'GELNYC'),
('Asics Gel-NYC Concrete', 'Asics Gel-NYC Concrete\n\nInspirado no concreto de Nova York. Tons de cinza urbano e bege. A cara da cidade.', '/uploads/asycsnyc/15.webp', 377.00, 18, 5, 5, 'GELNYC');

-- --- LOTE 8: ASICS KAYANO 14 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES
('Asics Gel-Kayano 14 Cream Green', 'Asics Gel-Kayano 14 Cream Green\n\nA lenda retornou. Base creme com detalhes metálicos esverdeados. O sneaker do momento. Hype absoluto.', '/uploads/asycskayano/1.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 Cream Black', 'Asics Gel-Kayano 14 Cream Black\n\nMesh creme com sobreposições pretas e prateadas. Contraste perfeito. Visual técnico, retrô e confortável.', '/uploads/asycskayano/2.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 White Pink', 'Asics Gel-Kayano 14 White Pink\n\nBase branca e prata com detalhes em rosa choque. Mistura delicadeza com agressividade runner.', '/uploads/asycskayano/3.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 White Blue', 'Asics Gel-Kayano 14 White Blue\n\nBranco, prata e azul bebê. Fresh e limpo. Eleva o nível de qualquer outfit básico.', '/uploads/asycskayano/4.webp', 403.00, 19, 5, 5, 'KAYANO14'),
('Asics Gel-Kayano 14 Black Silver', 'Asics Gel-Kayano 14 Black Silver\n\nPreto com detalhes prateados. O visual noturno do Kayano. Agressivo, rápido e pronto pro asfalto.', '/uploads/asycskayano/5.webp', 403.00, 19, 5, 5, 'KAYANO14');

-- --- LOTE 9: BAPE STA ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Bape Sta Black Patent', 'Bape Sta Black Patent\n\nÍcone japonês em couro envernizado preto e cinza. A estrela lateral (Sta) não deixa dúvidas. Brilho e hype.', '/uploads/bapesta/1.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Blue Patent', 'Bape Sta Blue Patent\n\nAzul celeste envernizado. Lembra os dias de glória do hip-hop 2000. Vibrante, destaca qualquer look.', '/uploads/bapesta/2.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Green Patent', 'Bape Sta Green Patent\n\nVerde bandeira brilhante. A Bathing Ape não brinca. Qualidade absurda e visual que para o trânsito.', '/uploads/bapesta/3.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Black White', 'Bape Sta Black White\n\nPreto e branco clássico, mas com o verniz Bape. O panda de luxo. Versátil com toque de ostentação.', '/uploads/bapesta/4.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Orange Patent', 'Bape Sta Orange Patent\n\nLaranja mecânica. Cor cítrica forte pra quem quer ser visto. Acabamento premium único.', '/uploads/bapesta/5.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta Grey Patent', 'Bape Sta Grey Patent\n\nCinza e branco envernizado. O mais sóbrio, mas sem perder o brilho. Elegância streetwear nível máximo.', '/uploads/bapesta/6.webp', 364.00, 20, 3, 4, 'BAPE'),
('Bape Sta White Black', 'Bape Sta White Black\n\nBranco com estrela preta. Simples e direto. Logo Bape lateral e calcanhar mostram a força da marca.', '/uploads/bapesta/7.webp', 364.00, 20, 3, 4, 'BAPE');

-- --- LOTE 10: AIR FORCE CPFM ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Force 1 x CPFM Black', 'Nike Air Force 1 x CPFM Black\n\nColab insana. Letras gigantes "AIR" inspiradas no Uptempo. Preto total, couro premium. Obra de arte no pé.', '/uploads/cpfm/1.webp', 468.00, 21, 2, 1, 'CPFM'),
('Nike Air Force 1 x CPFM White', 'Nike Air Force 1 x CPFM White\n\nA versão branca da colab mais desejada. Letreiro "AIR" com contorno refletivo. Exclusividade nível hard.', '/uploads/cpfm/2.webp', 468.00, 21, 2, 1, 'CPFM');

-- --- LOTE 11: CROCS BAPE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs x Bape Green Camo', 'Crocs x Bape Green Camo\n\nConforto Crocs com hype Bape. Camuflagem verde clássica da marca japonesa.', '/uploads/crocsbape/1.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Black Camo', 'Crocs x Bape Black Camo\n\nCamuflagem escura e discreta. Edição limitada pra relaxar com muito estilo.', '/uploads/crocsbape/2.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Pink Camo', 'Crocs x Bape Pink Camo\n\nCamuflagem rosa pra quem tem estilo. Colab exclusiva que chama atenção.', '/uploads/crocsbape/3.webp', 266.00, 22, 10, 9, 'CROCS'),
('Crocs x Bape Blue Camo', 'Crocs x Bape Blue Camo\n\nTons de azul na camuflagem Bape. Visual único e colecionável.', '/uploads/crocsbape/4.webp', 266.00, 22, 10, 9, 'CROCS');

-- --- LOTE 12: CROCS MCQUEEN ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Crocs Lightning McQueen', 'Crocs Lightning McQueen\n\nKatchau! O carro mais rápido do mundo virou Crocs. Acende luz ao andar. Edição de colecionador.', '/uploads/crocsmaqueen/1.webp', 254.00, 23, 10, 9, 'MCQUEEN'),
('Crocs Mater', 'Crocs Mater\n\nO Mate chegou pra rebocar seu estilo. Detalhes incríveis do personagem mais carismático de Carros.', '/uploads/crocsmaqueen/2.webp', 254.00, 23, 10, 9, 'MCQUEEN');

-- --- LOTE 13: DIOR B30 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Dior B30 White Grey', 'Dior B30 White Grey\n\nÁpice do luxo esportivo. Branco e cinza, logo CD refletivo. Elegância da alta costura no asfalto.', '/uploads/diorb30/1.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Blue Grey', 'Dior B30 Blue Grey\n\nCombinação de azul marinho e cinza. Sofisticado e exclusivo. Pra quem anda de nave.', '/uploads/diorb30/2.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Mint Grey', 'Dior B30 Mint Grey\n\nDetalhes em verde menta suave. Diferenciado e moderno. Luxo discreto.', '/uploads/diorb30/3.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 White Black', 'Dior B30 White Black\n\nO clássico panda da alta moda. Contraste preto e branco impecável.', '/uploads/diorb30/4.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Black White', 'Dior B30 Black White\n\nPreto predominante com detalhes brancos. Visual agressivo e chique.', '/uploads/diorb30/5.webp', 351.00, 24, 2, 11, 'B30'),
('Dior B30 Triple Black', 'Dior B30 Triple Black\n\nTodo preto. O mais procurado. Combina com terno ou com streetwear de luxo.', '/uploads/diorb30/6.webp', 351.00, 24, 2, 11, 'B30');

-- --- LOTE 14: AIR MAX DN ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN Black Violet', 'Nike Air Max DN Black Violet\n\nNova era do Air. Tecnologia Dynamic Air 4 tubos. Preto com detalhes roxos vibrantes.', '/uploads/dn/1.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Supreme', 'Nike Air Max DN Supreme\n\nColaboração exclusiva. Logo Supreme na lateral muda tudo. Hype instantâneo.', '/uploads/dn/2.webp', 370.00, 2, 5, 1, 'DN'),
('Nike Air Max DN Panda', 'Nike Air Max DN Panda\n\nPreto e branco na nova silhueta DN. Equilíbrio perfeito entre futuro e clássico.', '/uploads/dn/3.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Triple Black', 'Nike Air Max DN Triple Black\n\nDesign moderno e agressivo. Preto total com a nova bolha de ar. Stealth.', '/uploads/dn/4.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Platinum', 'Nike Air Max DN Platinum\n\nPrata e branco. Estética clean com tecnologia de ponta. Parece nave espacial.', '/uploads/dn/5.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Volt', 'Nike Air Max DN Volt\n\nVisual futurista e conforto surreal. Cor Volt pra chocar e chamar atenção.', '/uploads/dn/6.webp', 370.00, 2, 8, 1, 'DN'),
('Nike Air Max DN Sail', 'Nike Air Max DN Sail\n\nTom off-white (Sail). Elegante e fácil de combinar com qualquer fit.', '/uploads/dn/7.webp', 370.00, 2, 8, 1, 'DN');

-- --- LOTE 15: AIR MAX DN8 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max DN8 Blue Void', 'Nike Air Max DN8 Blue Void\n\nEvolução máxima: 8 tubos. Azul profundo e tecnológico.', '/uploads/dn8/1.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Grey', 'Nike Air Max DN8 Black Grey\n\nSombrio e futurista. Preto com cinza para visual stealth.', '/uploads/dn8/2.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Midnight', 'Nike Air Max DN8 Midnight\n\nProfundidade e elegância. Azul meia-noite com detalhes pretos.', '/uploads/dn8/3.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Blue', 'Nike Air Max DN8 White Blue\n\nVisual limpo e moderno. Branco com detalhes azuis elétricos.', '/uploads/dn8/4.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Volt', 'Nike Air Max DN8 White Volt\n\nDetalhes neon que chamam atenção. Branco com bolha Volt.', '/uploads/dn8/5.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Grey Orange', 'Nike Air Max DN8 Grey Orange\n\nContraste esportivo dinâmico. Cinza com detalhes laranjas.', '/uploads/dn8/6.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Panda', 'Nike Air Max DN8 Panda\n\nClássico repaginado pro futuro. Preto e branco, contraste forte.', '/uploads/dn8/7.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Sunset', 'Nike Air Max DN8 Sunset\n\nCores do pôr do sol. Degradê quente que destaca no pé.', '/uploads/dn8/8.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Volt Black', 'Nike Air Max DN8 Volt Black\n\nEnergia pura em cada passo. Amarelo neon e preto.', '/uploads/dn8/9.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Green', 'Nike Air Max DN8 Black Green\n\nEstilo robusto e moderno. Preto e verde neon.', '/uploads/dn8/10.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Grey Green', 'Nike Air Max DN8 Grey Green\n\nTons neutros com atitude. Cinza com detalhes verdes.', '/uploads/dn8/11.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Light Grey', 'Nike Air Max DN8 Light Grey\n\nLeveza visual e conforto. Cinza claro futurista.', '/uploads/dn8/12.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Tan', 'Nike Air Max DN8 Tan\n\nSofisticação urbana em tons de bege. Perfeito pro dia a dia.', '/uploads/dn8/13.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 White Pattern', 'Nike Air Max DN8 White Pattern\n\nEstampa exclusiva e ousada. Branco com gráficos.', '/uploads/dn8/14.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Pattern', 'Nike Air Max DN8 Black Pattern\n\nVisual gráfico impactante. Preto com estampas.', '/uploads/dn8/15.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Anthracite', 'Nike Air Max DN8 Anthracite\n\nDiscrição e tecnologia. Cinza escuro quase preto.', '/uploads/dn8/16.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Pink', 'Nike Air Max DN8 Black Pink\n\nToque de cor vibrante no preto. Rosa choque nos detalhes.', '/uploads/dn8/17.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Pink Black', 'Nike Air Max DN8 Pink Black\n\nEstilo marcante e moderno. Rosa predominante.', '/uploads/dn8/18.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Black Red', 'Nike Air Max DN8 Black Red\n\nAgressividade e performance. Preto e vermelho.', '/uploads/dn8/19.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Pink Red', 'Nike Air Max DN8 Pink Red\n\nDestaque-se na multidão. Mistura quente de rosa e vermelho.', '/uploads/dn8/20.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Red Black', 'Nike Air Max DN8 Red Black\n\nForça e impacto visual. Vermelho com preto.', '/uploads/dn8/21.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Purple', 'Nike Air Max DN8 Purple\n\nCor única e diferenciada. Roxo metálico.', '/uploads/dn8/22.webp', 377.00, 26, 6, 1, 'DN8'),
('Nike Air Max DN8 Olive', 'Nike Air Max DN8 Olive\n\nInspirado no militarismo urbano. Verde oliva tático.', '/uploads/dn8/23.webp', 377.00, 26, 6, 1, 'DN8');

-- --- LOTE 16: AIR MAX DRIFT ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Air Max Plus Drift Phantom', 'Nike Air Max Plus Drift Phantom\n\nEvolução agressiva do TN. Branco fantasma com estrutura preta. Visual de tubarão futurista.', '/uploads/drift/1.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Sunset', 'Nike Air Max Plus Drift Sunset\n\nO clássico degradê do pôr do sol numa carcaça muito mais robusta e moderna.', '/uploads/drift/2.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Midnight', 'Nike Air Max Plus Drift Midnight\n\nAzul e cinza numa combinação noturna. Estrutura pesada que chama atenção.', '/uploads/drift/3.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Glacier', 'Nike Air Max Plus Drift Glacier\n\nTons de gelo e azul claro. Fresco e impactante.', '/uploads/drift/4.webp', 348.00, 27, 8, 1, 'DRIFT'),
('Nike Air Max Plus Drift Triple Black', 'Nike Air Max Plus Drift Triple Black\n\nO mais agressivo de todos. Todo preto, parece uma armadura no pé.', '/uploads/drift/5.webp', 348.00, 27, 8, 1, 'DRIFT');

-- --- LOTE 17: NIKE DUNK ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Dunk Low Panda', 'Nike Dunk Low Panda\n\nO fenômeno. Preto e Branco. Todo mundo quer, todo mundo usa. O tênis mais versátil da atualidade.', '/uploads/dunk/1.webp', 286.00, 28, 15, 1, 'DUNK'),
('Nike Dunk Low Gym Red', 'Nike Dunk Low Gym Red\n\nVermelho universitário e branco. Aquele visual retrô que combina com jeans e bermuda.', '/uploads/dunk/2.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Black White', 'Nike Dunk Low Black White\n\nOutra variação do clássico preto e branco. Simples e direto.', '/uploads/dunk/3.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Kentucky', 'Nike Dunk Low Kentucky\n\nAzul royal e branco. Uma das cores originais "Be True". Clássico demais.', '/uploads/dunk/4.webp', 286.00, 28, 8, 1, 'DUNK'),
('Nike Dunk Low Grey Fog', 'Nike Dunk Low Grey Fog\n\nCinza claro e branco. A cor mais clean e fácil de combinar depois do Panda. Elegância no streetwear.', '/uploads/dunk/5.webp', 286.00, 28, 10, 1, 'DUNK'),
('Nike Dunk Low Shadow', 'Nike Dunk Low Shadow\n\nPreto, cinza e branco. Combinação neutra com toque de seriedade. Perfeito pro dia a dia.', '/uploads/dunk/6.webp', 286.00, 28, 10, 1, 'DUNK');

-- --- LOTE 18: NIKE NOCTA GLIDE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Nocta Glide White', 'Nike Nocta Glide White\n\nInspirado no basquete anos 90 por Drake. Branco com detalhes cromados. Luxo esportivo.', '/uploads/glide/1.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Black', 'Nike Nocta Glide Black\n\nPreto com fibra de carbono falsa e os "olhos de inseto" na sola. Design único da Nocta.', '/uploads/glide/2.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Triple White', 'Nike Nocta Glide Triple White\n\nTodo branco, impecável. O visual futurista ganha destaque na limpeza dessa cor.', '/uploads/glide/3.webp', 403.00, 29, 5, 1, 'GLIDE'),
('Nike Nocta Glide Black Chrome', 'Nike Nocta Glide Black Chrome\n\nPreto com os detalhes cromados brilhando muito. A versão mais procurada.', '/uploads/glide/4.webp', 403.00, 29, 5, 1, 'GLIDE');

-- --- LOTE 19: AIR JORDAN 4 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Jordan 4 Metallic Purple', 'Air Jordan 4 Metallic Purple\n\nBranco couro premium com detalhes metálicos roxos. Clean e muito chique.', '/uploads/jordan4/1.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Black Canvas', 'Air Jordan 4 Black Canvas\n\nLona preta resistente e camurça. Visual diferenciado e rústico pro clássico AJ4.', '/uploads/jordan4/2.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Thunder', 'Air Jordan 4 Thunder\n\nO retorno do trovão. Preto e amarelo vibrante. Um dos colorways mais amados.', '/uploads/jordan4/3.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Red Thunder', 'Air Jordan 4 Red Thunder\n\nA agressividade e estilo em cada detalhe.', '/uploads/jordan4/4.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Seafoam', 'Air Jordan 4 Seafoam\n\nBranco com detalhes em verde suave. Uma cor mais delicada e exclusiva.', '/uploads/jordan4/5.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Military Blue', 'Air Jordan 4 Military Blue\n\nÍcone de 1989 está de volta. Branco, cinza e azul militar. O verdadeiro OG.', '/uploads/jordan4/6.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Sail Gold', 'Air Jordan 4 Sail Gold\n\nTom off-white com detalhes dourados. Luxo puro, exclusivo.', '/uploads/jordan4/7.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Fire Red', 'Air Jordan 4 Fire Red\n\nA cor original de Michael Jordan. Branco, preto e vermelho. Essencial.', '/uploads/jordan4/8.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 University Blue', 'Air Jordan 4 University Blue\n\nCamurça azul claro premium. Homenagem à faculdade do MJ. Hype absurdo.', '/uploads/jordan4/9.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Lightning', 'Air Jordan 4 Lightning\n\nAmarelo total. Quem usa esse tênis quer ser visto. Um clássico relançado.', '/uploads/jordan4/10.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Midnight Navy', 'Air Jordan 4 Midnight Navy\n\nBranco com azul marinho e respingos cinza. Toque azul no clássico.', '/uploads/jordan4/11.webp', 466.00, 30, 5, 2, 'AJ4'),
('Air Jordan 4 Black Cat', 'Air Jordan 4 Black Cat\n\nO rei dos Jordan 4. Preto total, nubuck. A lenda. O mais desejado de todos.', '/uploads/jordan4/12.webp', 466.00, 30, 3, 2, 'AJ4');

-- --- LOTE 20: LV TRAINER ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('LV Trainer Grey White', 'LV Trainer Grey White\n\nDesign Virgil Abloh. Cinza e branco com couro premium. O ápice do luxo no streetwear.', '/uploads/lvtrainer/1.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Blue Monogram', 'LV Trainer Blue Monogram\n\nJeans azul com o monograma Louis Vuitton. Exclusividade e estilo inconfundível.', '/uploads/lvtrainer/2.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Black Denim', 'LV Trainer Black Denim\n\nJeans preto monogramado. Discreto, mas quem conhece sabe o valor.', '/uploads/lvtrainer/3.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Triple Black', 'LV Trainer Triple Black\n\nTodo preto, materiais variados. Elegância silenciosa.', '/uploads/lvtrainer/4.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer White', 'LV Trainer White\n\nBranco total. A pureza do design LV em destaque.', '/uploads/lvtrainer/5.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Green', 'LV Trainer Green\n\nBranco com verde. Uma das cores mais famosas da coleção.', '/uploads/lvtrainer/6.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Black Yellow', 'LV Trainer Black Yellow\n\nPreto com detalhes amarelos neon. Moderno e arrojado.', '/uploads/lvtrainer/7.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Navy', 'LV Trainer Navy\n\nAzul marinho e branco. Clássico e atemporal.', '/uploads/lvtrainer/8.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Light Blue', 'LV Trainer Light Blue\n\nAzul bebê com branco. Fresco e luxuoso.', '/uploads/lvtrainer/9.webp', 468.00, 31, 2, 10, 'LV'),
('LV Trainer Panda', 'LV Trainer Panda\n\nPreto e branco. O contraste que todo mundo ama, versão luxo.', '/uploads/lvtrainer/10.webp', 468.00, 31, 2, 10, 'LV');

-- --- LOTE 21: NEW BALANCE 530 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 530 White Green', 'New Balance 530 White Green\n\nQueridinho do retro running. Branco com detalhes verdes. Conforto leve pro dia todo.', '/uploads/nb530/1.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 Black White', 'New Balance 530 Black White\n\nPreto e branco. Visual clássico que combina com qualquer look casual.', '/uploads/nb530/2.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 White Blue', 'New Balance 530 White Blue\n\nBranco com azul marinho. Fresh e esportivo.', '/uploads/nb530/3.webp', 312.00, 32, 10, 6, 'NB530'),
('New Balance 530 Silver', 'New Balance 530 Silver\n\nPrata metálico. A tendência Y2K forte nesse modelo.', '/uploads/nb530/4.webp', 312.00, 32, 10, 6, 'NB530');

-- --- LOTE 22: NEW BALANCE 740 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 740 Black Silver', 'New Balance 740 Black Silver\n\nEstética técnica e moderna. Preto com prata.', '/uploads/nb740/1.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 White Green', 'New Balance 740 White Green\n\nVisual limpo com toque esportivo verde. Elegante e funcional.', '/uploads/nb740/2.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 Silver', 'New Balance 740 Silver\n\nFuturista e ousado. Prata metálico total.', '/uploads/nb740/3.webp', 377.00, 33, 8, 6, 'NB740'),
('New Balance 740 White Blue', 'New Balance 740 White Blue\n\nClássico e versátil. Branco com detalhes azuis.', '/uploads/nb740/4.webp', 377.00, 33, 8, 6, 'NB740');

-- --- LOTE 23: NEW BALANCE 1000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 1000 Angora', 'New Balance 1000 Angora\n\nDesign inovador e texturas premium em tons claros de bege e rosa.', '/uploads/nb1000/1.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Silver', 'New Balance 1000 Silver\n\nVisual técnico e moderno em prata. Parece que veio do futuro.', '/uploads/nb1000/2.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Black Ice', 'New Balance 1000 Black Ice\n\nBrilho e sofisticação em preto degradê. Muito style.', '/uploads/nb1000/3.webp', 312.00, 34, 6, 6, 'NB1000'),
('New Balance 1000 Pink', 'New Balance 1000 Pink\n\nCombinação de cores única com rosa e marrom. Diferenciado.', '/uploads/nb1000/4.webp', 312.00, 34, 6, 6, 'NB1000');

-- --- LOTE 24: NEW BALANCE 9060 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('New Balance 9060 Sea Salt', 'New Balance 9060 Sea Salt\n\nTons neutros e elegantes. Bege claro (Sal Marinho). Luxo casual.', '/uploads/nb9060/1.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Castlerock', 'New Balance 9060 Castlerock\n\nFuturismo e conforto extremo. Cinza e preto. O modelo do momento.', '/uploads/nb9060/2.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Blue Haze', 'New Balance 9060 Blue Haze\n\nSuavidade em tons pastéis de azul. Diferenciado.', '/uploads/nb9060/3.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Navy', 'New Balance 9060 Navy\n\nAzul profundo e sofisticado. Uma cor mais séria pra silhueta ousada.', '/uploads/nb9060/4.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Driftwood', 'New Balance 9060 Driftwood\n\nEstilo orgânico e natural. Tons de madeira e creme.', '/uploads/nb9060/5.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Quartz', 'New Balance 9060 Quartz\n\nTons minerais únicos e claros. Cinza quartzo.', '/uploads/nb9060/6.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Black White', 'New Balance 9060 Black White\n\nEssencial e moderno. Preto com sola branca. Básico que funciona.', '/uploads/nb9060/7.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Oreo', 'New Balance 9060 Oreo\n\nO contraste perfeito preto e branco. Versátil demais.', '/uploads/nb9060/8.webp', 416.00, 35, 8, 6, 'NB9060'),
('New Balance 9060 Black Red', 'New Balance 9060 Black Red\n\nSola volumosa e design agressivo. Preto e vermelho. Conforto absurdo.', '/uploads/nb9060/9.webp', 416.00, 35, 8, 6, 'NB9060');

-- --- LOTE 25: NIKE VOMERO 5 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Zoom Vomero 5 Cobblestone', 'Nike Zoom Vomero 5 Cobblestone\n\nA tendência Dad Shoe com conforto máximo. Cinza pedregulho com detalhes verdes.', '/uploads/nikevomero/1.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Supersonic', 'Nike Zoom Vomero 5 Supersonic\n\nVisual rápido e moderno. Branco, preto e creme. Tech runner.', '/uploads/nikevomero/2.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Iron Ore', 'Nike Zoom Vomero 5 Iron Ore\n\nTons metálicos e malha respirável. Cinza ferro. Muito style.', '/uploads/nikevomero/3.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Triple Black', 'Nike Zoom Vomero 5 Triple Black\n\nDiscreto e cheio de tecnologia. Preto total. Ninja.', '/uploads/nikevomero/4.webp', 416.00, 36, 10, 1, 'VOMERO'),
('Nike Zoom Vomero 5 Photon Dust', 'Nike Zoom Vomero 5 Photon Dust\n\nO branco gelo que eleva qualquer look. Super clean.', '/uploads/nikevomero/5.webp', 416.00, 36, 10, 1, 'VOMERO');

-- --- LOTE 26: NOCTA HOT STEP 2 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nocta Hot Step 2 Black', 'Nike Nocta Hot Step 2 Black\n\nEvolução da parceria com Drake. Preto com detalhes refletivos. Futurista.', '/uploads/noctahotstep/1.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 Orange', 'Nike Nocta Hot Step 2 Orange\n\nCor vibrante que rouba a cena. Laranja total. Presença.', '/uploads/noctahotstep/2.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 White', 'Nike Nocta Hot Step 2 White\n\nDesign clean e futurista. Branco total. Impecável.', '/uploads/noctahotstep/3.webp', 429.00, 37, 5, 1, 'HOTSTEP'),
('Nocta Hot Step 2 Eggplant', 'Nike Nocta Hot Step 2 Eggplant\n\nTom exclusivo e sofisticado. Roxo berinjela metálico.', '/uploads/noctahotstep/4.webp', 429.00, 37, 5, 1, 'HOTSTEP');

-- --- LOTE 27: NIKE P-6000 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike P-6000 Black', 'Nike P-6000 Black\n\nEstilo de corrida anos 2000. Preto básico. Conforto e nostalgia.', '/uploads/p6000/1.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Red', 'Nike P-6000 Red\n\nVisual esportivo retrô. Branco com vermelho. Clássico runner.', '/uploads/p6000/2.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Gold', 'Nike P-6000 Gold\n\nDetalhes dourados para um toque premium no branco.', '/uploads/p6000/3.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Silver', 'Nike P-6000 Silver\n\nA era de prata da corrida. Metálico clássico Y2K.', '/uploads/p6000/4.webp', 377.00, 38, 12, 1, 'P6000'),
('Nike P-6000 Blue', 'Nike P-6000 Blue\n\nAzul clássico e versátil. Branco com azul.', '/uploads/p6000/5.webp', 377.00, 38, 12, 1, 'P6000');

-- --- LOTE 28: PUMA 180 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma-180 Grey', 'Puma-180 Grey\n\nEstilo skate chunky anos 90. Cinza Cordura. Robusto.', '/uploads/puma180/1.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 White', 'Puma-180 White\n\nVisual limpo e volumoso. Branco e cinza. Clean.', '/uploads/puma180/2.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Dark', 'Puma-180 Dark\n\nSombrio e estiloso. Cinza escuro. Aguenta o tranco.', '/uploads/puma180/3.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Blue', 'Puma-180 Blue\n\nDetalhes suaves em azul. Estética retro skate.', '/uploads/puma180/4.webp', 364.00, 39, 8, 7, 'PUMA180'),
('Puma-180 Chocolate', 'Puma-180 Chocolate\n\nTons quentes e diferenciados. Marrom. Estilo único.', '/uploads/puma180/5.webp', 364.00, 39, 8, 7, 'PUMA180');

-- --- LOTE 29: NIKE SHOX TL ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Nike Shox TL White', 'Nike Shox TL White\n\nRetorno das 12 molas. Impacto visual branco e prata. O famoso 12 molas.', '/uploads/shox/1.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Black', 'Nike Shox TL Black\n\nAgressivo e mecânico. Preto total. Vilão style.', '/uploads/shox/2.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Silver', 'Nike Shox TL Silver\n\nFuturismo puro. Prata metálico. Chama atenção de longe.', '/uploads/shox/3.webp', 364.00, 40, 5, 1, 'SHOX'),
('Nike Shox TL Panda', 'Nike Shox TL Panda\n\nO contraste clássico das molas. Branco e preto.', '/uploads/shox/4.webp', 364.00, 40, 5, 1, 'SHOX');

-- --- LOTE 30: YEEZY SLIDE ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Yeezy Slide Slate', 'Yeezy Slide Slate\n\nConforto minimalista revolucionário. Tom cinza escuro. Pra relaxar com hype.', '/uploads/slide/1.webp', 255.00, 41, 20, 12, 'SLIDE'),
('Yeezy Slide Bone', 'Yeezy Slide Bone\n\nEstilo orgânico e neutro. Cor osso. O chinelo mais desejado.', '/uploads/slide/2.webp', 255.00, 41, 20, 12, 'SLIDE');

-- --- LOTE 31: PUMA SUEDE XL ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Puma Suede XL Green', 'Puma Suede XL Green\n\nO clássico agora exagerado e confortável. Verde com listra branca. Cadarço fat.', '/uploads/suede/1.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Maroon', 'Puma Suede XL Maroon\n\nEstilo retro com cadarços fat. Vinho. Vibe anos 2000.', '/uploads/suede/2.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Black Gum', 'Puma Suede XL Black Gum\n\nSola gum clássica e camurça preta. O combo perfeito.', '/uploads/suede/3.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Black', 'Puma Suede XL Black\n\nVisual all-black robusto. Pra lixar ou pro rolê.', '/uploads/suede/4.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL White', 'Puma Suede XL White\n\nLimpo e impactante. Branco e preto. Clássico.', '/uploads/suede/5.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Red', 'Puma Suede XL Red\n\nEnergia vermelha para o seu outfit. Destaque total.', '/uploads/suede/6.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Blue', 'Puma Suede XL Blue\n\nAzul real vibrante. Cor forte e marcante.', '/uploads/suede/7.webp', 325.00, 42, 10, 7, 'SUEDE'),
('Puma Suede XL Panda', 'Puma Suede XL Panda\n\nO OG remasterizado. Preto e branco invertido.', '/uploads/suede/8.webp', 325.00, 42, 10, 7, 'SUEDE');

-- --- LOTE 32: TIMBERLAND ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Timberland Chocolate', 'Timberland 6-Inch Chocolate\n\nA bota amarela original à prova d''água. Marrom escuro. Indestrutível.', '/uploads/timbis/1.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Black', 'Timberland 6-Inch Black\n\nDurabilidade e estilo urbano. Preto nobuck. Pesada.', '/uploads/timbis/2.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Olive', 'Timberland 6-Inch Olive\n\nToque militar e robusto. Verde oliva. Pra qualquer terreno.', '/uploads/timbis/3.webp', 359.00, 10, 5, 8, 'TIMBERLAND'),
('Timberland Wheat', 'Timberland 6-Inch Wheat\n\nO clássico absoluto. Amarelo trigo. O ícone de Nova York.', '/uploads/timbis/4.webp', 359.00, 10, 5, 8, 'TIMBERLAND');

-- --- LOTE 33: AIR MAX TN (TN1) ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Max TN Black Blue', 'Nike Air Max TN Black Blue\n\nO Tubarão original com tecnologia Tuned Air. Preto e azul. Agressivo.', '/uploads/tn1/1.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Tiger', 'Nike Air Max TN Tiger\n\nDegradê agressivo laranja. O famoso Tigre. Clássico das ruas.', '/uploads/tn1/2.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Grey', 'Nike Air Max TN Grey\n\nSóbrio e icônico. Cinza e preto. Combina com tudo.', '/uploads/tn1/3.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Black Swoosh', 'Nike Air Max TN Black Swoosh\n\nBase preta com destaque branco no logo. Simples e chave.', '/uploads/tn1/4.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Purple', 'Nike Air Max TN Purple\n\nRoxo elétrico que chama atenção. Voltage Purple. Histórico.', '/uploads/tn1/5.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Hyper Blue', 'Nike Air Max TN Hyper Blue\n\nO azul clássico do TN. Original de 98. Lenda viva.', '/uploads/tn1/6.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN France', 'Nike Air Max TN France\n\nCores inspiradas na bandeira francesa. Estampa xadrez. Exclusivo.', '/uploads/tn1/7.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Glacier', 'Nike Air Max TN Glacier\n\nFresco e impactante. Azul gelo. Visual clean.', '/uploads/tn1/8.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN White', 'Nike Air Max TN White\n\nLimpo e futurista. Branco total. Cuidado onde pisa.', '/uploads/tn1/9.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Triple Black', 'Nike Air Max TN Triple Black\n\nStealth total. O mais procurado. Preto total. O verdadeiro tubarão.', '/uploads/tn1/10.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Deadpool', 'Nike Air Max TN Deadpool\n\nVermelho e preto intenso. Agressivo e perigoso.', '/uploads/tn1/11.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Sunset', 'Nike Air Max TN Sunset\n\nDegradê pôr do sol inconfundível. Laranja e vermelho. Obra de arte.', '/uploads/tn1/12.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Celtics', 'Nike Air Max TN Celtics\n\nBranco com detalhes verdes e dourados. Raro.', '/uploads/tn1/13.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Royal', 'Nike Air Max TN Royal\n\nElegância esportiva. Branco e azul real.', '/uploads/tn1/14.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Orange', 'Nike Air Max TN Orange\n\nContraste forte. Preto e laranja. Halloween vibe.', '/uploads/tn1/15.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Grape', 'Nike Air Max TN Grape\n\nRoxo clássico e atemporal. Preto e roxo.', '/uploads/tn1/16.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Sky', 'Nike Air Max TN Sky\n\nAzul céu vibrante com branco. Leve e estiloso.', '/uploads/tn1/17.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Red', 'Nike Air Max TN Red\n\nBranco com detalhes vermelhos. Esportivo clássico.', '/uploads/tn1/18.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Silver', 'Nike Air Max TN Silver\n\nPreto com brilho prata metálico. Futurista.', '/uploads/tn1/19.webp', 299.00, 3, 8, 1, 'TN'),
('Air Max TN Aqua', 'Nike Air Max TN Aqua\n\nTurquesa que se destaca no pé. Diferenciado.', '/uploads/tn1/20.webp', 299.00, 3, 8, 1, 'TN');

-- --- LOTE 34: AIR MAX TN3 ---
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
('Air Max TN3 Blue', 'Nike Air Max TN3 Blue\n\nA evolução aerodinâmica do TN. Preto e azul. Velocidade.', '/uploads/tn3/1.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 White Blue', 'Nike Air Max TN3 White Blue\n\nDesign rápido e futurista. Branco e azul.', '/uploads/tn3/2.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 White', 'Nike Air Max TN3 White\n\nVisual clean com linhas agressivas. Branco total.', '/uploads/tn3/3.webp', 341.00, 43, 6, 1, 'TN3'),
('Air Max TN3 Red', 'Nike Air Max TN3 Red\n\nPreto e vermelho poderoso. Design técnico.', '/uploads/tn3/4.webp', 341.00, 43, 6, 1, 'TN3');