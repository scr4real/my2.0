-- Inserir um novo cupom de desconto
INSERT IGNORE INTO cupons (id, codigo, desconto, tipo_desconto, data_validade) 
VALUES (5, 'WS10', 10.00, 'PERCENTUAL', '2030-12-31');