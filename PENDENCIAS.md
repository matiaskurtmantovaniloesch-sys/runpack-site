# Pendências antes de publicar — Site Run Pack

## Resolvido nesta versão
- Imagens reais da linha em operação, extraídas do vídeo de apresentação (`WhatsApp Video 2026-08-03...mp4`) e tratadas (recorte, upscale, nitidez): entrada, acumulador, transportador, encaixotamento, esteira de saída, painel de controle, troca de calibre e aplicações (maçã/pera, laranja, tangerina).
- Vídeo do hero: recorte de 8s limpo (sem legendas em espanhol) para o loop da home.
- Vídeo completo: versão comprimida (~14MB) usada na página da Telescópica-RPE.
- Números de produção da Telescópica-RPE confirmados no próprio vídeo: **160 caixas/hora em 5 camadas** e **400 caixas/hora em 2 camadas**.

## Ainda pendente
- [ ] **Telefone, WhatsApp, e-mail, Instagram e endereço reais** — todos os campos estão marcados no site com a tag "a definir" (rodapé, página Contato, página Sobre, botão flutuante de WhatsApp). Assim que houver os dados, substituir nos 8 arquivos HTML (busca por `placeholder-tag` e `a definir`).
- [ ] **CNPJ** — mesmo tratamento.
- [ ] **Autorização de uso da marca ZUPA** — as caixas da cliente aparecem no vídeo de origem. Nas imagens já publicadas (`aplicacao-tangerina.jpg`), o enquadramento foi recortado para excluir o texto "ZUPA", mas a marca pode ainda aparecer no vídeo completo da página de produto e no vídeo do hero. Confirmar com a Run Pack antes de publicar publicamente; se não houver autorização, recortar/reeditar os vídeos.
- [ ] **Especificações técnicas completas** da Telescópica-RPE: dimensões, potência instalada, consumo de ar comprimido, peso, faixa de calibres, materiais em contato com o alimento.
- [ ] **Catálogo das demais máquinas da linha** — a página `/maquinas/` tem 2 cards "Em breve" reservados.
- [ ] **Fotos de limão e pera** — não havia trecho do vídeo mostrando essas frutas na linha; a página `/aplicacoes/` já reserva os cards com a tag "Foto a confirmar".
- [ ] **Logos de clientes/embaladoras** para a seção de prova social da home (também depende da autorização acima).
- [ ] **Blog** — decidido não incluir por enquanto (sem alguém definido para alimentar). O item foi removido do menu; se decidirem criar depois, a arquitetura sugerida no briefing original continua válida.
- [ ] **Conectar os formulários** (Contato, Telescópica-RPE, Suporte) a um destino real — hoje são apenas demonstrativos (`onsubmit="return false;"`).
- [ ] **Domínio e deploy** — o site está em HTML/CSS/JS puro, sem dependências de build; pode ser publicado em qualquer hosting estático (Netlify, Vercel, GitHub Pages, cPanel etc.).

## Como testar localmente
```
cd site
python3 -m http.server 8642
```
Depois abrir `http://localhost:8642/`.
