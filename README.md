# APP_OPENCV
 
# 🧠 Proyecto: Aritmética de Imágenes con OpenCV.js

Este proyecto implementa operaciones de **procesamiento de imágenes en tiempo real** usando **OpenCV.js directamente en el navegador**, sin instalar nada extra.

Permite realizar:
✔️ `add` (suma de imágenes)  
✔️ `subtract` (resta)  
✔️ `bitwise and`  
✔️ `bitwise or`  
✔️ `bitwise xor`  
✔️ `bitwise not` (en una sola imagen)

---

## 📂 Estructura del proyecto

APP_OPENCV/
│
├─ index.html → archivo principal
├─ start_server.bat → inicia servidor local (doble clic)
├─ stop_server.bat → detiene servidor
│
└─ images/
├─ img1.jpg → imagen base (paisaje)
└─ img2.png → imagen con logo OpenCV

## Imágenes de ejemplo
Imagen	Uso
img1.jpg	Imagen base (fondo)
img2.png	Imagen con logo OpenCV encima

## Botones incluidos en la web:
Botón	Operación
Add	Suma las dos imágenes
Subtract	Resta pixel a pixel
Bitwise AND	Comparación lógica
Bitwise OR	Combinación de píxeles
Bitwise XOR	Detección de diferencias
Bitwise NOT	Negativo de la imagen 1

## Registro de visitas (local en repo)

Este proyecto guarda un registro de accesos en `visits.json` dentro del repositorio.
Cuando alguien carga la web, la función serverless `/api/track` escribe una entrada
(tstamp, ip parcialmente enmascarada, user-agent, referrer) en `visits.json`
mediante la GitHub REST API.

Para que esto funcione en Vercel:

1. Crear un Personal Access Token en GitHub con permisos para el repo.
2. En Vercel → Project → Settings → Environment Variables añadir:
   - `GITHUB_TOKEN` (secret)
   - `GITHUB_REPO` = "usuario/repo"
   - `GITHUB_BRANCH` = "main"

Nota: cada visita genera un commit; el archivo `visits.json` es persistente entre despliegues.
