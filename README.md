# Artificial Intelligence Course

Repositorio colaborativo para los trabajos del curso de Inteligencia Artificial.

## Estructura

```text
Artificial_Intelligence_Course/
├── quiz1/
│   └── presentation/
│       ├── index.html              # Contenido y estructura
│       ├── styles.css              # Diseño visual
│       ├── script.js               # Navegación e interactividad
│       ├── build-single-file.mjs   # Generador del archivo autónomo
│       ├── presentation.html       # Entrega final en un solo archivo
│       └── README.md               # Instrucciones de la presentación
├── .gitignore
└── README.md
```

## Flujo de trabajo

`main` debe contener únicamente versiones revisadas y estables. Cada cambio se realiza en una rama corta y se integra mediante un pull request.

No hace falta mantener una rama `develop`. Para este proyecto usaremos ramas por tarea:

- `content/quiz1`: contenido, textos y diapositivas en `index.html`.
- `design/quiz1`: colores, tipografía y composición en `styles.css`.
- `feature/quiz1-interactions`: navegación y funciones en `script.js`.
- `fix/...`: correcciones pequeñas.

La rama `feature/quiz1-template` se usa únicamente para incorporar la plantilla inicial.

### Empezar una tarea

Primero hay que actualizar `main` y después crear una rama nueva:

```bash
git switch main
git pull origin main
git switch -c tipo/nombre-de-la-tarea
```

Ejemplo:

```bash
git switch -c content/quiz1
```

### Guardar y publicar cambios

Antes de guardar, revisar exactamente qué cambió:

```bash
git status
git diff
```

Añadir solo los archivos relacionados con la tarea, crear el commit y publicar la rama:

```bash
git add ruta/del/archivo
git commit -m "Descripción breve del cambio"
git push -u origin nombre-de-la-rama
```

Después se abre un pull request en GitHub desde la rama de trabajo hacia `main`. La otra persona revisa los cambios antes de integrarlos.

### Evitar conflictos en la presentación

No editen simultáneamente `presentation.html`. Este archivo se genera automáticamente y contiene una copia combinada de los otros tres archivos.

Durante el trabajo colaborativo:

1. Editar `index.html`, `styles.css` o `script.js`, según la tarea.
2. Integrar las ramas mediante pull requests.
3. Con todos los cambios ya reunidos, generar una sola vez `presentation.html`.

Las instrucciones detalladas están en [`quiz1/presentation/README.md`](quiz1/presentation/README.md).

## Convenciones

- No hacer commits directamente en `main`.
- No usar `git add .` sin revisar antes `git status`.
- Cada commit debe representar un cambio concreto.
- Actualizar la rama con `main` antes de abrir o terminar un pull request.
- Resolver y revisar cualquier conflicto antes de integrar cambios.

