# Pendências antes de publicar — Site Braspack (tecnologia RUNPack)

## Resolvido nesta versão
- Imagens reais da linha em operação, extraídas do vídeo de apresentação (`WhatsApp Video 2026-08-03...mp4`) e tratadas (recorte, upscale, nitidez): entrada, acumulador, transportador, encaixotamento, esteira de saída, painel de controle, troca de calibre e aplicações (maçã/pera, laranja, tangerina).
- Vídeo do hero: recorte de 8s limpo (sem legendas em espanhol) para o loop da home.
- Vídeo completo: versão comprimida (~14MB) usada na página da Telescópica-RPE.
- Números de produção da Telescópica-RPE atualizados com os dados oficiais do documento institucional (`BRASPACK_Quem_Somos_RUNPack_PT.docx`): **150–170 caixas/hora** (limão siciliano, caixa 18 kg), **≈400 caixas/hora** (lima Tahiti, caixa 4,5 kg) e **até 600 caixas/hora** em picos.
- Renomeação completa do site: empresa (marca institucional) passa a ser **Braspack** (Indústria Metalúrgica); **RUNPack** é o nome da tecnologia/linha de máquinas que a Braspack comercializa. Atualizado em todas as 8 páginas, JSON-LD, footer, títulos e meta descriptions.
- Conteúdo institucional da página Sobre reescrito com o texto oficial "Quem é a Braspack" do documento: descrição da empresa, ~10 equipamentos operando comercialmente em São Paulo, capacidade como importadora/exportadora, e blocos de Missão/Visão/Foco/Diferencial.
- Nova seção "Investimento e acesso à tecnologia" na página da Telescópica-RPE: valor de referência US$ 90.000 por equipamento e condição comercial de até 12 parcelas via boleto.
- Logo: substituído o antigo `logo-runpack.png` por um wordmark em SVG (`logo-braspack.svg`) construído a partir das cores verde/amarelo da placa de identificação real da empresa (extraída do documento) — ver pendência abaixo sobre o logo oficial.

## Ainda pendente
- [ ] **Logo oficial em vetor** — o logo atual (`assets/img/logo-braspack.svg`) foi recriado à mão a partir de uma foto de placa metálica extraída do documento institucional (cores aproximadas, sem arquivo vetorial original). Pedir à Braspack um arquivo de logo oficial (AI/EPS/SVG/PNG transparente) para substituir.
- [ ] **Telefone, WhatsApp, e-mail, Instagram e endereço reais** — todos os campos estão marcados no site com a tag "a definir" (rodapé, página Contato, página Sobre, botão flutuante de WhatsApp). Assim que houver os dados, substituir nos 8 arquivos HTML (busca por `placeholder-tag` e `a definir`).
- [ ] **CNPJ** — mesmo tratamento.
- [ ] **Domínio braspack.com.br** — usado como URL provisória no JSON-LD (schema.org); confirmar se a empresa já possui esse domínio ou outro antes de publicar/divulgar.
- [ ] **Autorização de uso da marca ZUPA** — as caixas da cliente aparecem no vídeo de origem. Nas imagens já publicadas (`aplicacao-tangerina.jpg`), o enquadramento foi recortado para excluir o texto "ZUPA", mas a marca pode ainda aparecer no vídeo completo da página de produto e no vídeo do hero. Confirmar com a Braspack antes de publicar publicamente; se não houver autorização, recortar/reeditar os vídeos.
- [ ] **Especificações técnicas completas** da Telescópica-RPE: dimensões, potência instalada, consumo de ar comprimido, peso, faixa de calibres, materiais em contato com o alimento.
- [ ] **Catálogo das demais máquinas da linha** — a página `/maquinas/` tem 2 cards "Em breve" reservados.
- [ ] **Fotos de limão e pera** — não havia trecho do vídeo mostrando essas frutas na linha; a página `/aplicacoes/` já reserva os cards com a tag "Foto a confirmar".
- [ ] **Logos de clientes/embaladoras** para a seção de prova social da home (também depende da autorização acima).
- [ ] **Blog** — decidido não incluir por enquanto (sem alguém definido para alimentar). O item foi removido do menu; se decidirem criar depois, a arquitetura sugerida no briefing original continua válida.
- [ ] **Conectar os formulários** (Contato, Telescópica-RPE, Suporte) a um destino real — já integrados ao Google Sheets via Apps Script; confirmar se o destino de dados é o definitivo da Braspack.
- [ ] **Domínio e deploy** — o site está em HTML/CSS/JS puro, sem dependências de build; pode ser publicado em qualquer hosting estático (Netlify, Vercel, GitHub Pages, cPanel etc.). Também renomear o serviço no Render (`render.yaml` ainda usa `name: runpack-site`) se a URL pública também precisar mudar — não alterado nesta rodada para não quebrar o deploy já publicado em runpack-site.onrender.com.

## Como testar localmente
```
cd site
python3 -m http.server 8642
```
Depois abrir `http://localhost:8642/`.
