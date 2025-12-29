package com.store.BACK.model;

import jakarta.persistence.*;
import lombok.Data; // Se usar Lombok
import lombok.NoArgsConstructor; // Adicione isso se usar Lombok
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor // Gera o construtor vazio obrigatório do JPA
public class PedidoAviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String mensagem;
    
    private String imagemUrl;
    
    private LocalDateTime dataCriacao;
    
    // Campo para compatibilidade se seu banco usa dataAviso
    // private LocalDateTime dataAviso; 

    private boolean lido = false;

    // --- CONSTRUTOR MANUAL QUE ESTAVA FALTANDO ---
    public PedidoAviso(Long id, String titulo, String mensagem, LocalDateTime dataCriacao, boolean lido, Pedido pedido) {
        this.id = id;
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.dataCriacao = dataCriacao;
        this.lido = lido;
        this.pedido = pedido;
    }

    // --- GETTERS E SETTERS ---
    // (Se o Lombok @Data não estiver funcionando, mantenha os manuais abaixo)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    // Método de compatibilidade (se algum lugar chama getDataAviso)
    public LocalDateTime getDataAviso() { return dataCriacao; }

    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    public Pedido getPedido() { return pedido; }
    
    public boolean isLido() { return lido; }
    public void setLido(boolean lido) { this.lido = lido; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
}