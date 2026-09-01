# Erika & Luca — Wedding Website

Sito statico gratuito in HTML/CSS/JavaScript.

## File principali

- `index.html` — struttura del sito
- `style.css` — grafica e animazioni
- `script.js` — apertura della busta e navigazione
- `partecipazione-1.png` — prima pagina della partecipazione
- `partecipazione-2.png` — seconda pagina della partecipazione

## Cosa personalizzare

Nel file `index.html` cerca:
- `30 · 09 · 2027`
- `Ristorante 123`
- `Anywhere, any city`
- `INSERISCI-EMAIL@example.com`

e sostituiscili con i dati definitivi.

Per cambiare la grafica iniziale basta sostituire `partecipazione-1.png` e/o `partecipazione-2.png` mantenendo gli stessi nomi.

## Pubblicazione gratuita

Il sito è statico, quindi può essere pubblicato su GitHub Pages senza un server.


## Drago volante

Il drago decorativo ora è composto da 3 immagini sovrapposte:
- `dragon-body.png` — corpo, testa e coda (fermi)
- `dragon-wing-left.png` — ala sinistra
- `dragon-wing-right.png` — ala destra

Le due ali battono con un'animazione CSS (vedi `.dragon-wing-left` /
`.dragon-wing-right` e le relative `@keyframes` in `style.css`).
Il movimento destra/sinistra durante lo scroll resta gestito da `script.js`,
che sposta il contenitore `#flyingDragon` esattamente come prima.

In precedenza il battito usava `dragon-fly-animated.webp`: quel file aveva
i fotogrammi salvati in modo scorretto (ogni fotogramma copriva solo una
parte del disegno, senza "pulire" quello precedente), per cui solo un'ala
sembrava muoversi e restavano dei "fantasmi" visibili. `dragon-fly.png` e
`dragon-fly-animated.webp` sono stati lasciati nella cartella come backup
ma non sono più usati dal sito.
