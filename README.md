# Ana Create

Portfólio da Ana Lima — [anacreate.com.br](https://www.anacreate.com.br).

Next.js (App Router) + TypeScript + Tailwind CSS v4, exportado como site estático.

## Comandos

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # gera o site estático em out/
npm run images   # converte novos JPG/PNG de public/ para WebP (qualidade 90)
```

## Estrutura

- `app/` — layout, página e `globals.css` (tokens do tema + peças da colagem)
- `components/` — uma seção por arquivo
- `lib/data.ts` — todo o conteúdo editável: trabalhos, campanhas, marcas, contatos
- `public/img`, `public/covers` — imagens em WebP

Para adicionar um trabalho: salve a capa como `public/covers/<código-do-post>.jpg`, rode `npm run images`
e acrescente uma linha em `WORKS` no `lib/data.ts`.
