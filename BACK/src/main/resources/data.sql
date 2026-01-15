-- ==================================================================================
-- ARQUIVO: BACK/src/main/resources/data.sql
-- ==================================================================================

-- 1. LIMPEZA DE DADOS (Ordem correta para não quebrar chave estrangeira)
DELETE FROM itens_pedido;
DELETE FROM pagamentos;
DELETE FROM pedido_aviso; -- Limpa avisos também se tiver
DELETE FROM pedidos;
DELETE FROM produtos;
DELETE FROM categorias;
DELETE FROM marcas;
DELETE FROM _usuario;

-- 2. INSERÇÃO DE MARCAS (IDs fixos para garantir que os produtos liguem certo)
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
(12, 'Sandálias');

-- 4. USUÁRIO ADMIN
INSERT INTO _usuario (nome, email, cpf, telefone, senha, role) VALUES 
('Vinicius Admin', 
 'vinicius.biancolini.tds24@gmail.com', 
 '000.000.000-00', 
 '11999999999', 
 '$2a$10$C0iH.HkG8Nh73C57GC7oT.jxzLawZbas/miJPJVP2qhTcpbZI0soq', 
 'ROLE_ADMIN');

-- 5. INSERÇÃO DOS PRODUTOS (Lote Air Max 95)
-- Note que marca_id = 1 (Nike) e categoria_id = 1 (Air Max 95) batem com os IDs lá em cima.
INSERT INTO produtos (nome, descricao, imagem_url, preco, categoria_id, estoque, marca_id, codigo_modelo) VALUES 
-- Lote 1
('Nike Air Max 95', 'Black Volt / Preto e Neon Escuro', '/uploads/95/1.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG', 'Neon Yellow / Cinza e Neon Clássico', '/uploads/95/2.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Anatomy of Air / Vermelho e Bege', '/uploads/95/3.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Iridescent Purple / Roxo Metálico', '/uploads/95/4.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Dark Grey Green / Cinza Escuro e Verde', '/uploads/95/5.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Essential', 'Anthracite / Cinza Chumbo', '/uploads/95/6.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Neutral Olive Orange / Verde Oliva e Laranja', '/uploads/95/7.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Royal Blue / Preto e Azul Real', '/uploads/95/8.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Grey Red / Cinza e Vermelho', '/uploads/95/9.png', 1099.90, 1, 10, 1, 'AM95'),

-- Lote 2
('Nike Air Max 95', 'Rough Green / Verde Militar e Amarelo', '/uploads/95/10.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Pink Outline / Preto com Detalhe Rosa', '/uploads/95/11.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Triple Black Leather / Preto Couro', '/uploads/95/12.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'White Solar Red / Branco e Vermelho Solar', '/uploads/95/13.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Blue Gradient / Preto Degradê Azul', '/uploads/95/14.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Yellow / Preto e Amarelo', '/uploads/95/15.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Black Navy Green / Preto Azul e Verde', '/uploads/95/16.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Grey Volt / Cinza e Verde Lima', '/uploads/95/17.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Cool Grey / Cinza Clássico', '/uploads/95/18.png', 1099.90, 1, 10, 1, 'AM95'),

-- Lote 3
('Nike Air Max 95', 'Pink Oxford / Rosa e Cinza Claro', '/uploads/95/19.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 OG', 'Solar Red / Cinza e Vermelho Solar', '/uploads/95/20.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Crystal Blue / Cinza e Azul Cristal', '/uploads/95/21.png', 1299.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Pure Platinum / Branco e Platina', '/uploads/95/22.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Dark Grey Yellow / Cinza Escuro e Amarelo', '/uploads/95/23.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Oreo / Preto e Branco Mesclado', '/uploads/95/24.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Essential', 'Triple Black / Totalmente Preto', '/uploads/95/25.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 x CDG', 'Comme des Garçons White / Branco Desconstruído', '/uploads/95/26.png', 2499.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 x CDG', 'Comme des Garçons Black / Preto Desconstruído', '/uploads/95/27.png', 2499.90, 1, 10, 1, 'AM95'),

-- Lote 4
('Nike Air Max 95', 'White Mint / Branco e Verde Menta', '/uploads/95/28.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Essential', 'Triple White / Totalmente Branco', '/uploads/95/29.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Aluminium Blue / Degradê Azul Claro', '/uploads/95/30.png', 1199.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'White Black Logo / Branco com Logo Preto', '/uploads/95/31.png', 1099.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95 Premium', 'Summit White / Branco Premium', '/uploads/95/32.png', 1249.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Midnight Navy / Azul Marinho', '/uploads/95/azulescuro.png', 1149.90, 1, 10, 1, 'AM95'),
('Nike Air Max 95', 'Bred / Preto e Vermelho', '/uploads/95/pretovermelho.png', 1149.90, 1, 10, 1, 'AM95');