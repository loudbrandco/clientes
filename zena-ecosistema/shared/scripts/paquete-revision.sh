#!/usr/bin/env bash
# Genera el paquete del sitio de REVISIÓN para subir a loudbrandco.com:
#   loudbrandco.com/zena/            → sitio de Zena Ayoub
#   loudbrandco.com/zena-fundacion/  → sitio de la fundación (con pago de Stripe)
# Todas las páginas llevan "noindex" para que Google no las indexe.
# Uso: bash shared/scripts/paquete-revision.sh   → crea revision-loudbrandco.zip
set -euo pipefail
cd "$(dirname "$0")/../.."

OUT=dist-revision
STAGING=1 npm run build --silent
python3 shared/scripts/preview.py "$OUT" zena zena-fundacion

for d in zena zena-fundacion; do
cat > "$OUT/$d/.htaccess" <<EOF
# Sitio de revisión — no indexar
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /$d/404.html
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)\$ https://%{HTTP_HOST}/$d/\$1 [L,R=301]
</IfModule>
<IfModule mod_headers.c>
Header always set X-Robots-Tag "noindex, nofollow"
Header always set X-Content-Type-Options "nosniff"
</IfModule>
EOF
done

rm -f revision-loudbrandco.zip
(cd "$OUT" && zip -qr ../revision-loudbrandco.zip zena zena-fundacion)
echo "✓ revision-loudbrandco.zip listo: descomprímelo dentro de public_html de loudbrandco.com"
