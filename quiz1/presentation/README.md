# Template de presentación HTML

Para compartir o copiar la presentación, usa **`presentation.html`**. Es un archivo completamente autónomo que contiene el HTML, el CSS y el JavaScript, y funciona sin instalación ni conexión a internet.

Los archivos `index.html`, `styles.css` y `script.js` son la versión modular, más cómoda para editar.

## Responsabilidad de cada archivo

| Archivo | Función | Rama recomendada |
| --- | --- | --- |
| `index.html` | Textos, orden y estructura de las diapositivas | `content/quiz1` |
| `styles.css` | Colores, tipografía, espacios y adaptación a pantallas | `design/quiz1` |
| `script.js` | Botones, teclado, gestos, pregunta y navegación | `feature/quiz1-interactions` |
| `presentation.html` | Archivo final autónomo que se entrega al profesor | Se genera al final |
| `build-single-file.mjs` | Combina los tres archivos editables | No requiere edición habitual |

Para reducir conflictos, cada persona debe trabajar en una tarea y archivo diferente siempre que sea posible. No se debe editar manualmente `presentation.html` durante el trabajo colaborativo.

## Controles

- Flechas, `Espacio`, `Page Up` y `Page Down`: navegar.
- `Home` / `End`: primera o última diapositiva.
- `F`: activar o salir de pantalla completa.
- `O`: abrir o cerrar la vista general.
- En móvil: deslizar horizontalmente.

## Editar el contenido

Cada diapositiva es una sección con la clase `slide` en `index.html`:

```html
<section class="slide" data-title="Título corto" aria-hidden="true">
  <div class="slide-content">
    <p class="eyebrow">SECCIÓN</p>
    <h2>Título de la <span>diapositiva</span></h2>
    <p class="body-copy">Contenido...</p>
  </div>
</section>
```

Puedes duplicar, reordenar o eliminar estas secciones. Los indicadores, el contador, la barra de progreso y la vista general se actualizan automáticamente.

Los colores principales se encuentran al inicio de `styles.css`, dentro de `:root`. Para cambiar el verde, sustituye el valor de `--accent`.

## Generar el archivo final

Después de integrar el contenido, el diseño y las interacciones, entrar en esta carpeta y ejecutar:

```bash
cd quiz1/presentation
node build-single-file.mjs
```

El comando reemplaza `presentation.html` con la versión más reciente. Después hay que abrirlo en el navegador y comprobar todas las diapositivas antes de guardarlo en Git.

Solo una persona debe regenerarlo al final de la integración. De esta manera se evita que dos ramas modifiquen simultáneamente el mismo archivo generado.

## Comprobación antes de entregar

1. Abrir `presentation.html` sin mover los demás archivos.
2. Confirmar que funciona por sí solo y sin conexión a internet.
3. Recorrer las diapositivas con botones y teclado.
4. Probar la vista general con `O` y la pantalla completa con `F`.
5. Revisar los textos, enlaces y la pregunta interactiva.

Para imprimir o exportar como PDF, usa la función de impresión del navegador. La hoja de estilos mostrará una diapositiva por página.
