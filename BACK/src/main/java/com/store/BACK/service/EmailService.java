package com.store.BACK.service;

import com.store.BACK.model.ItemPedido;
import com.store.BACK.model.Pedido;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String REMETENTE_GMAIL;

    // Cores da marca
    private final String COLOR_PRIMARY = "#ff7a00";
    private final String COLOR_PRIMARY_LIGHT = "#ff9a3d";
    private final String COLOR_BG = "#f8f9fa";
    private final String COLOR_CARD = "#ffffff";
    private final String COLOR_TEXT = "#2d3748";
    private final String COLOR_TEXT_LIGHT = "#718096";
    private final String COLOR_BORDER = "#e2e8f0";
    private final String COLOR_SUCCESS = "#48bb78";
    private final String COLOR_WARNING = "#ed8936";
    private final String COLOR_ERROR = "#f56565";
    private final String COLOR_INFO = "#3498db";

    public void enviarConfirmacaoPagamento(Pedido pedido) {
        enviarPedidoRecebido(pedido);
    }

    private void enviarEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(REMETENTE_GMAIL, "Japa Universe");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email via Gmail: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // 1. PEDIDO RECEBIDO
    @Async
    @Transactional
    public void enviarPedidoRecebido(Pedido pedido) {
        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background-color: " + COLOR_WARNING + "; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>🕒</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Pedido Recebido!</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px;'>Obrigado pela sua compra, " + pedido.getUsuario().getNome() + "!</p>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin-top: 10px; font-size: 15px;'>Seu pedido foi registrado e estamos aguardando a confirmação do seu pagamento (PIX).</p>" +
                        "</div>" +
                        "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Resumo do Pedido #" + pedido.getId() + "</h3>" +
                        buildItensHtml(pedido) +
                        buildEnderecoHtml(pedido) +
                        buildSuporteFooter();

        String finalHtml = getBaseTemplate(bodyContent, "Pedido Recebido #" + pedido.getId());
        enviarEmail(pedido.getUsuario().getEmail(), "⏳ Pedido Recebido - Japa Universe #" + pedido.getId(), finalHtml);
    }

    // 2. PAGAMENTO CONFIRMADO
    @Async
    @Transactional
    public void enviarPagamentoConfirmado(Pedido pedido) {
        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background-color: " + COLOR_SUCCESS + "; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>✓</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Pagamento Confirmado!</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px;'>Pagamento confirmado, " + pedido.getUsuario().getNome() + "!</p>" +
                        "</div>" +
                        "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Itens Pagos #" + pedido.getId() + "</h3>" +
                        buildItensHtml(pedido) +
                        buildEnderecoHtml(pedido) +
                        buildSuporteFooter();

        String finalHtml = getBaseTemplate(bodyContent, "Pagamento Confirmado #" + pedido.getId());
        enviarEmail(pedido.getUsuario().getEmail(), "✅ Pagamento Confirmado - Japa Universe #" + pedido.getId(), finalHtml);
    }

    // 3. PEDIDO ENVIADO
    @Async
    @Transactional
    public void enviarPedidoEnviado(Pedido pedido) {
        String rastreioHtml = "";
        if (pedido.getCodigoRastreio() != null && !pedido.getCodigoRastreio().isEmpty()) {
             rastreioHtml = "<div style='background: #e3f2fd; border: 1px solid " + COLOR_INFO + "; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;'>" +
                    "<h3 style='margin: 0 0 10px 0; color: " + COLOR_INFO + ";'>Código de Rastreio</h3>" +
                    "<p><strong>" + pedido.getCodigoRastreio() + "</strong></p>" +
                    "<a href='" + pedido.getLinkRastreio() + "' style='background-color: " + COLOR_INFO + "; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>RASTREAR</a>" +
                    "</div>";
        }

        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background-color: " + COLOR_INFO + "; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>🚚</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Pedido Enviado!</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px;'>Seu pedido está a caminho, " + pedido.getUsuario().getNome() + "!</p>" +
                        "</div>" +
                        rastreioHtml +
                        "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Itens Enviados #" + pedido.getId() + "</h3>" +
                        buildItensHtml(pedido) +
                        buildEnderecoHtml(pedido) +
                        buildSuporteFooter();

        String finalHtml = getBaseTemplate(bodyContent, "Pedido Enviado #" + pedido.getId());
        enviarEmail(pedido.getUsuario().getEmail(), "🚚 Seu Pedido Foi Enviado - Japa Universe #" + pedido.getId(), finalHtml);
    }

    // 4. PEDIDO ENTREGUE
    @Async
    @Transactional
    public void enviarPedidoEntregue(Pedido pedido) {
        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background-color: " + COLOR_SUCCESS + "; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>🎁</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Pedido Entregue!</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px;'>Esperamos que goste, " + pedido.getUsuario().getNome() + "!</p>" +
                        "</div>" +
                        "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Itens Entregues #" + pedido.getId() + "</h3>" +
                        buildItensHtml(pedido) +
                        buildEnderecoHtml(pedido) +
                        buildSuporteFooter();

        String finalHtml = getBaseTemplate(bodyContent, "Pedido Entregue #" + pedido.getId());
        enviarEmail(pedido.getUsuario().getEmail(), "🎁 Seu Pedido Foi Entregue - Japa Universe #" + pedido.getId(), finalHtml);
    }

    // 5. PEDIDO CANCELADO
    @Async
    @Transactional
    public void enviarPedidoCancelado(Pedido pedido) {
        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background-color: " + COLOR_ERROR + "; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>✕</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Pedido Cancelado</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px;'>Seu pedido foi cancelado.</p>" +
                        "</div>" +
                        "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Resumo #" + pedido.getId() + "</h3>" +
                        buildItensHtml(pedido) +
                        buildEnderecoHtml(pedido) +
                        buildSuporteFooter();

        String finalHtml = getBaseTemplate(bodyContent, "Pedido Cancelado #" + pedido.getId());
        enviarEmail(pedido.getUsuario().getEmail(), "🚫 Pedido Cancelado - Japa Universe #" + pedido.getId(), finalHtml);
    }

    @Async
    public void sendPasswordResetEmail(String to, String token) {
        String url = "https://japauniverse.com.br/login/HTML/nova-senha.html?token=" + token;

        String bodyContent =
                "<div style='text-align: center; margin-bottom: 30px;'>" +
                        "<div style='background: linear-gradient(135deg, " + COLOR_PRIMARY + ", " + COLOR_PRIMARY_LIGHT + "); width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'>" +
                        "<span style='color: white; font-size: 24px;'>🔒</span>" +
                        "</div>" +
                        "<h1 style='color: " + COLOR_TEXT + "; margin: 0 0 10px 0; font-size: 28px;'>Redefinir Senha</h1>" +
                        "<p style='color: " + COLOR_TEXT_LIGHT + "; margin: 0; font-size: 16px; line-height: 1.5;'>Recebemos uma solicitação para redefinir a senha da sua conta.</p>" +
                        "</div>" +
                        "<div style='background-color: " + COLOR_BG + "; padding: 20px; border-radius: 12px; margin: 25px 0; text-align: center;'>" +
                        "<p style='color: " + COLOR_TEXT + "; margin: 0 0 15px 0;'>Clique no botão abaixo para criar uma nova senha:</p>" +
                        "<a href='" + url + "' style='display: inline-block; background: linear-gradient(135deg, " + COLOR_PRIMARY + ", " + COLOR_PRIMARY_LIGHT + "); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;'>Redefinir Minha Senha</a>" +
                        "</div>";

        String finalHtml = getBaseTemplate(bodyContent, "Redefinição de Senha");
        enviarEmail(to, "🔐 Redefinição de Senha - Japa Universe", finalHtml);
    }

    private String buildItensHtml(Pedido pedido) {
        StringBuilder itensHtml = new StringBuilder();
        itensHtml.append("<table width='100%' cellpadding='12' cellspacing='0' style='border-collapse: separate; border-spacing: 0; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'>");
        itensHtml.append("<thead>")
                .append("<tr style='background: linear-gradient(135deg, ").append(COLOR_PRIMARY).append(", ").append(COLOR_PRIMARY_LIGHT).append("); color: white;'>")
                .append("<th align='left'>Produto</th>")
                .append("<th align='center'>Qtd</th>")
                .append("<th align='right'>Valor</th>")
                .append("</tr>")
                .append("</thead>")
                .append("<tbody>");

        for (ItemPedido item : pedido.getItens()) {
            BigDecimal totalItemValue = item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));
            itensHtml.append("<tr style='background-color: white; border-bottom: 1px solid ").append(COLOR_BORDER).append(";'>")
                    .append("<td style='padding: 12px; color: ").append(COLOR_TEXT).append(";'>")
                    .append("<strong>").append(item.getProduto().getNome()).append("</strong><br>")
                    .append("<span style='font-size: 13px; color: ").append(COLOR_TEXT_LIGHT).append(";'>Tamanho: ").append(item.getTamanho()).append("</span>")
                    .append("</td>")
                    .append("<td align='center'>").append(item.getQuantidade()).append("</td>")
                    .append("<td align='right'>R$ ").append(String.format("%.2f", totalItemValue)).append("</td>")
                    .append("</tr>");
        }
        itensHtml.append("<tr style='background-color: ").append(COLOR_BG).append(";'>")
                .append("<td colspan='2' align='right' style='font-weight: 600;'>Total:</td>")
                .append("<td align='right' style='font-weight: 700; font-size: 16px; color: ").append(COLOR_PRIMARY).append(";'>R$ ").append(String.format("%.2f", pedido.getValorTotal())).append("</td>")
                .append("</tr>");
        itensHtml.append("</tbody></table>");
        return itensHtml.toString();
    }

    private String buildEnderecoHtml(Pedido pedido) {
        return "<h3 style='color: " + COLOR_TEXT + "; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid " + COLOR_BORDER + "; padding-bottom: 8px;'>Endereço de Entrega</h3>" +
                "<div style='background-color: " + COLOR_BG + "; padding: 20px; border-radius: 8px;'>" +
                "<strong>" + pedido.getUsuario().getNome() + "</strong><br>" +
                pedido.getEnderecoDeEntrega().getRua() + ", " + pedido.getEnderecoDeEntrega().getNumero() + "<br>" +
                pedido.getEnderecoDeEntrega().getCidade() + " - " + pedido.getEnderecoDeEntrega().getEstado() + "<br>" +
                "<span style='color: " + COLOR_TEXT_LIGHT + ";'>CEP: " + pedido.getEnderecoDeEntrega().getCep() + "</span>" +
                "</div>";
    }

    private String buildSuporteFooter() {
        return "<div style='text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid " + COLOR_BORDER + ";'>" +
                "<p style='color: " + COLOR_TEXT_LIGHT + "; font-size: 14px;'>Dúvidas? <a href='mailto:contato@japauniverse.com.br' style='color: " + COLOR_PRIMARY + "; text-decoration: none;'>Fale conosco</a></p>" +
                "</div>";
    }

    private String getBaseTemplate(String content, String pageTitle) {
        return "<!DOCTYPE html><html lang='pt-BR'><head><meta charset='UTF-8'><title>" + pageTitle + "</title></head>" +
                "<body style='margin: 0; padding: 0; background-color: " + COLOR_BG + "; font-family: sans-serif;'>" +
                "<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td align='center' style='padding: 40px 20px;'>" +
                "<table width='100%' style='max-width: 600px; background-color: " + COLOR_CARD + "; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid " + COLOR_BORDER + ";'>" +
                "<tr><td style='background: #121212; padding: 30px; text-align: center;'>" +
                "<h1 style='color: " + COLOR_PRIMARY + "; margin: 0; letter-spacing: 3px; font-size: 32px;'>JAPA UNIVERSE</h1>" +
                "</td></tr>" +
                "<tr><td style='padding: 40px 30px;'>" + content + "</td></tr>" +
                "<tr><td style='background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid " + COLOR_BORDER + ";'>" +
                "<p style='margin: 0; font-size: 12px; color: " + COLOR_TEXT_LIGHT + ";'>&copy; 2025 Japa Universe. Todos os direitos reservados.</p>" +
                "</td></tr></table></td></tr></table></body></html>";
    }
}