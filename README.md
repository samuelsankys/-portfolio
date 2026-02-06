# Portfólio - Samuel Sankys

Portfólio pessoal desenvolvido com HTML, CSS e JavaScript puro.

## 🚀 Deploy no GitHub Pages

### Opção 1: Repositório dedicado (Recomendado)

1. Crie um novo repositório no GitHub chamado `samuelsankys.github.io`
2. Clone o repositório:
   ```bash
   git clone https://github.com/samuelsankys/samuelsankys.github.io.git
   ```
3. Copie os arquivos do portfólio para o repositório
4. Faça o push:
   ```bash
   git add .
   git commit -m "Add portfolio"
   git push origin main
   ```
5. Acesse: `https://samuelsankys.github.io`

### Opção 2: Repositório existente

1. Crie um repositório chamado `portfolio`
2. Faça upload dos arquivos
3. Vá em **Settings > Pages**
4. Em "Source", selecione a branch `main` e clique em **Save**
5. Acesse: `https://samuelsankys.github.io/portfolio`

## 📁 Estrutura

```
portfolio/
├── index.html    # Página principal
├── style.css     # Estilos
├── script.js     # Interatividade e API do GitHub
└── README.md     # Este arquivo
```

## ✨ Features

- Design responsivo (mobile-first)
- Light mode clean e profissional
- Projetos carregados dinamicamente via API do GitHub
- Animações suaves em CSS
- Contador animado de estatísticas
- Menu mobile funcional
- Easter egg no console 😉

## 🎨 Personalização

### Alterar projetos em destaque

No arquivo `script.js`, edite o array:

```javascript
const FEATURED_REPOS = ['wallet', 'Ripio-Trade', 'desafio-verx', 'back-space-x', 'front-space-x', 'Socios'];
```

### Alterar cores

No arquivo `style.css`, edite as variáveis CSS:

```css
:root {
    --color-primary: #2563eb;      /* Cor principal */
    --color-bg: #ffffff;            /* Fundo */
    --color-text: #1e293b;          /* Texto */
}
```

### Alterar informações de contato

Edite diretamente no `index.html` na seção de contato.

## 📝 Licença

MIT - Fique à vontade para usar e modificar!

---

Desenvolvido com ❤️ por [Samuel Sankys](https://github.com/samuelsankys)
