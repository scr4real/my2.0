package com.store.BACK.model;

import jakarta.persistence.*;
import lombok.Data; // Se usar Lombok
import java.time.LocalDateTime;

@Entity
@Data // O Lombok gera os Getters e Setters automaticamente
public class PedidoAviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    // --- CAMPOS NECESSÁRIOS ---
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String mensagem;
    
    private String imagemUrl;
    
    private LocalDateTime dataCriacao; // Usamos dataCriacao no controller
    
    // Campo alternativo caso seu banco já use 'dataAviso'
    // private LocalDateTime dataAviso; 

    private boolean lido = false;
    
    // --- GETTERS E SETTERS MANUAIS (Caso o Lombok @Data não esteja funcionando) ---
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    // Caso precise de compatibilidade com 'getDataAviso'
    public LocalDateTime getDataAviso() { return dataCriacao; }

    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    public Pedido getPedido() { return pedido; }
    
    public boolean isLido() { return lido; }
    public void setLido(boolean lido) { this.lido = lido; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
}